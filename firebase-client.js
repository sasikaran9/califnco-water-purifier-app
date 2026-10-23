/* Optional production adapter. Load Firebase compat SDKs before this file, then set
   window.CALIFNCO_FIREBASE_CONFIG from firebase-config.js. The UI gracefully runs in
   demo mode when credentials are absent. */
(function(){
  const c=window.CALIFNCO_FIREBASE_CONFIG;
  if(!c||!c.apiKey||!window.firebase)return;
  firebase.initializeApp(c);
  window.califncoAuth=firebase.auth();
  window.califncoDb=firebase.firestore();
  window.califncoMessaging=firebase.messaging?.();
  window.califncoProduction=true;
})();
