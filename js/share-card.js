/**
 * share-card.js
 * 診断結果シェアカード生成（Canvas API）
 * 1080×1080px PNG を生成してダウンロード or X共有
 */
(function () {
  'use strict';

  // ============================================================
  // 32タイプ × 歴史上の人物 + 名言
  // すべて歴史上の人物（著作権フリー）
  // ============================================================
  const FIGURES = {
    1:  { name: 'アイザック・ニュートン',
          quote: '巨人の肩の上に立つからこそ、\n遠くを見渡せる。' },
    2:  { name: 'ニコラ・テスラ',
          quote: '現在は彼らのもの。\n未来は、私が真に働いた場所だ。' },
    3:  { name: 'マルクス・アウレリウス',
          quote: '最良の復讐は、\n不正を行った者に似ないことだ。' },
    4:  { name: 'アレクサンダー大王',
          quote: '本当に挑もうとする者に、\n不可能などない。' },
    5:  { name: 'チャールズ・ダーウィン',
          quote: '生き残るのは最強でも最賢でもなく、\n変化に最もよく適応した者だ。' },
    6:  { name: 'マキャヴェリ',
          quote: '才ある者の目には\n他者には見えぬ地平がある。' },
    7:  { name: 'イマヌエル・カント',
          quote: 'あなたの行動原理が\n普遍の法則となりうるかを問え。' },
    8:  { name: '孫子',
          quote: '戦わずして勝つ。\nこれが最善の策である。' },
    9:  { name: 'ウィリアム・ブレイク',
          quote: '一粒の砂に世界を見、\n一輪の花に天国を見る。' },
    10: { name: 'レオナルド・ダ・ヴィンチ',
          quote: 'シンプルさとは、\n究極の洗練である。' },
    11: { name: 'フローレンス・ナイチンゲール',
          quote: 'どんな言い訳も\n与えず、受け取らない。' },
    12: { name: 'アントニ・ガウディ',
          quote: '直線は人間のもの。\n曲線は神のもの。' },
    13: { name: 'フリードリヒ・ニーチェ',
          quote: '踊る星を生み出すには\n自分の中にカオスを持たなければならない。' },
    14: { name: 'エドガー・アラン・ポー',
          quote: '昼に夢見る者こそ、\n夜にしか見えぬ真実を知っている。' },
    15: { name: 'アルチュール・ランボー',
          quote: '「私」とは、\nもう一人の他者である。' },
    16: { name: 'ウィリアム・シェイクスピア',
          quote: '世界はすべて舞台。\n人は皆、役者に過ぎない。' },
    17: { name: 'ベンジャミン・フランクリン',
          quote: '知識への投資が\n最高の利子を生む。' },
    18: { name: 'フェルディナンド・マゼラン',
          quote: '嵐は恐ろしい。\nしかしそれが岸にとどまる理由にはならない。' },
    19: { name: 'アブラハム・リンカーン',
          quote: '6時間で木を切り倒すなら\n最初の4時間で斧を研ぐ。' },
    20: { name: 'ナポレオン・ボナパルト',
          quote: '不可能という言葉は\n愚か者の辞書にしか存在しない。' },
    21: { name: 'タレーラン',
          quote: '言葉は\n思想を隠すために与えられた。' },
    22: { name: 'ユリウス・カエサル',
          quote: '来た、見た、\n勝った。' },
    23: { name: 'オットー・フォン・ビスマルク',
          quote: '政治とは\n可能性の芸術である。' },
    24: { name: 'チンギス・ハン',
          quote: '恐れるなら、やるな。\nやるなら、恐れるな。' },
    25: { name: 'マハトマ・ガンジー',
          quote: 'あなた自身が\n世界に見たいと思う変化になれ。' },
    26: { name: 'マーティン・ルーサー・キング Jr.',
          quote: '飛べないなら走れ。\n走れないなら、這ってでも前へ進め。' },
    27: { name: 'マザー・テレサ',
          quote: '人を裁いていたら\n愛する時間がなくなってしまう。' },
    28: { name: 'ジャンヌ・ダルク',
          quote: '私は怖くない。\nこのために生まれてきたのだから。' },
    29: { name: 'ヴォルフガング・アマデウス・モーツァルト',
          quote: '笑いと涙の間には\n紙一重しかない。' },
    30: { name: 'クレオパトラ',
          quote: '私は誰かの勝利の\n飾りになるつもりはない。' },
    31: { name: 'チャーリー・チャップリン',
          quote: '笑いのない一日は\n無駄にした一日だ。' },
    32: { name: 'ルイ14世',
          quote: '朕は国家なり。' },
  };

  // ============================================================
  // ファミリー別カラー設定
  // ============================================================
  const FAM = {
    Architects: {
      color:   '#6c5ce7',
      accent:  '#a29bfe',
      dark:    '#0b091e',
      mid:     '#151030',
      label:   '設計者族',
      emoji:   '🏛',
    },
    Mystics: {
      color:   '#e84393',
      accent:  '#fd79a8',
      dark:    '#1a0714',
      mid:     '#260f1f',
      label:   '神秘者族',
      emoji:   '🌙',
    },
    Commanders: {
      color:   '#00b894',
      accent:  '#55efc4',
      dark:    '#04130f',
      mid:     '#071f18',
      label:   '指揮者族',
      emoji:   '⚔',
    },
    Catalysts: {
      color:   '#e0a800',
      accent:  '#ffeaa7',
      dark:    '#15100a',
      mid:     '#211808',
      label:   '触媒者族',
      emoji:   '🔥',
    },
  };

  // ============================================================
  // テキスト折り返し（\n 強制改行 + 自動折り返し）
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
        } else {
          line = test;
        }
      }
      if (line) { ctx.fillText(line, cx, curY); curY += lineH; }
    });
    return curY - startY;
  }

  // ============================================================
  // カード描画メイン
  // ============================================================
  function drawCard(canvas, data) {
    const { n, nm, en, fam: famKey, c } = data;
    const fig = FIGURES[n] || { name: '', quote: '' };
    const f   = FAM[famKey] || FAM.Architects;
    const W   = 1080;
    const H   = 1080;

    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, W, H);

    // ── 背景グラデーション ──────────────────────────────────
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0,   f.dark);
    bgGrad.addColorStop(0.5, f.mid);
    bgGrad.addColorStop(1,   f.dark);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // ── 背景グロー ────────────────────────────────────────────
    const glow = ctx.createRadialGradient(W / 2, H * 0.38, 0, W / 2, H * 0.38, 500);
    glow.addColorStop(0,   f.color + '2a');
    glow.addColorStop(0.6, f.color + '08');
    glow.addColorStop(1,   'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);

    // ── 装飾リング ────────────────────────────────────────────
    const ring = (cx, cy, r, alpha, lw) => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = f.color + alpha;
      ctx.lineWidth = lw;
      ctx.stroke();
    };
    ring(W / 2, H * 0.38, 380, '18', 1.5);
    ring(W / 2, H * 0.38, 310, '10', 1);
    ring(W / 2, H * 0.38, 430, '08', 0.5);

    // ── 四隅ドット ────────────────────────────────────────────
    ctx.fillStyle = f.color + '35';
    [[72,72],[W-72,72],[72,H-72],[W-72,H-72]].forEach(([dx,dy]) => {
      ctx.beginPath(); ctx.arc(dx, dy, 5, 0, Math.PI * 2); ctx.fill();
    });

    // ── 上部ボーダーライン ────────────────────────────────────
    ctx.fillStyle = f.color;
    ctx.fillRect(80, 58, W - 160, 2);

    ctx.textAlign = 'center';

    // ── ファミリーバッジ ──────────────────────────────────────
    ctx.fillStyle = f.accent + 'cc';
    ctx.font = `500 25px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    ctx.fillText(`${f.emoji}  ${famKey}  ／  ${f.label}`, W / 2, 125);

    // ── TYPE 番号 ─────────────────────────────────────────────
    ctx.fillStyle = f.color + 'aa';
    ctx.font = `300 30px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText(`Type ${String(n).padStart(2, '0')}`, W / 2, 185);

    // ── タイプ名（日本語・大） ────────────────────────────────
    let nmSize = 88;
    ctx.font = `700 ${nmSize}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    while (ctx.measureText(nm).width > 900 && nmSize > 52) {
      nmSize -= 4;
      ctx.font = `700 ${nmSize}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillText(nm, W / 2, 305);

    // ── English name ──────────────────────────────────────────
    ctx.fillStyle = f.accent;
    ctx.font = `300 italic 30px 'Georgia','Times New Roman',serif`;
    ctx.fillText(en, W / 2, 365);

    // ── キャッチコピー ────────────────────────────────────────
    if (c) {
      ctx.fillStyle = 'rgba(255,255,255,0.42)';
      ctx.font = `400 21px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
      wrapText(ctx, c.slice(0, 40), W / 2, 408, 880, 34);
    }

    // ── 区切り線（点線） ──────────────────────────────────────
    ctx.strokeStyle = f.color + '55';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 9]);
    ctx.beginPath(); ctx.moveTo(120, 476); ctx.lineTo(W - 120, 476); ctx.stroke();
    ctx.setLineDash([]);

    // ── "あなたが似ている歴史上の人物" ────────────────────────
    ctx.fillStyle = f.accent + '88';
    ctx.font = `400 19px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText('〜 あなたが似ている歴史上の人物 〜', W / 2, 520);

    // ── 人物名 ────────────────────────────────────────────────
    ctx.fillStyle = '#ffffff';
    let figSize = 50;
    ctx.font = `700 ${figSize}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    while (ctx.measureText(fig.name).width > 880 && figSize > 30) {
      figSize -= 2;
      ctx.font = `700 ${figSize}px 'Hiragino Kaku Gothic Pro','Meiryo','Yu Gothic',sans-serif`;
    }
    ctx.fillText(fig.name, W / 2, 590);

    // ── 装飾クォート（左上） ──────────────────────────────────
    ctx.fillStyle = f.color + '55';
    ctx.font = `700 90px 'Georgia',serif`;
    ctx.textAlign = 'left';
    ctx.fillText('\u201C', 108, 698);
    ctx.textAlign = 'right';
    ctx.fillText('\u201D', W - 108, 830);
    ctx.textAlign = 'center';

    // ── 名言テキスト ──────────────────────────────────────────
    ctx.fillStyle = 'rgba(255,255,255,0.82)';
    ctx.font = `400 30px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    const quoteH  = wrapText(ctx, fig.quote, W / 2, 705, 840, 52);

    // ── 下部区切り線 ──────────────────────────────────────────
    const botY = Math.max(705 + quoteH + 44, 872);
    ctx.strokeStyle = f.color + '40';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 9]);
    ctx.beginPath(); ctx.moveTo(120, botY); ctx.lineTo(W - 120, botY); ctx.stroke();
    ctx.setLineDash([]);

    // ── Sinc ブランディング ───────────────────────────────────
    const bY = botY + 55;
    ctx.fillStyle = f.accent + 'dd';
    ctx.font = `700 38px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText('Sinc', W / 2, bY);

    ctx.fillStyle = 'rgba(255,255,255,0.30)';
    ctx.font = `300 19px 'Helvetica Neue','Arial',sans-serif`;
    ctx.fillText('by StratAIX', W / 2, bY + 29);

    ctx.fillStyle = f.color + 'bb';
    ctx.font = `400 20px 'Hiragino Kaku Gothic Pro','Meiryo',sans-serif`;
    ctx.fillText('sinc.strataix.net  ／  あなたのタイプを診断しよう', W / 2, bY + 65);

    // ── 下部ボーダーライン ────────────────────────────────────
    ctx.fillStyle = f.color;
    ctx.fillRect(80, H - 60, W - 160, 2);
  }

  // ============================================================
  // 公開 API
  // ============================================================
  const ShareCard = {
    /** canvas にプレビュー描画 */
    draw(canvas, data) {
      if (!canvas || !data) return;
      drawCard(canvas, data);
    },

    /** PNG ダウンロード */
    download(data) {
      if (!data) return;
      const canvas = document.createElement('canvas');
      drawCard(canvas, data);
      const a  = document.createElement('a');
      a.href   = canvas.toDataURL('image/png');
      a.download = `sinc-type${String(data.n).padStart(2, '0')}-${data.nm}.png`;
      a.click();
    },

    /** X（旧Twitter）共有ダイアログを開く */
    shareToX(data) {
      if (!data) return;
      const text = encodeURIComponent(
        `🎭 私は「${data.nm}」タイプでした！\n` +
        `${data.en}\n\n` +
        `#Sinc診断 #${data.fam} #性格診断`
      );
      const url = encodeURIComponent('https://sinc.strataix.net/doppelganger-diagnosis.index.html');
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank', 'width=560,height=440'
      );
    },
  };

  window.ShareCard = ShareCard;
})();
