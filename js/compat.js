/**
 * compat.js
 * タイプ相性エンジン
 *
 * 【設計方針】
 * - スコア計算は matching.js の calcFriendScore / calcLoveScore と
 *   同一の重み係数を使用（ランダム成分のみ平均値に固定）
 * - P-スコア推定は SAMPLE_USERS の8アーキタイプから
 *   ハミング距離加重補間で算出（タイプの軸に基づく）
 */
(function () {
  'use strict';

  // ============================================================
  // 32 タイプ基本データ
  // ============================================================
  const TYPE_DATA = {
    1:  { nm:'静かなる賢者',   en:'The Quiet Sage',          fam:'Architects' },
    2:  { nm:'孤高の開拓者',   en:'The Lone Pioneer',        fam:'Architects' },
    3:  { nm:'静かなる守護者', en:'The Silent Guardian',     fam:'Architects' },
    4:  { nm:'戦略家',         en:'The Strategist',          fam:'Architects' },
    5:  { nm:'影の観察者',     en:'The Shadow Observer',     fam:'Architects' },
    6:  { nm:'闇の設計者',     en:'The Phantom Architect',   fam:'Architects' },
    7:  { nm:'鉄仮面の番人',   en:'The Iron Sentinel',       fam:'Architects' },
    8:  { nm:'黒幕',           en:'The Mastermind',          fam:'Architects' },
    9:  { nm:'詩人',           en:'The Poet',                fam:'Mystics'    },
    10: { nm:'魂の創造者',     en:'The Soul Creator',        fam:'Mystics'    },
    11: { nm:'静かなる癒し手', en:'The Gentle Healer',       fam:'Mystics'    },
    12: { nm:'情熱の建築家',   en:'The Passionate Builder',  fam:'Mystics'    },
    13: { nm:'漂流者',         en:'The Drifter',             fam:'Mystics'    },
    14: { nm:'深淵の旅人',     en:'The Abyss Walker',        fam:'Mystics'    },
    15: { nm:'影の詩人',       en:'The Shadow Poet',         fam:'Mystics'    },
    16: { nm:'仮面の指揮者',   en:'The Masked Conductor',    fam:'Mystics'    },
    17: { nm:'自由な知恵者',   en:'The Free Thinker',        fam:'Commanders' },
    18: { nm:'冒険家',         en:'The Adventurer',          fam:'Commanders' },
    19: { nm:'調停者',         en:'The Mediator',            fam:'Commanders' },
    20: { nm:'指揮官',         en:'The Commander',           fam:'Commanders' },
    21: { nm:'社交の狐',       en:'The Social Fox',          fam:'Commanders' },
    22: { nm:'策士',           en:'The Tactician',           fam:'Commanders' },
    23: { nm:'鉄壁の外交官',   en:'The Iron Diplomat',       fam:'Commanders' },
    24: { nm:'帝王',           en:'The Emperor',             fam:'Commanders' },
    25: { nm:'太陽',           en:'The Sun',                 fam:'Catalysts'  },
    26: { nm:'炎の伝道者',     en:'The Firestarter',         fam:'Catalysts'  },
    27: { nm:'共感者',         en:'The Empath',              fam:'Catalysts'  },
    28: { nm:'情熱のリーダー', en:'The Passionate Leader',   fam:'Catalysts'  },
    29: { nm:'道化師',         en:'The Trickster',           fam:'Catalysts'  },
    30: { nm:'カリスマ',       en:'The Charisma',            fam:'Catalysts'  },
    31: { nm:'舞台の演者',     en:'The Performer',           fam:'Catalysts'  },
    32: { nm:'仮面の太陽',     en:'The Masked Sun',          fam:'Catalysts'  },
  };

  // 歴史上の人物名（相性カード用 ─ 短縮版）
  const FIGURE_NAMES = {
    1:'ニュートン',       2:'テスラ',           3:'マルクス・アウレリウス',
    4:'アレクサンダー大王',5:'ダーウィン',       6:'マキャヴェリ',
    7:'カント',           8:'孫子',             9:'ブレイク',
    10:'ダ・ヴィンチ',   11:'ナイチンゲール',  12:'ガウディ',
    13:'ニーチェ',        14:'エドガー・ポー',  15:'ランボー',
    16:'シェイクスピア', 17:'フランクリン',    18:'マゼラン',
    19:'リンカーン',      20:'ナポレオン',      21:'タレーラン',
    22:'カエサル',        23:'ビスマルク',      24:'チンギス・ハン',
    25:'ガンジー',        26:'キング牧師',      27:'マザー・テレサ',
    28:'ジャンヌ・ダルク',29:'モーツァルト',    30:'クレオパトラ',
    31:'チャップリン',    32:'ルイ14世',
  };

  // ============================================================
  // ファミリー設定（share-card.js と同一）
  // ============================================================
  const FAM = {
    Architects: { color:'#6c5ce7', accent:'#a29bfe', dark:'#0b091e', mid:'#151030', label:'設計者族', emoji:'🏛' },
    Mystics:    { color:'#e84393', accent:'#fd79a8', dark:'#1a0714', mid:'#260f1f', label:'神秘者族', emoji:'🌙' },
    Commanders: { color:'#00b894', accent:'#55efc4', dark:'#04130f', mid:'#071f18', label:'指揮者族', emoji:'⚔' },
    Catalysts:  { color:'#e0a800', accent:'#ffeaa7', dark:'#15100a', mid:'#211808', label:'触媒者族', emoji:'🔥' },
  };

  // ============================================================
  // アーキタイプ P-スコア（matching.js の SAMPLE_USERS から転記）
  // タイプ番号 → P1-P15 の典型値
  // ============================================================
  // ×1.4 ストレッチ済み（元値から 50+(v-50)*1.4 で変換、1-99クランプ）
  const ARCHETYPE_SCORES = {
    1:  {P1:11,P2:19,P3:89,P4:19,P5:43,P6:95,P7:29,P8:22,P9:39,P10:57,P11:15,P12:25,P13:29,P14:19,P15:33},
    3:  {P1: 8,P2:29,P3:81,P4:33,P5:64,P6:57,P7:22,P8:15,P9:89,P10:11,P11:19,P12:71,P13:39,P14:61,P15:43},
    9:  {P1:29,P2:81,P3:75,P4:22,P5:57,P6:67,P7:89,P8:78,P9:15,P10:71,P11:81,P12:61,P13:75,P14:81,P15:29},
    11: {P1:19,P2:75,P3:67,P4:15,P5:39,P6:57,P7:43,P8:61,P9:81,P10:22,P11:71,P12:85,P13:89,P14:92,P15:39},
    14: {P1:78,P2:75,P3:85,P4:39,P5:81,P6:89,P7:71,P8:95,P9:22,P10:92,P11:29,P12:39,P13:57,P14:33,P15:19},
    20: {P1:57,P2:15,P3:29,P4:95,P5:47,P6:22,P7:81,P8:29,P9:92,P10:71,P11:43,P12:33,P13:22,P14:39,P15:81},
    25: {P1:39,P2:71,P3:19,P4:61,P5:29,P6: 8,P7:95,P8:57,P9:43,P10:81,P11:92,P12:75,P13:85,P14:95,P15:67},
    26: {P1:47,P2:61,P3:25,P4:75,P5:33,P6:11,P7:99,P8:67,P9:29,P10:89,P11:95,P12:57,P13:71,P14:81,P15:61},
  };
  const ARCHETYPE_KEYS = Object.keys(ARCHETYPE_SCORES).map(Number);

  // ============================================================
  // 軸抽出（タイプ番号 n の5軸を取得）
  // Type n のビット構造:
  //   Bit4(MSB)=C(Core/Social), Bit3=E(Logic/Passion),
  //   Bit2=M(Open/Veiled),      Bit1=S(Free/Order),
  //   Bit0=D(Flow/Drive)
  // ============================================================
  function getAxes(n) {
    const i = n - 1;
    return {
      c: (i >> 4) & 1,  // 0=Core,  1=Social
      e: (i >> 3) & 1,  // 0=Logic, 1=Passion
      m: (i >> 2) & 1,  // 0=Open,  1=Veiled
      s: (i >> 1) & 1,  // 0=Free,  1=Order
      d:  i       & 1,  // 0=Flow,  1=Drive
    };
  }

  // ============================================================
  // P-スコア推定（アーキタイプからの補間）
  // 軸のハミング距離が近いほど重みが高い
  // ============================================================
  function getTypicalScores(n) {
    if (ARCHETYPE_SCORES[n]) return ARCHETYPE_SCORES[n];

    const ax = getAxes(n);
    const weights = ARCHETYPE_KEYS.map(k => {
      const axk = getAxes(k);
      const dist = ['c','e','m','s','d']
        .filter(axis => ax[axis] !== axk[axis]).length;
      return dist === 0 ? 10000 : 1 / (dist * dist);
    });
    const totalW = weights.reduce((a, b) => a + b, 0);

    const result = {};
    for (let i = 1; i <= 15; i++) {
      const key = 'P' + i;
      let val = 0;
      ARCHETYPE_KEYS.forEach((k, idx) => {
        val += weights[idx] * ARCHETYPE_SCORES[k][key];
      });
      result[key] = Math.round(val / totalW);
    }
    return result;
  }

  // ============================================================
  // 相性スコア計算
  // matching.js の calcFriendScore / calcLoveScore と同一係数
  // ランダム成分のみ各レンジの中央値（固定値）に置換
  // ============================================================
  // ============================================================
  // スコア → グラデーションカラー（matching.js と同一）
  // ============================================================
  function gradientColor(score) {
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

  function calcScores(n1, n2) {
    const s1 = getTypicalScores(n1);
    const s2 = getTypicalScores(n2);
    const ax1 = getAxes(n1);
    const ax2 = getAxes(n2);

    // P1-P12 類似度（P4除く・11次元）
    // P4（意思決定スタイル）は「補完が良い」次元なので別途計算
    let sim = 0;
    for (let i = 1; i <= 12; i++) {
      if (i === 4) continue;
      sim += 100 - Math.abs((s1['P'+i]||50) - (s2['P'+i]||50));
    }
    sim /= 11;

    const p13c = 100 - Math.abs((s1.P13||50) - (s2.P13||50));

    // P4 補完スコア：決める人×任せる人=100、決める人×決める人=衝突で低スコア
    // 式: 100 - |P4A + P4B - 100|
    //   補完例: P4=80+P4=20 → |80+20-100|=0 → 100（最高）
    //   衝突例: P4=90+P4=90 → |90+90-100|=80 → 20（低）
    //   中立例: P4=50+P4=50 → |50+50-100|=0 → 100（摩擦なし）
    const p4sum = (s1.P4||50) + (s2.P4||50);
    const p4c   = 100 - Math.abs(p4sum - 100);

    // --- 友人相性 ---
    // ■ CEMS軸（C=内向/外向 E=論理/感情 M=開放/秘匿 S=自由/秩序）
    //   → 「一緒にいて楽」な次元：似ているほど良い（各+23）
    // ■ D軸（Flow/Drive = 決断スタイル）
    //   → 補完が良い：決める人×任せる人 = 摩擦なし（+50ボーナス）
    //   → 同じだと衝突可能性（ボーナスなし、-30ベースで引かれる）
    // axisChemFriend 範囲:
    //   0CEMS + D同じ → -30（正反対の引力）     ← 全く合わない + 両者が仕切りたがる
    //   0CEMS + D補完 → +20（刺激ある関係）     ← 正反対だけど決断スタイルは補完
    //   4CEMS + D同じ → +62（親友クラス）       ← 同タイプ = ここ（~74%）
    //   4CEMS + D補完 → +112（運命的・理論値）  ← 同じ世界観 + 決断スタイル補完 = 最高
    // dComplement=50 にすることで、全問一致+P4補完の場合に99%到達可能
    const cemsMatch    = ['c','e','m','s'].filter(a => ax1[a] === ax2[a]).length;
    const dComplement  = ax1.d !== ax2.d ? 1 : 0;
    const axisChemFriend = cemsMatch * 23 + dComplement * 50 - 30;

    const friendRaw   = 0.30 * sim + 0.10 * p13c + 0.10 * p4c + 0.50 * axisChemFriend;
    const friendScore = Math.min(99, Math.max(5, Math.round(friendRaw)));

    // --- 恋愛相性 ---
    // D軸補完（+40）は恋愛でさらに重要：「引っ張る人×ついていく人」が恋愛の理想
    const loveAxisChem = cemsMatch * 15 + dComplement * 40; // max: 60+40=100
    const p14c  = 100 - Math.abs((s1.P14||50) - (s2.P14||50));
    const p15c  = 100 - Math.abs((s1.P15||50) - (s2.P15||50)) * 0.8;
    const loveRaw   = 0.30 * sim + 0.15 * p4c + 0.20 * p14c + 0.15 * p15c + 0.20 * loveAxisChem;
    const loveScore = Math.min(99, Math.max(15, Math.round(loveRaw)));

    return { friendScore, loveScore };
  }

  // ============================================================
  // スコアからティアを返す（matching.js の getScoreLabel と整合）
  // ============================================================
  function getTier(score) {
    const color = gradientColor(score);
    if (score >= 95) return { label:'運命的な相性',   short:'運命', emoji:'💎', color };
    if (score >= 90) return { label:'最高の相棒',     short:'最高', emoji:'✨', color };
    if (score >= 80) return { label:'親友クラス',     short:'親友', emoji:'🌟', color };
    if (score >= 60) return { label:'いい相性',       short:'いい', emoji:'💙', color };
    if (score >= 40) return { label:'刺激ある関係',   short:'刺激', emoji:'⚡', color };
    if (score >= 20) return { label:'成長できる関係', short:'成長', emoji:'🌱', color };
    return                   { label:'正反対の引力',  short:'引力', emoji:'🌀', color };
  }

  // ============================================================
  // テキスト折り返し（share-card.js と同一ロジック）
  // ============================================================
  function wrapText(ctx, text, cx, startY, maxW, lineH) {
    const paras = text.split('\n');
    let curY = startY;
    paras.forEach(para => {
      if (!para) { curY += lineH; return; }
      let line = '';
      for (const ch of para) {
        const test = line + ch;
        if (ctx.measureText(test).width > maxW && line) {
          ctx.fillText(line, cx, curY);
          curY += lineH;
          line = ch;
        } else { line = test; }
      }
      if (line) { ctx.fillText(line, cx, curY); curY += lineH; }
    });
    return curY - startY;
  }

  // ============================================================
  // 相性カード描画（1080 × 1080 px）
  // ============================================================
  function drawCompatCard(canvas, d1, d2, scores) {
    const W = 1080, H = 1080;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');

    const f1 = FAM[d1.fam] || FAM.Architects;
    const f2 = FAM[d2.fam] || FAM.Architects;
    const tier = getTier(scores.friendScore);

    // ── 背景（左右ファミリーカラーのグラデーション）────────────
    const bg = ctx.createLinearGradient(0, 0, W, 0);
    bg.addColorStop(0,    f1.dark);
    bg.addColorStop(0.42, '#080814');
    bg.addColorStop(0.58, '#080814');
    bg.addColorStop(1,    f2.dark);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // ── 左グロー ──────────────────────────────────────────────
    const gl1 = ctx.createRadialGradient(230, H * 0.42, 0, 230, H * 0.42, 380);
    gl1.addColorStop(0, f1.color + '28'); gl1.addColorStop(1, 'transparent');
    ctx.fillStyle = gl1; ctx.fillRect(0, 0, W / 2, H);

    // ── 右グロー ──────────────────────────────────────────────
    const gl2 = ctx.createRadialGradient(W - 230, H * 0.42, 0, W - 230, H * 0.42, 380);
    gl2.addColorStop(0, f2.color + '28'); gl2.addColorStop(1, 'transparent');
    ctx.fillStyle = gl2; ctx.fillRect(W / 2, 0, W / 2, H);

    // ── 中央縦ライン ─────────────────────────────────────────
    const divGrad = ctx.createLinearGradient(W / 2 - 1, 0, W / 2 + 1, 0);
    divGrad.addColorStop(0, f1.color + '55');
    divGrad.addColorStop(0.5, 'rgba(255,255,255,0.25)');
    divGrad.addColorStop(1, f2.color + '55');
    ctx.fillStyle = divGrad;
    ctx.fillRect(W / 2 - 1, 130, 2, H - 260);

    // ── 上部ボーダーライン ────────────────────────────────────
    const topLine = ctx.createLinearGradient(80, 0, W - 80, 0);
    topLine.addColorStop(0, f1.color); topLine.addColorStop(1, f2.color);
    ctx.fillStyle = topLine;
    ctx.fillRect(80, 58, W - 160, 2);

    ctx.textAlign = 'center';

    // ── タイトル ─────────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = `300 22px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText('SINC  TYPE  COMPATIBILITY', W / 2, 105);

    // ──────────────────────────────────────────────────────────
    // 左パネル（Type 1）
    // ──────────────────────────────────────────────────────────
    const LX = W / 4;  // 270

    ctx.fillStyle = f1.accent + 'bb';
    ctx.font = `500 20px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(`${f1.emoji}  ${d1.fam}  ／  ${f1.label}`, LX, 160);

    ctx.fillStyle = f1.color + 'aa';
    ctx.font = `300 26px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText(`Type ${String(d1.n).padStart(2,'0')}`, LX, 200);

    ctx.fillStyle = '#ffffff';
    let sz1 = 68;
    ctx.font = `700 ${sz1}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    while (ctx.measureText(d1.nm).width > 290 && sz1 > 28) {
      sz1 -= 2;
      ctx.font = `700 ${sz1}px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    }
    ctx.textBaseline = 'middle';
    ctx.fillText(d1.nm, LX, 265);
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = f1.accent;
    ctx.font = `300 italic 24px 'Georgia',serif`;
    ctx.fillText(d1.en, LX, 325);

    ctx.fillStyle = f1.accent + '88';
    ctx.font = `400 18px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(FIGURE_NAMES[d1.n] || '', LX, 360);

    // ──────────────────────────────────────────────────────────
    // 右パネル（Type 2）
    // ──────────────────────────────────────────────────────────
    const RX = W * 3 / 4;  // 810

    ctx.fillStyle = f2.accent + 'bb';
    ctx.font = `500 20px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(`${f2.emoji}  ${d2.fam}  ／  ${f2.label}`, RX, 160);

    ctx.fillStyle = f2.color + 'aa';
    ctx.font = `300 26px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText(`Type ${String(d2.n).padStart(2,'0')}`, RX, 200);

    ctx.fillStyle = '#ffffff';
    let sz2 = 68;
    ctx.font = `700 ${sz2}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    while (ctx.measureText(d2.nm).width > 290 && sz2 > 28) {
      sz2 -= 2;
      ctx.font = `700 ${sz2}px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    }
    ctx.textBaseline = 'middle';
    ctx.fillText(d2.nm, RX, 265);
    ctx.textBaseline = 'alphabetic';

    ctx.fillStyle = f2.accent;
    ctx.font = `300 italic 24px 'Georgia',serif`;
    ctx.fillText(d2.en, RX, 325);

    ctx.fillStyle = f2.accent + '88';
    ctx.font = `400 18px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(FIGURE_NAMES[d2.n] || '', RX, 360);

    // ──────────────────────────────────────────────────────────
    // 中央スコアサークル
    // ──────────────────────────────────────────────────────────
    const CX = W / 2, CY = 260, CR = 90;

    // 背景円
    ctx.beginPath(); ctx.arc(CX, CY, CR + 10, 0, Math.PI * 2);
    ctx.fillStyle = '#080814'; ctx.fill();
    ctx.beginPath(); ctx.arc(CX, CY, CR + 10, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 1; ctx.stroke();

    // スコアアーク（グラデーション）
    const arcGrad = ctx.createLinearGradient(CX - CR, CY, CX + CR, CY);
    arcGrad.addColorStop(0, f1.color); arcGrad.addColorStop(1, f2.color);
    const pct = scores.friendScore / 100;
    ctx.beginPath();
    ctx.arc(CX, CY, CR, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * pct);
    ctx.strokeStyle = arcGrad; ctx.lineWidth = 8; ctx.lineCap = 'round';
    ctx.stroke();

    // スコア数値
    ctx.fillStyle = '#ffffff'; ctx.textAlign = 'center';
    ctx.font = `700 42px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText(`${scores.friendScore}%`, CX, CY + 8);
    ctx.fillStyle = tier.color;
    ctx.font = `500 15px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(tier.label, CX, CY + 30);

    // ── 区切り線 ────────────────────────────────────────────────
    const sepY = 420;
    const sep = ctx.createLinearGradient(120, 0, W - 120, 0);
    sep.addColorStop(0, f1.color + '44');
    sep.addColorStop(0.5, 'rgba(255,255,255,0.2)');
    sep.addColorStop(1, f2.color + '44');
    ctx.fillStyle = sep;
    ctx.fillRect(120, sepY, W - 240, 1);

    // ── 相性スコア詳細（友人 / 恋愛）──────────────────────────
    const scoreBarY = 450;
    [[scores.friendScore, '👫 友人相性', f1.color], [scores.loveScore, '💕 恋愛相性', f2.color]].forEach(([sc, label, col], idx) => {
      const bx = idx === 0 ? 140 : W / 2 + 20;
      const bw = W / 2 - 160;
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.font = `400 16px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText(label, bx, scoreBarY);
      ctx.fillStyle = 'rgba(255,255,255,0.12)';
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, scoreBarY + 8, bw, 8, 4)
                    : (ctx.rect(bx, scoreBarY + 8, bw, 8));
      ctx.fill();
      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, scoreBarY + 8, bw * (sc / 100), 8, 4)
                    : (ctx.rect(bx, scoreBarY + 8, bw * (sc / 100), 8));
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `600 15px 'Helvetica Neue',sans-serif`;
      ctx.fillText(`${sc}%`, bx + bw + 8, scoreBarY + 16);
    });

    ctx.textAlign = 'center';

    // ── 相性の理由（上位2つ）────────────────────────────────────
    const s1 = getTypicalScores(d1.n), s2 = getTypicalScores(d2.n);
    const reasons = buildCompatReasons(s1, s2, d1.n, d2.n);
    const reasonY = 510;
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.font = `400 19px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    reasons.slice(0, 2).forEach((r, i) => {
      ctx.fillText('✦  ' + r, W / 2, reasonY + i * 36);
    });

    // ── ファミリーペア説明 ────────────────────────────────────
    const descKey   = `${d1.fam}-${d2.fam}`;
    const descKeyRv = `${d2.fam}-${d1.fam}`;
    const desc = FAMILY_DESC[descKey] || FAMILY_DESC[descKeyRv] || '';
    if (desc) {
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      ctx.font = `400 20px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
      wrapText(ctx, desc, W / 2, 600, 860, 36);
    }

    // ── 歴史上の人物ペア ──────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = `300 17px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(
      `〜 ${FIGURE_NAMES[d1.n] || ''}  ×  ${FIGURE_NAMES[d2.n] || ''} のような関係 〜`,
      W / 2, 700
    );

    // ── 下部区切り ────────────────────────────────────────────
    ctx.fillStyle = sep;
    ctx.fillRect(120, 730, W - 240, 1);

    // ── ブランディング ────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = `700 34px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText('Sinc', W / 2, 790);

    ctx.fillStyle = 'rgba(255,255,255,0.25)';
    ctx.font = `300 17px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText('by StratAIX', W / 2, 818);

    ctx.fillStyle = tier.color + 'bb';
    ctx.font = `400 19px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText('sinc.strataix.net  ／  あなたのタイプ相性を診断しよう', W / 2, 854);

    // ── 下部ボーダーライン ────────────────────────────────────
    const botLine = ctx.createLinearGradient(80, 0, W - 80, 0);
    botLine.addColorStop(0, f1.color); botLine.addColorStop(1, f2.color);
    ctx.fillStyle = botLine;
    ctx.fillRect(80, H - 60, W - 160, 2);
  }

  // ============================================================
  // 相性の理由テキスト（5軸 + P値ベースで各ペア固有の文を生成）
  // ============================================================
  function buildCompatReasons(s1, s2, n1, n2) {
    const ax1 = getAxes(n1), ax2 = getAxes(n2);
    const pool = []; // { text, pri }

    // ─── D軸（Flow=0 vs Drive=1）：補完が恋愛・友情ともに最も重要 ───
    if (ax1.d !== ax2.d) {
      pool.push({ text: '一方が方向を示し、もう一方が流れを読む自然なリズム', pri: 90 });
    } else if (ax1.d === 1) {
      pool.push({ text: '二人ともエンジンを切らず、一緒にいると推進力が生まれる', pri: 70 });
    } else {
      pool.push({ text: '強制し合わず流れの中で動ける、穏やかな組み合わせ', pri: 65 });
    }

    // ─── E軸（Logic=0 vs Passion=1）：思考スタイルの一致か補完か ───
    if (ax1.e !== ax2.e) {
      pool.push({ text: '論理と感性が交差し、互いにない視点を持ち込み合える', pri: 82 });
    } else if (ax1.e === 0) {
      pool.push({ text: '理論と分析を共通言語に、深い対話が生まれやすい', pri: 62 });
    } else {
      pool.push({ text: '感情と直感を大切にするスタイルが共鳴し合う', pri: 62 });
    }

    // ─── C軸（Core=0 vs Social=1）：内向・外向の組み合わせ ───
    if (ax1.c !== ax2.c) {
      pool.push({ text: '内省の深みと社交のエネルギーが互いの世界を広げる', pri: 76 });
    } else if (ax1.c === 0) {
      pool.push({ text: '内省的な深みを持つ者同士、言葉を選んで理解し合える', pri: 55 });
    } else {
      pool.push({ text: '社交的なエネルギーが共鳴し、場を活気づける組み合わせ', pri: 55 });
    }

    // ─── S軸（Free=0 vs Order=1）：自由か規律か ───
    if (ax1.s !== ax2.s) {
      pool.push({ text: '自由な発想と計画力が組み合わさり、行動の幅が広がる', pri: 68 });
    } else if (ax1.s === 0) {
      pool.push({ text: '自由で柔軟なペースが合い、窮屈さを感じない', pri: 52 });
    } else {
      pool.push({ text: '計画と規律を大切にするスタイルが共鳴する', pri: 52 });
    }

    // ─── M軸（Open=0 vs Veiled=1）：オープンか内に秘めるか ───
    if (ax1.m === ax2.m) {
      if (ax1.m === 0) pool.push({ text: 'オープンに思いを出し合えるスタイルが一致している', pri: 50 });
      else             pool.push({ text: '内面を大切にするスタイルが共鳴し、深い理解が生まれやすい', pri: 50 });
    } else {
      pool.push({ text: '本音をさらす者と内に秘める者が、互いの謎を引き出し合う', pri: 48 });
    }

    // ─── P4 補完（決断 vs 委任）───
    const p4comp = Math.abs((s1.P4||50) + (s2.P4||50) - 100);
    if (p4comp < 30) pool.push({ text: 'リードするタイプとサポートするタイプ、役割が自然に決まる', pri: 85 });

    // ─── P7（エネルギー量）───
    const p7avg = ((s1.P7||50) + (s2.P7||50)) / 2;
    const p7diff = Math.abs((s1.P7||50) - (s2.P7||50));
    if (p7diff < 22 && p7avg > 65) pool.push({ text: '二人の情熱と熱量が共鳴し、場を動かす力がある', pri: 72 });
    else if (p7diff < 22 && p7avg < 35) pool.push({ text: '穏やかなペースが一致し、じっくり関係を育てられる', pri: 68 });
    else if (p7diff > 40) pool.push({ text: '情熱と冷静さのバランスが取れた組み合わせ', pri: 60 });

    pool.sort((a, b) => b.pri - a.pri);
    const reasons = [];
    const seen = new Set();
    for (const c of pool) {
      if (reasons.length >= 2) break;
      if (!seen.has(c.text)) { reasons.push(c.text); seen.add(c.text); }
    }
    return reasons;
  }

  // ============================================================
  // ファミリーペア説明
  // ============================================================
  const FAMILY_DESC = {
    'Architects-Architects': '論理と論理の深い対話。\n緻密な思考世界を共に構築できる。',
    'Architects-Mystics':    '設計と感性の融合。\n冷静な分析と豊かな感情が補い合う。',
    'Architects-Commanders': '知性と行動力の共鳴。\n理論と実践が手を組んで力を発揮する。',
    'Architects-Catalysts':  '静と動、正反対が惹かれ合う。\n互いの世界を広げる稀有な関係。',
    'Mystics-Mystics':       '感情と感情の深い共鳴。\n互いの内世界を理解し合う絆。',
    'Mystics-Commanders':    '夢と実行力の組み合わせ。\n内なる情熱と外向きのエネルギーが反応する。',
    'Mystics-Catalysts':     '感情の共鳴が生む深い絆。\n共に感じ、共に動くパートナーシップ。',
    'Commanders-Commanders': 'リーダー同士の切磋琢磨。\n競い合いながら互いを高め合う。',
    'Commanders-Catalysts':  '情熱 × 行動。\n共に動き共に熱くなれる活力に満ちた関係。',
    'Catalysts-Catalysts':   '情熱同士の対話。\n互いの熱さが火花を散らす最も燃え上がる関係。',
  };

  // ============================================================
  // 公開 API
  // ============================================================
  const Compat = {
    /** 相性スコアを返す { friendScore, loveScore } */
    score(n1, n2) {
      return calcScores(n1, n2);
    },

    /** スコアからティア情報を返す */
    tier(score) {
      return getTier(score);
    },

    /** タイプデータを番号から取得 */
    typeData(n) {
      return { n, ...TYPE_DATA[n] };
    },

    /** 相性カード Canvas 描画 */
    CompatCard: {
      draw(canvas, n1, n2) {
        if (!canvas || !n1 || !n2) return;
        const d1 = { n: n1, ...TYPE_DATA[n1] };
        const d2 = { n: n2, ...TYPE_DATA[n2] };
        const scores = calcScores(n1, n2);
        drawCompatCard(canvas, d1, d2, scores);
      },

      download(n1, n2) {
        const canvas = document.createElement('canvas');
        this.draw(canvas, n1, n2);
        const d1 = TYPE_DATA[n1] || {};
        const d2 = TYPE_DATA[n2] || {};
        const a  = document.createElement('a');
        a.href     = canvas.toDataURL('image/png');
        a.download = `sinc-compat-t${String(n1).padStart(2,'0')}-t${String(n2).padStart(2,'0')}.png`;
        a.click();
      },

      shareToX(n1, n2) {
        const scores = calcScores(n1, n2);
        const d1  = TYPE_DATA[n1] || {};
        const d2  = TYPE_DATA[n2] || {};
        const tier = getTier(scores.friendScore);
        const text = encodeURIComponent(
          `🔮 Sincで相性診断！\n` +
          `「${d1.nm}」×「${d2.nm}」\n` +
          `友人相性: ${scores.friendScore}%  恋愛相性: ${scores.loveScore}%\n` +
          `${tier.emoji} ${tier.label}\n\n` +
          `#Sinc相性診断 #性格診断`
        );
        const url = encodeURIComponent('https://sinc.strataix.net/compat-matrix.html');
        window.open(
          `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
          '_blank', 'width=560,height=440'
        );
      },

      shareToInsta(n1, n2) {
        const canvas = document.createElement('canvas');
        this.draw(canvas, n1, n2);
        const d1 = TYPE_DATA[n1] || {};
        const d2 = TYPE_DATA[n2] || {};
        const scores = calcScores(n1, n2);
        const tier = getTier(scores.friendScore);
        const fileName = `sinc-compat-t${String(n1).padStart(2,'0')}-t${String(n2).padStart(2,'0')}.png`;
        canvas.toBlob(async (blob) => {
          const file = new File([blob], fileName, { type: 'image/png' });
          // Web Share API（モバイルでInstagramなどに直接シェア）
          if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({
                files: [file],
                title: 'Sinc 相性診断',
                text: `「${d1.nm}」×「${d2.nm}」 ${tier.emoji} ${tier.label} ${scores.friendScore}%\n#Sinc相性診断 #性格診断`,
              });
            } catch (e) {
              if (e.name !== 'AbortError') this.download(n1, n2);
            }
          } else {
            // PCなど非対応環境はダウンロードにフォールバック
            this.download(n1, n2);
          }
        });
      },
    },
  };

  window.Compat = Compat;
})();
