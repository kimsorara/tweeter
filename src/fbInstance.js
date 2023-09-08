import {initializeApp} from "firebase/app";
import {getAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY, //Firebase 프로젝트를 식별하기 위한 API 키 이 키를 사용하여 Firebase 서비스에 접근하고 인증
  authDomain: process.env.REACT_APP_AUTH_DOMAIN, // Firebase 인증 시스템의 도메인,사용자 인증과 관련된 작업에 사용
  projectId: process.env.REACT_APP_PROJECT_ID, // Firebase 프로젝트의 고유 식별자인 프로젝트 ID
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET, //: Firebase Storage 서비스에서 파일을 저장하는 데 사용되는 스토리지 버킷의 이름
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID, //Firebase Cloud Messaging (FCM)을 통해 푸시 알림을 보낼 때 사용되는 메시지 발신자 ID
  appId: process.env.REACT_APP_APP_ID, // Firebase 프로젝트와 연결된 앱의 고유한 식별자인 앱 ID, ID를 사용하여 앱이 Firebase 프로젝트와 연동되었음을 나타낸다
  measurementId: process.env.REACT_APP_MEASUREMENT_ID, //Firebase Analytics와 관련된 이벤트 추적을 위한 측정 ID. 앱의 사용자 동작 및 행동을 분석하는 데 사용
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
export const dbService = getFirestore(firebaseApp);
export const storageSevice = getStorage(firebaseApp);
export {firebaseAuth, sendEmailVerification, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged};
