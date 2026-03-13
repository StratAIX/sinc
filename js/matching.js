// ============================================================
// Sinc - マッチングロジック
// テストモード: サンプルユーザーで動作確認可能
// ============================================================

// ============================================================
// 中間選択バイアス補正（全体の標準偏差が低い場合に偏差を拡張）
// ============================================================
function stretchScores(scores) {
  const vals = [];
  for (let i = 1; i <= 15; i++) vals.push(scores['P' + i] || 50);
  const variance = vals.reduce((a, v) => a + Math.pow(v - 50, 2), 0) / vals.length;
  const stdDev = Math.sqrt(variance);
  // stdDev < 18 → 中間に偏っている → 最大2.5倍まで拡張
  const factor = stdDev < 18 ? Math.min(2.5, 18 / Math.max(stdDev, 3)) : 1.0;
  const result = {};
  for (let i = 1; i <= 15; i++) {
    const key = 'P' + i;
    const v = scores[key] || 50;
    result[key] = Math.min(99, Math.max(1, Math.round(50 + (v - 50) * factor)));
  }
  return result;
}

// ============================================================
// スコア → グラデーションカラー（15〜99%の連続グラデーション）
// ============================================================
function compatGradientColor(score) {
  const stops = [
    [15,  220, 50,  80 ],   // 赤ピンク（正反対の引力）
    [20,  230, 90,  60 ],   // 赤オレンジ（正反対→成長境界）
    [40,  235, 160, 70 ],   // オレンジ（成長できる）
    [60,  253, 210, 100],   // イエロー（刺激→いい相性境界）
    [80,  9,   132, 227],   // ブルー（いい相性→親友境界）
    [90,  108, 92,  231],   // パープル（親友→最高の相棒境界）
    [95,  0,   200, 155],   // グリーン（最高の相棒→運命的境界）
    [99,  0,   230, 180],   // ブライトグリーン（運命的）
  ];
  score = Math.max(15, Math.min(99, score));
  let lo = stops[0], hi = stops[stops.length - 1];
  for (let i = 0; i < stops.length - 1; i++) {
    if (score >= stops[i][0] && score <= stops[i + 1][0]) { lo = stops[i]; hi = stops[i + 1]; break; }
  }
  const t = (score - lo[0]) / (hi[0] - lo[0]);
  return `rgb(${Math.round(lo[1]+(hi[1]-lo[1])*t)},${Math.round(lo[2]+(hi[2]-lo[2])*t)},${Math.round(lo[3]+(hi[3]-lo[3])*t)})`;
}

