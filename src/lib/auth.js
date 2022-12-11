import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

// firebase のシークレットな情報は、envファイルを介して読み込む
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// firebase のアプリケーションを初期化
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// サインアップ処理
export async function signup(email, password) {
  try {
    // サインアップに成功するとユーザーの認証情報が返される
    const user = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    console.error(e);
  }
}

// ログイン処理
export async function login(email, password) {
  try {
    // ログインに成功するとユーザー認証情報が返される
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    console.error(e);
  }
}

// クライアントのログイン状態を取得
export async function currentUser() {
  try {
    // クライアントが保持しているログイン状態が有効であれば、ユーザーの認証情報が返される
    const user = await new Promise((res, rej) => {
      onAuthStateChanged(auth, user => {
        if (user) {
          res(user);
        } else {
          rej(user);
        }
      })
    });
    return user;
  } catch {
    return undefined;
  }
}

// ログアウト処理
export async function logout() {
  return await auth.signOut();
}