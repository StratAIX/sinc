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
  const ARCHETYPE_SCORES = {
    1:  {P1:22,P2:28,P3:78,P4:28,P5:45,P6:82,P7:35,P8:30,P9:42,P10:55,P11:25,P12:32,P13:35,P14:28,P15:38},
    3:  {P1:20,P2:35,P3:72,P4:38,P5:60,P6:55,P7:30,P8:25,P9:78,P10:22,P11:28,P12:65,P13:42,P14:58,P15:45},
    9:  {P1:35,P2:72,P3:68,P4:30,P5:55,P6:62,P7:78,P8:70,P9:25,P10:65,P11:72,P12:58,P13:68,P14:72,P15:35},
    11: {P1:28,P2:68,P3:62,P4:25,P5:42,P6:55,P7:45,P8:58,P9:72,P10:30,P11:65,P12:75,P13:78,P14:80,P15:42},
    14: {P1:70,P2:68,P3:75,P4:42,P5:72,P6:78,P7:65,P8:82,P9:30,P10:80,P11:35,P12:42,P13:55,P14:38,P15:28},
    20: {P1:55,P2:25,P3:35,P4:82,P5:48,P6:30,P7:72,P8:35,P9:80,P10:65,P11:45,P12:38,P13:30,P14:42,P15:72},
    25: {P1:42,P2:65,P3:28,P4:58,P5:35,P6:20,P7:82,P8:55,P9:45,P10:72,P11:80,P12:68,P13:75,P14:82,P15:62},
    26: {P1:48,P2:58,P3:32,P4:68,P5:38,P6:22,P7:88,P8:62,P9:35,P10:78,P11:82,P12:55,P13:65,P14:72,P15:58},
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
  function calcScores(n1, n2) {
    const s1 = getTypicalScores(n1);
    const s2 = getTypicalScores(n2);

    // --- 友人相性（calcFriendScore 準拠）---
    // 0.55 × P1-P12類似度 + 0.20 × P13類似度 + 0.25 × 80（趣味ランダム中央値）
    let sim = 0;
    for (let i = 1; i <= 12; i++) {
      sim += 100 - Math.abs((s1['P'+i]||50) - (s2['P'+i]||50));
    }
    sim /= 12;
    const p13c = 100 - Math.abs((s1.P13||50) - (s2.P13||50));
    const friendRaw = 0.55 * sim + 0.20 * p13c + 0.25 * 80;
    const friendScore = Math.min(99, Math.max(30, Math.round(friendRaw)));

    // --- 恋愛相性（calcLoveScore 準拠）---
    // 0.30×P1-P12類似 + 0.15×P4補完 + 0.20×P14一致 + 0.15×P15一致 + 0.20×77（ランダム中央値）
    let sim2 = 0;
    for (let i = 1; i <= 12; i++) {
      sim2 += 100 - Math.abs((s1['P'+i]||50) - (s2['P'+i]||50));
    }
    sim2 /= 12;
    const p4sum   = (s1.P4||50) + (s2.P4||50);
    const p4c     = 100 - Math.abs(p4sum - 100);
    const p14c    = 100 - Math.abs((s1.P14||50) - (s2.P14||50));
    const p15c    = 100 - Math.abs((s1.P15||50) - (s2.P15||50)) * 0.8;
    const loveRaw = 0.30 * sim2 + 0.15 * p4c + 0.20 * p14c + 0.15 * p15c + 0.20 * 77;
    const loveScore = Math.min(99, Math.max(25, Math.round(loveRaw)));

    return { friendScore, loveScore };
  }

  // ============================================================
  // スコアからティアを返す（matching.js の getScoreLabel と整合）
  // ============================================================
  function getTier(score) {
    if (score >= 88) return { label:'運命的な相性', short:'運命', emoji:'💎', color:'#ffeaa7' };
    if (score >= 78) return { label:'最高の相棒',   short:'最高', emoji:'✨', color:'#a29bfe' };
    if (score >= 68) return { label:'良い相性',     short:'良い', emoji:'💙', color:'#55efc4' };
    if (score >= 55) return { label:'刺激ある関係', short:'刺激', emoji:'⚡', color:'#fdcb6e' };
    if (score >= 42) return { label:'成長できる関係',short:'成長', emoji:'🌱', color:'#81ecec' };
    return              { label:'正反対の引力',     short:'引力', emoji:'🌀', color:'#fd79a8' };
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
    while (ctx.measureText(d1.nm).width > 430 && sz1 > 40) {
      sz1 -= 3;
      ctx.font = `700 ${sz1}px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    }
    ctx.fillText(d1.nm, LX, 290);

    ctx.fillStyle = f1.accent;
    ctx.font = `300 italic 24px 'Georgia',serif`;
    ctx.fillText(d1.en, LX, 333);

    ctx.fillStyle = f1.accent + '88';
    ctx.font = `400 18px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(FIGURE_NAMES[d1.n] || '', LX, 372);

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
    while (ctx.measureText(d2.nm).width > 430 && sz2 > 40) {
      sz2 -= 3;
      ctx.font = `700 ${sz2}px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    }
    ctx.fillText(d2.nm, RX, 290);

    ctx.fillStyle = f2.accent;
    ctx.font = `300 italic 24px 'Georgia',serif`;
    ctx.fillText(d2.en, RX, 333);

    ctx.fillStyle = f2.accent + '88';
    ctx.font = `400 18px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText(FIGURE_NAMES[d2.n] || '', RX, 372);

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
    const reasons = buildCompatReasons(s1, s2);
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
    ctx.fillText('by StratAI', W / 2, 818);

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
  // 相性の理由テキスト（matching.js getCompatReason と同一軸）
  // ============================================================
  function buildCompatReasons(s1, s2) {
    const reasons = [];
    const p3d  = Math.abs((s1.P3||50)  - (s2.P3||50));
    const p7d  = Math.abs((s1.P7||50)  - (s2.P7||50));
    const p13d = Math.abs((s1.P13||50) - (s2.P13||50));
    const p14d = Math.abs((s1.P14||50) - (s2.P14||50));
    const p4s  = (s1.P4||50) + (s2.P4||50);

    if (p3d  < 18) reasons.push('距離感が近く、自然体でいられる');
    if (p7d  < 22) reasons.push('熱量が似ていてテンポが合う');
    if (p13d < 22) reasons.push('会話スタイルが合って話しやすい');
    if (p14d < 22) reasons.push('愛情表現の形が似ていてすれ違いが少ない');
    if (Math.abs(p4s - 100) < 24) reasons.push('リーダーとサポーターのバランスが良い');
    if (reasons.length === 0) reasons.push('異なる視点が互いを豊かにする');
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
    },
  };

  window.Compat = Compat;
})();