const Matching = {
  // ============================================================
  // サンプルユーザー（テスト用・架空データ）
  // ============================================================
  SAMPLE_USERS: [
    {id:'s1',display_id:'#K7M2',type_number:9,type_name:'詩人',family:'Mystics',
     nickname:'ゆうき',avatar_url:null,
     scores:{P1:35,P2:72,P3:68,P4:30,P5:55,P6:62,P7:78,P8:70,P9:25,P10:65,P11:72,P12:58,P13:68,P14:72,P15:35},
     bio:'映画と音楽が好きです。カフェで本を読む時間が至福。'},
    {id:'s2',display_id:'#R4P8',type_number:3,type_name:'誠実な守護者',family:'Architects',
     nickname:'はるか',avatar_url:null,
     scores:{P1:20,P2:35,P3:72,P4:38,P5:60,P6:55,P7:30,P8:25,P9:78,P10:22,P11:28,P12:65,P13:42,P14:58,P15:45},
     bio:'料理と散歩が趣味。大切な人と穏やかに過ごしたい。'},
    {id:'s3',display_id:'#J5N9',type_number:25,type_name:'太陽',family:'Catalysts',
     nickname:'たいよう',avatar_url:null,
     scores:{P1:42,P2:65,P3:28,P4:58,P5:35,P6:20,P7:82,P8:55,P9:45,P10:72,P11:80,P12:68,P13:75,P14:82,P15:62},
     bio:'アウトドアとフェス好き！楽しいこと大好き人間です。'},
    {id:'s4',display_id:'#W8E3',type_number:14,type_name:'孤独な探検家',family:'Mystics',
     nickname:'れん',avatar_url:null,
     scores:{P1:70,P2:68,P3:75,P4:42,P5:72,P6:78,P7:65,P8:82,P9:30,P10:80,P11:35,P12:42,P13:55,P14:38,P15:28},
     bio:'旅と写真。誰も行かない場所に惹かれます。'},
    {id:'s5',display_id:'#T2L6',type_number:20,type_name:'指揮官',family:'Commanders',
     nickname:'まさと',avatar_url:null,
     scores:{P1:55,P2:25,P3:35,P4:82,P5:48,P6:30,P7:72,P8:35,P9:80,P10:65,P11:45,P12:38,P13:30,P14:42,P15:72},
     bio:'経営者。ビジョンを語り合える人を探してます。'},
    {id:'s6',display_id:'#A9F1',type_number:11,type_name:'心の癒し手',family:'Mystics',
     nickname:'みさき',avatar_url:null,
     scores:{P1:28,P2:68,P3:62,P4:25,P5:42,P6:55,P7:45,P8:58,P9:72,P10:30,P11:65,P12:75,P13:78,P14:80,P15:42},
     bio:'看護師です。人の話を聞くのが好き。穏やかな関係を望んでます。'},
    {id:'s7',display_id:'#B3G7',type_number:26,type_name:'燃える革命家',family:'Catalysts',
     nickname:'こうた',avatar_url:null,
     scores:{P1:48,P2:58,P3:32,P4:68,P5:38,P6:22,P7:88,P8:62,P9:35,P10:78,P11:82,P12:55,P13:65,P14:72,P15:58},
     bio:'スタートアップで働いてます。情熱を分かち合える仲間がほしい！'},
    {id:'s8',display_id:'#C6H4',type_number:1,type_name:'孤独な賢者',family:'Architects',
     nickname:'あおい',avatar_url:null,
     scores:{P1:22,P2:28,P3:78,P4:28,P5:45,P6:82,P7:35,P8:30,P9:42,P10:55,P11:25,P12:32,P13:35,P14:28,P15:38},
     bio:'読書と哲学。深い話ができる人と繋がりたい。'},
  ],

  // ============================================================
  // 相性スコア計算（友人マッチング）
  // 設計思想：性格が似ているほど良い友達
  //   ただし P4（意思決定スタイル）だけは補完が理想
  //   決める人×任せる人 = 摩擦なし / 決める人×決める人 = 衝突
  // ============================================================
  calcFriendScore(myScores, otherScores) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);

    // P1-P12（P4除く・11次元）類似度
    let similarity = 0;
    for (let i = 1; i <= 12; i++) {
      if (i === 4) continue;  // P4は補完が理想なので除外
      similarity += 100 - Math.abs((s1['P' + i] || 50) - (s2['P' + i] || 50));
    }
    similarity /= 11;

    // P13 対話スタイル一致：話し方が似ているほど心地よい
    const p13compat = 100 - Math.abs((s1.P13 || 50) - (s2.P13 || 50));

    // P4 補完スコア：決める人×任せる人=100、両者決める=低スコア
    const p4sum = (s1.P4 || 50) + (s2.P4 || 50);
    const p4c = 100 - Math.abs(p4sum - 100);

    const score = Math.round(0.70 * similarity + 0.15 * p13compat + 0.15 * p4c);
    return Math.min(99, Math.max(15, score));
  },

  // ============================================================
  // 相性スコア計算（恋人マッチング）
  // 設計思想：基本は類似、P4（意思決定）は補完が理想
  // ============================================================
  calcLoveScore(myScores, otherScores) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);

    // P1-P12（P4除く・11次元）類似度
    let similarity = 0;
    for (let i = 1; i <= 12; i++) {
      if (i === 4) continue;  // P4は補完が理想なので除外
      similarity += 100 - Math.abs((s1['P' + i] || 50) - (s2['P' + i] || 50));
    }
    similarity /= 11;

    // P4 補完性（20%）：リーダー×フォロワーが理想
    // P4A=80(決める)+P4B=20(任せる) → |100-100|=0 → compat=100
    // P4A=80+P4B=80(両者リーダー) → |160-100|=60 → compat=40
    const p4sum = (s1.P4 || 50) + (s2.P4 || 50);
    const p4compat = 100 - Math.abs(p4sum - 100);

    // P14 愛着表現の一致（25%）
    const p14compat = 100 - Math.abs((s1.P14 || 50) - (s2.P14 || 50));

    // P15 葛藤対処の一致（15%）
    const p15compat = 100 - Math.abs((s1.P15 || 50) - (s2.P15 || 50)) * 0.8;

    const score = Math.round(
      0.40 * similarity +
      0.20 * p4compat +
      0.25 * p14compat +
      0.15 * p15compat
    );
    return Math.min(99, Math.max(15, score));
  },

  // ============================================================
  // マッチング候補リストを生成
  // ============================================================
  getCandidates(myScores, mode = 'friend') {
    const calcFn = mode === 'love' ? this.calcLoveScore : this.calcFriendScore;
    const candidates = this.SAMPLE_USERS.map(user => ({
      ...user,
      score: calcFn(myScores, user.scores),
    }));
    candidates.sort((a, b) => b.score - a.score);
    return candidates;
  },

  // ============================================================
  // スコアに応じたラベルと色
  // ============================================================
  getScoreLabel(score) {
    const color = compatGradientColor(score);
    let label, emoji;
    if      (score >= 95) { label = '運命的な相性';   emoji = '💎'; }
    else if (score >= 90) { label = '最高の相棒';     emoji = '✨'; }
    else if (score >= 80) { label = '親友クラス';     emoji = '🌟'; }
    else if (score >= 60) { label = 'いい相性';       emoji = '💙'; }
    else if (score >= 40) { label = '刺激ある関係';   emoji = '⚡'; }
    else if (score >= 20) { label = '成長できる関係'; emoji = '🌱'; }
    else                  { label = '正反対の引力';   emoji = '🌀'; }
    return { label, color, emoji };
  },

  // ============================================================
  // 相性の理由を生成
  // ============================================================
  getCompatReason(myScores, otherScores, mode) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);
    const pool = []; // { text, pri }

    // ─── P4 補完（決断スタイル）最優先チェック ───
    const p4a = s1.P4||50, p4b = s2.P4||50;
    const p4comp = Math.abs((p4a + p4b) - 100);
    if (p4comp < 32 && Math.abs(p4a - p4b) > 18) {
      pool.push({
        text: p4a > p4b
          ? 'あなたがリードし相手がサポートする、息の合った役割分担'
          : '相手のリードにうまく乗り、あなたが力強く支えるバランス',
        pri: 100 - p4comp
      });
    } else if (p4a > 65 && p4b > 65) {
      pool.push({ text: 'お互い意見をぶつけ合いながら最良の答えへ向かえる', pri: 60 });
    } else if (p4a < 40 && p4b < 40) {
      pool.push({ text: 'どちらも流れに乗るタイプで、強制し合わない穏やかな関係', pri: 55 });
    }

    // ─── 各次元を評価：極端な類似 or 大きな差異のみ拾う ───
    const dims = [
      { k:'P1',  loLo:'二人とも内省的で、深い思考を静かに共有できる',
                 hiHi:'二人とも社交的で、一緒にいると場が活気づく',
                 diff:'内省の深みと社交のエネルギーが互いの世界を広げ合う' },
      { k:'P3',  loLo:'お互い程よい距離を保ち、息苦しさのない関係',
                 hiHi:'二人とも深くつながることを大切にするスタンスが一致',
                 diff: null },
      { k:'P6',  loLo:'直感で動くタイプ同士、一緒だと予想外の展開が楽しい',
                 hiHi:'計画的に動くスタイルが合い、物事をスムーズに進めやすい',
                 diff:'計画力と即興力が組み合わさり、行動のバランスが取れる' },
      { k:'P7',  loLo:'穏やかなペースが一致し、焦らず信頼を育てられる',
                 hiHi:'二人の情熱と熱量が共鳴し、自然と前のめりになれる',
                 diff:'情熱と冷静さが互いの衝動と判断をうまく補い合う' },
      { k:'P8',  loLo:'慎重に考えてから動くスタンスが共通で、安心感がある',
                 hiHi:'挑戦を楽しむ姿勢が一致し、一緒に飛び込んでいける',
                 diff: null },
      { k:'P9',  loLo:'新しいものへの好奇心が似ていて、一緒に未知を探求できる',
                 hiHi:'大切なものを守る価値観が一致し、信頼の土台が安定している',
                 diff: null },
      { k:'P10', loLo:'言葉より行動で気持ちを示すスタイルが一致している',
                 hiHi:'感情を豊かに伝え合えるので、気持ちが素直に伝わりやすい',
                 diff: null },
      { k:'P13', loLo:'ストレートに本音を語り合える、遠慮のない関係',
                 hiHi:'言葉を丁寧に選ぶスタイルが合い、会話が穏やかに積み重なる',
                 diff: null },
    ];

    for (const d of dims) {
      const a = s1[d.k]||50, b = s2[d.k]||50;
      const absDiff = Math.abs(a - b), avg = (a + b) / 2;
      if (absDiff < 22) {
        // 両者が似ており、かつ平均が極端なときのみ拾う
        const notability = Math.max(Math.abs(avg - 50), 1) * (22 - absDiff) / 22;
        if (avg < 38 && d.loLo) pool.push({ text: d.loLo, pri: notability + 20 });
        else if (avg > 62 && d.hiHi) pool.push({ text: d.hiHi, pri: notability + 20 });
      } else if (absDiff > 42 && d.diff) {
        pool.push({ text: d.diff, pri: absDiff });
      }
    }

    if (mode === 'love') {
      const p14a = s1.P14||50, p14b = s2.P14||50;
      const p14avg = (p14a + p14b) / 2, p14d = Math.abs(p14a - p14b);
      if (p14d < 22) {
        if (p14avg < 38) pool.push({ text: 'さりげない気遣いで愛情を示すスタイルが共鳴する', pri: 40 });
        else if (p14avg > 62) pool.push({ text: '愛情を積極的に伝え合え、気持ちがストレートに届く', pri: 40 });
      }
      const p15avg = ((s1.P15||50) + (s2.P15||50)) / 2, p15d = Math.abs((s1.P15||50) - (s2.P15||50));
      if (p15d < 22 && p15avg > 62) pool.push({ text: '対立も正面から受け止め、より深い絆を築ける', pri: 35 });
    }

    pool.sort((a, b) => b.pri - a.pri);
    const reasons = [];
    const seen = new Set();
    for (const c of pool) {
      if (reasons.length >= 3) break;
      if (!seen.has(c.text)) { reasons.push(c.text); seen.add(c.text); }
    }
    if (reasons.length === 0) reasons.push('異なる個性が互いの視野を広げ合う関係');
    return reasons;
  },

  // ============================================================
  // 候補カードHTML
  // ============================================================
  renderCandidateCard(candidate, myScores, mode, isLocked = true) {
    const sl = this.getScoreLabel(candidate.score);
    const reasons = this.getCompatReason(myScores, candidate.scores, mode);
    const fam = candidate.family || 'Architects';
    const badgeClass = `badge-${fam.toLowerCase()}`;
    const emoji = getTypeEmoji(candidate.type_number);
    const displayName = candidate.nickname || candidate.type_name;

    // アバター: avatar_urlがあれば画像、なければ絵文字
    const avatarContent = candidate.avatar_url
      ? `<img src="${escapeHtml(candidate.avatar_url)}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`
      : emoji;

    return `
      <div class="match-card" data-user-id="${candidate.id}">
        <div class="match-card-header">
          <div class="match-user">
            <div class="match-avatar" style="background:rgba(${familyColor(fam)},.12);border:1px solid rgba(${familyColor(fam)},.3)">
              ${avatarContent}
            </div>
            <div class="match-user-info">
              <div class="match-type-name">${escapeHtml(displayName)}</div>
              <div class="match-display-id">${escapeHtml(candidate.type_name)} ${escapeHtml(candidate.display_id)} ・ <span class="badge ${badgeClass}">${fam}</span></div>
            </div>
          </div>
          <div class="match-score" style="color:${sl.color}">
            <span class="match-score-emoji">${sl.emoji}</span>
            <span class="match-score-num">${candidate.score}%</span>
            <span class="match-score-label">${sl.label}</span>
          </div>
        </div>
        <div class="match-bio">${escapeHtml(candidate.bio || '')}</div>
        <div class="match-reasons">
          ${reasons.map(r => `<div class="match-reason">✦ ${escapeHtml(r)}</div>`).join('')}
        </div>
        <div class="match-action">
          ${isLocked
            ? `<button class="btn btn-primary btn-sm match-unlock-btn" data-user-id="${candidate.id}">🔓 マッチングする（500円）</button>`
            : `<button class="btn btn-primary btn-sm" onclick="window.location.href='chat.html?user=${candidate.id}'">💬 チャットを開く</button>`
          }
        </div>
      </div>
    `;
  },
};

// タイプ絵文字（board.jsが読み込まれていない場合のフォールバック）
if (typeof getTypeEmoji === 'undefined') {
  window.getTypeEmoji = function(n) {
    const e = {1:'🦉',2:'🧭',3:'🛡️',4:'♟️',5:'🔍',6:'⚙️',7:'🏰',8:'👑',
      9:'🌌',10:'🌬️',11:'🌙',12:'🎼',13:'🌊',14:'⚡',15:'🎭',16:'🃏',
      17:'🕊️',18:'🦅',19:'⚜️',20:'🦁',21:'⚖️',22:'🔥',23:'⚒️',24:'🏛️',
      25:'☀️',26:'🔥',27:'🌿',28:'🌟',29:'🎪',30:'🌪️',31:'✨',32:'🎭'};
    return e[n] || '👤';
  };
}
if (typeof familyColor === 'undefined') {
  window.familyColor = function(f) {
    const c = {Architects:'108,92,231',Mystics:'232,67,147',Commanders:'0,184,148',Catalysts:'253,203,110'};
    return c[f] || '108,92,231';
  };
}
if (typeof escapeHtml === 'undefined') {
  window.escapeHtml = function(s) { const d=document.createElement('div');d.textContent=s;return d.innerHTML; };
}
