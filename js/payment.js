/**
 * payment.js
 * プラットフォーム別課金ユーティリティ
 *
 * Web     → Stripe Checkout (Supabase Edge Function 経由)
 * iOS     → Apple In-App Purchase (cordova-plugin-purchase v13)
 * Android → Google Play Billing  (cordova-plugin-purchase v13)
 *
 * 使い方:
 *   await Payment.purchase('matching_unlock')   // 機能解放 ¥990
 *   await Payment.purchase('matching_proposal') // 打診 ¥990
 */
(function() {
'use strict';

// ============================================================
// 商品定義
// type: 'non_consumable' = 一度購入で永続（機能解放）
//       'consumable'     = 都度購入（打診など）
// ============================================================
const PRODUCTS = {
  matching_unlock: {
    id:            'matching_unlock',
    iosId:         'net.strataix.sinc.matching_unlock',
    androidId:     'net.strataix.sinc.matching_unlock',
    type:          'non_consumable',
    stripePriceId: 'price_XXXXXXXXXXXXXXXX', // 本番では Stripe Dashboard で発行した Price ID に差し替え
    label:         'マッチング機能解放パス',
    amount:        990,
  },
  matching_proposal: {
    id:            'matching_proposal',
    iosId:         'net.strataix.sinc.matching_proposal',
    androidId:     'net.strataix.sinc.matching_proposal',
    type:          'consumable', // 打診は都度課金（消耗品）
    stripePriceId: 'price_YYYYYYYYYYYYYYYY', // 本番では Stripe Dashboard で発行した Price ID に差し替え
    label:         'マッチング打診',
    amount:        990,
  },
};

// ============================================================
// Web: Stripe Checkout
// ============================================================
async function purchaseStripe(product, metadata) {
  if (!window.supabase) throw new Error('Supabase not initialized');

  const { data, error } = await supabase.functions.invoke('create-checkout-session', {
    body: {
      price_id:   product.stripePriceId,
      product_id: product.id,
      metadata:   metadata || {},
      success_url: location.origin + location.pathname + '?payment=success&product=' + product.id,
      cancel_url:  location.origin + location.pathname + '?payment=cancel',
    }
  });

  if (error) throw new Error('Stripe セッション作成エラー: ' + (error.message || error));
  if (!data || !data.url) throw new Error('Stripe URL が取得できませんでした');

  // Stripe Checkout へリダイレクト
  location.href = data.url;
  // リダイレクト後に戻るため、ここで処理は終わり
  return { status: 'redirecting' };
}

// ============================================================
// Native: cordova-plugin-purchase (CdvPurchase)
// ============================================================
let _storeInitialized = false;

async function initStore(productIds) {
  return new Promise((resolve, reject) => {
    if (_storeInitialized) { resolve(); return; }
    if (!window.CdvPurchase || !window.CdvPurchase.store) {
      reject(new Error('CdvPurchase が見つかりません。プラグインが組み込まれていますか？'));
      return;
    }

    const { store, ProductType, Platform: P } = window.CdvPurchase;
    const platform = window.Platform.isIOS() ? P.APPLE_APPSTORE : P.GOOGLE_PLAY;

    // 商品IDから定義を逆引きして正しいタイプを設定
    // matching_unlock = NON_CONSUMABLE（一度購入で永続）
    // matching_proposal = CONSUMABLE（都度購入）
    const registrations = productIds.map(pid => {
      const product = Object.values(PRODUCTS).find(p =>
        p.iosId === pid || p.androidId === pid
      );
      const type = (product && product.type === 'non_consumable')
        ? ProductType.NON_CONSUMABLE
        : ProductType.CONSUMABLE;
      return { id: pid, type, platform };
    });

    store.register(registrations);

    store.initialize([platform]).then(() => {
      _storeInitialized = true;
      resolve();
    }).catch(reject);
  });
}

async function purchaseNative(product) {
  const { store, Platform: P } = window.CdvPurchase;
  const platform = window.Platform.isIOS() ? P.APPLE_APPSTORE : P.GOOGLE_PLAY;
  const productId = window.Platform.isIOS() ? product.iosId : product.androidId;

  // ストア初期化
  await initStore([productId]);

  return new Promise((resolve, reject) => {
    const offer = store.get(productId, platform)?.offers?.[0];
    if (!offer) {
      reject(new Error('商品が見つかりません: ' + productId));
      return;
    }

    store.order(offer)
      .then(result => {
        if (result && result.isError) {
          reject(new Error(result.message || '購入エラー'));
        } else {
          resolve({ status: 'purchased' });
        }
      })
      .catch(reject);

    // 購入完了ハンドラ
    store.when()
      .approved(transaction => {
        transaction.verify();
      })
      .verified(receipt => {
        receipt.finish();
        resolve({ status: 'purchased', receipt });
      })
      .unverified(receipt => {
        reject(new Error('レシート検証失敗'));
      });
  });
}

// ============================================================
// 公開 API
// ============================================================
const Payment = {
  /**
   * 商品を購入する
   * @param {string} productKey - 'matching_unlock' | 'matching_proposal'
   * @param {object} [metadata] - Stripe メタデータ (Web のみ)
   * @returns {Promise<{status: string}>}
   */
  async purchase(productKey, metadata) {
    const product = PRODUCTS[productKey];
    if (!product) throw new Error('不明な商品: ' + productKey);

    if (window.Platform.isWeb()) {
      return purchaseStripe(product, metadata);
    } else {
      return purchaseNative(product);
    }
  },

  /**
   * Stripe の支払い完了リダイレクト後の処理
   * ページ読み込み時に呼び出すこと
   * @returns {'success' | 'cancel' | null}
   */
  checkStripeReturn() {
    const params = new URLSearchParams(location.search);
    const status = params.get('payment');
    if (!status) return null;
    // URL パラメータをクリア
    const clean = location.pathname;
    history.replaceState({}, '', clean);
    return status; // 'success' or 'cancel'
  },

  PRODUCTS,
};

window.Payment = Payment;
})();
