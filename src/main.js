import Vue from 'vue';
import './plugins/bootstrap-vue';

import firebase from 'firebase/app';
import App from './App.vue';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// import { initializeApp } from "firebase/app";

Vue.config.productionTip = false;

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAPlDryV7YapSbf3ytsR8PU91YGty_4Aa4',
  authDomain: 'et-sight.firebaseapp.com',
  projectId: 'et-sight',
  storageBucket: 'et-sight.appspot.com',
  messagingSenderId: '481803530567',
  appId: '1:481803530567:web:7d34132e3217ed91369c62',
};

firebase.initializeApp(firebaseConfig);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

new Vue({
  render: (h) => h(App),
}).$mount('#app');
