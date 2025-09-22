
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-496219922-fef08",
  "appId": "1:734042148935:web:afcfc54139ecef71342162",
  "apiKey": "AIzaSyBlcQt4OdtULc56OVZudSlQeVf95Tno0oY",
  "authDomain": "studio-496219922-fef08.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "734042148935"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
}

const auth = getAuth(app);

export { app, auth };
