/**
 * platform.js
 * プラットフォーム判定ユーティリティ
 * Capacitor(iOS/Android) or Web を判定して返す
 */
(function() {
'use strict';

const Platform = {
  /** 現在のプラットフォームを返す: 'ios' | 'android' | 'web' */
  get() {
    try {
      if (window.Capacitor && typeof window.Capacitor.getPlatform === 'function') {
        return window.Capacitor.getPlatform(); // 'ios' | 'android' | 'web'
      }
    } catch(e) {}
    // UA フォールバック（開発時）
    const ua = navigator.userAgent || '';
    if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
    if (/Android/.test(ua)) return 'android';
    return 'web';
  },

  isIOS()     { return this.get() === 'ios'; },
  isAndroid() { return this.get() === 'android'; },
  isWeb()     { return this.get() === 'web'; },
  isNative()  { return this.get() !== 'web'; },
};

window.Platform = Platform;
})();
