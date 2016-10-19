// Cordova peerDependencies

// - cordova.js core
// - Appodeal cordova plugin
// - startapp

export function isCordova() {
    return (window.cordova || window.PhoneGap || window.phonegap)
    && /^file:\/{3}[^\/]/i.test(window.location.href)
    && /ios|iphone|ipod|ipad|android/i.test(window.navigator.userAgent);
}

export function device_language() {
    var lang = window.navigator.language;
      //lang = "pt";
    if(new RegExp("en", "g").test(lang)) return "en";
    else if (new RegExp("es", "g").test(lang)) return "es";
    else if(new RegExp("pt", "g").test(lang)) return "pt";
    else return "en";
}

export function appOdeal(Appodeal) {
    if(isCordova()) {
        return {
            set_banner: function() {
                Appodeal.show(Appodeal.BANNER_BOTTOM);
            },
            show_interstitial: function() {
                Appodeal.show(Appodeal.INTERSTITIAL);
            }
        };
    } else {
        var ob = {};
        ob.set_banner = ob.show_interstitial = () => console.log("Not ad not cordova");
        return ob;
    }
}

export function start_appOdeal(Appodeal, _appKey, callback) {
    var appKey = _appKey;
    Appodeal.disableLocationPermissionCheck();
    Appodeal.initialize(appKey, Appodeal.INTERSTITIAL | Appodeal.BANNER);
    callback();
}

export function spaceFor_AppOdeal_Banners() {
    const HEADER = document.querySelector("head"),
          WRAPPER = document.createElement("style"),
          TEMPLATE = `
              @media screen and (max-height: 400px) {
               .content {
                 height: calc(100vh - 44px - 32px);
               }
               footer {
                 margin-bottom: 32px;
               }
             }
             @media screen and (min-height: 400px)  {
               .content {
                 height: calc(100vh - 44px - 50px);
               }
               footer {
                 margin-bottom: 50px;
               }
             }
             @media screen and (min-height: 720px)  {
               .content {
                 height: calc(100vh - 44px - 90px);
               }
               footer {
                 margin-bottom: 90px;
               }
             }
          `;
    WRAPPER.innerHTML = TEMPLATE;
    HEADER.appendChild(WRAPPER);
}

export const isMobile = {
    Windows: function() {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Android: function() {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function() {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function() {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    ChromeApp: function() {
        return window.chrome && window.chrome.runtime && window.chrome.runtime.id;
    },
};

export function openBrowserOrApp(startapp, browserUri, appUri) {
    if(isCordova()) {
        startapp.set({ /* params */
            "action": "ACTION_VIEW",
            "uri": appUri
        }).start();
    } else {
        return window.open(browserUri);
    }
}

export function openStore_according_toOs(links) {
    // Links must be { Playstore: "...", AppStore: "...", ChromeWebStore: "..." }
    if(isMobile.Android()) window.open(links.Playstore, "_system");
    else if(isMobile.iOS()) window.open(links.AppStore, "_system");
    else if(isMobile.ChromeApp()) window.open(links.ChromeWebStore, "_system");
    else window.open(links.Playstore, "_system"); // para testes no browser desktop
}
