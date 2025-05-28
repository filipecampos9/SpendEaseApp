import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCxjCSJmkixzBciewz0PeKFaJ--5LxNC2M",
  authDomain: "expensesapp-c1f41.firebaseapp.com",
  projectId: "expensesapp-c1f41",
  storageBucket: "expensesapp-c1f41.appspot.com",
  messagingSenderId: "890619726041",
  appId: "1:890619726041:web:9917627d789b2a84d956c8"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };
