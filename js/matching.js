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
    [42,  225, 112, 85 ],   // オレンジ（成長できる関係）
    [55,  253, 203, 110],   // イエロー（刺激ある関係）
    [68,  9,   132, 227],   // ブルー（良い相性）
    [78,  108, 92,  231],   // パープル（最高の相棒）
    [88,  0,   184, 148],   // グリーン（運命的）
    [99,  0,   230, 180],   // ブライトグリーン
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
    {id:'s2',display_id:'#R4P8',type_number:3,type_name:'静かなる守護者',family:'Architects',
     nickname:'はるか',avatar_url:null,
     scores:{P1:20,P2:35,P3:72,P4:38,P5:60,P6:55,P7:30,P8:25,P9:78,P10:22,P11:28,P12:65,P13:42,P14:58,P15:45},
     bio:'料理と散歩が趣味。大切な人と穏やかに過ごしたい。'},
    {id:'s3',display_id:'#J5N9',type_number:25,type_name:'太陽',family:'Catalysts',
     nickname:'たいよう',avatar_url:null,
     scores:{P1:42,P2:65,P3:28,P4:58,P5:35,P6:20,P7:82,P8:55,P9:45,P10:72,P11:80,P12:68,P13:75,P14:82,P15:62},
     bio:'アウトドアとフェス好き！楽しいこと大好き人間です。'},
    {id:'s4',display_id:'#W8E3',type_number:14,type_name:'深淵の旅人',family:'Mystics',
     nickname:'れん',avatar_url:null,
     scores:{P1:70,P2:68,P3:75,P4:42,P5:72,P6:78,P7:65,P8:82,P9:30,P10:80,P11:35,P12:42,P13:55,P14:38,P15:28},
     bio:'旅と写真。誰も行かない場所に惹かれます。'},
    {id:'s5',display_id:'#T2L6',type_number:20,type_name:'指揮官',family:'Commanders',
     nickname:'まさと',avatar_url:null,
     scores:{P1:55,P2:25,P3:35,P4:82,P5:48,P6:30,P7:72,P8:35,P9:80,P10:65,P11:45,P12:38,P13:30,P14:42,P15:72},
     bio:'経営者。ビジョンを語り合える人を探してます。'},
    {id:'s6',display_id:'#A9F1',type_number:11,type_name:'静かなる癒し手',family:'Mystics',
     nickname:'みさき',avatar_url:null,
     scores:{P1:28,P2:68,P3:62,P4:25,P5:42,P6:55,P7:45,P8:58,P9:72,P10:30,P11:65,P12:75,P13:78,P14:80,P15:42},
     bio:'看護師です。人の話を聞くのが好き。穏やかな関係を望んでます。'},
    {id:'s7',display_id:'#B3G7',type_number:26,type_name:'炎の伝道者',family:'Catalysts',
     nickname:'こうた',avatar_url:null,
     scores:{P1:48,P2:58,P3:32,P4:68,P5:38,P6:22,P7:88,P8:62,P9:35,P10:78,P11:82,P12:55,P13:65,P14:72,P15:58},
     bio:'スタートアップで働いてます。情熱を分かち合える仲間がほしい！'},
    {id:'s8',display_id:'#C6H4',type_number:1,type_name:'静かなる賢者',family:'Architects',
     nickname:'あおい',avatar_url:null,
     scores:{P1:22,P2:28,P3:78,P4:28,P5:45,P6:82,P7:35,P8:30,P9:42,P10:55,P11:25,P12:32,P13:35,P14:28,P15:38},
     bio:'読書と哲学。深い話ができる人と繋がりたい。'},
  ],

  // ============================================================
  // 相性スコア計算（友人マッチング）
  // 設計思想：似た人ほど最高の友達 → P1-P12全類似度が主軸
  // ============================================================
  calcFriendScore(myScores, otherScores) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);

    // P1-P12 全般類似度（主軸：75%）
    let similarity = 0;
    for (let i = 1; i <= 12; i++) {
      similarity += 100 - Math.abs((s1['P' + i] || 50) - (s2['P' + i] || 50));
    }
    similarity /= 12;

    // P13 対話スタイル一致（25%）：話し方が似ているほど心地よい
    const p13compat = 100 - Math.abs((s1.P13 || 50) - (s2.P13 || 50));

    const score = Math.round(0.75 * similarity + 0.25 * p13compat);
    return Math.min(99, Math.max(15, score));
  },

  // ============================================================
  // 相性スコア計算（恋人マッチング）
  // 設計思想：基本は類似、ただしP4（意思決定）は補完が理想
  // ============================================================
  calcLoveScore(myScores, otherScores) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);

    // P1-P12 全般類似度（40%）
    let similarity = 0;
    for (let i = 1; i <= 12; i++) {
      similarity += 100 - Math.abs((s1['P' + i] || 50) - (s2['P' + i] || 50));
    }
    similarity /= 12;

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
    if      (score >= 88) { label = '運命的な相性';   emoji = '💎'; }
    else if (score >= 78) { label = '最高の相棒';     emoji = '✨'; }
    else if (score >= 68) { label = '良い相性';       emoji = '💙'; }
    else if (score >= 55) { label = '刺激ある関係';   emoji = '⚡'; }
    else if (score >= 42) { label = '成長できる関係'; emoji = '🌱'; }
    else                  { label = '正反対の引力';   emoji = '🌀'; }
    return { label, color, emoji };
  },

  // ============================================================
  // 相性の理由を生成
  // ============================================================
  getCompatReason(myScores, otherScores, mode) {
    const s1 = stretchScores(myScores);
    const s2 = stretchScores(otherScores);
    const reasons = [];

    // P3 対人距離
    if (Math.abs((s1.P3||50) - (s2.P3||50)) < 22) reasons.push('距離感が似ていて自然体でいられる');
    // P7 覚醒動機
    if (Math.abs((s1.P7||50) - (s2.P7||50)) < 28) reasons.push('物事への熱量が近くテンポが合う');
    // P13 対話スタイル
    if (Math.abs((s1.P13||50) - (s2.P13||50)) < 28) reasons.push('会話スタイルが合って話しやすい');

    if (mode === 'love') {
      // P14 愛着表現
      if (Math.abs((s1.P14||50) - (s2.P14||50)) < 28) reasons.push('愛情表現の形が似ていてすれ違いが少ない');
      // P4 補完性
      if (Math.abs(((s1.P4||50) + (s2.P4||50)) - 100) < 28) reasons.push('リーダーとサポーターのバランスが良い');
    }

    if (reasons.length === 0) reasons.push('異なる視点が互いを豊かにする');
    return reasons.slice(0, 3);
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
