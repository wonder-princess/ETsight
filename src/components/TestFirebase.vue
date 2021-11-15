<template>
  <div>
    <h1>Firebase Test</h1>
    <div v-show="currentUID === null">
      MAIL：<input type="email" v-model="mail"><br>
      PASS：<input type="password" v-model="pass"><br>
      <button v-on:click="logIn">ログイン</button>
    </div>
    <div v-show="currentUID !== null">
      <button v-on:click="logOut">ログアウト</button><br>
      <button v-on:click="setValue">setNewValue</button>
      <input type="file"
        accept=".jpg,.jpeg,.png,.gif, image/jpeg,image/png,image/gif"
        v-on:change="uploadImage"
      >
    <img v-bind:src="imgsrc" v-show="imgsrc !== null" style="width: 64px; height: 64px;"/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  data() {
    return {
      num: 0,
      mail: '',
      pass: '',
      currentUID: null,
      imgsrc: null,
    };
  },
  methods: {
    setValue() {
      this.num += 1;
      console.log(`set: ${this.num}`);

      // Firebase上のmykeyの値を更新
      firebase
        .firestore()
        .collection('keys')
        .doc('mykey')
        .set({
          value: this.num,
        });
    },
    getValue() {
      firebase
        .firestore()
        .collection('keys')
        .doc('mykey')
        .get()
        .then((key) => {
          // 値が存在するか、さらに値が数値かを判定
          if (key.exists && Number.isFinite(key.data().value)) {
            this.num = key.data().value;
            console.log('Got value: ', this.num);
          }
        });
    },
    logIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.mail, this.pass)
        .then((user) => {
          console.log('ログインしました', user);
        })
        .catch((error) => {
          console.error('ログインエラー', error);
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('ログアウトしました');
        })
        .catch((error) => {
          console.error('ログアウトエラー', error);
        });
    },
    downloadImage(fileName) {
      firebase
        .storage()
        .ref(fileName)
        .getDownloadURL()
        .then((url) => {
          this.imgsrc = url;
        })
        .catch((error) => {
          console.error('URL取得エラー', error);
        });
    },
    uploadImage(e) {
      const { files } = e.target;

      if (files.length === 0) {
        return;
      }

      const file = files[0];

      const fileName = 'sample/test';
      firebase
        .storage()
        .ref(fileName)
        .put(file)
        .then(() => {
          this.downloadImage(fileName);
        })
        .catch((error) => {
          console.error('ファイルアップロードエラー', error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('状態：ログイン中', user);
        this.currentUID = user.uid;
        this.getValue();
      } else {
        console.log('状態：ログアウト', user);
        this.currentUID = null;
      }
    });

  /*
    // 匿名ログイン
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('ログインしました');
        firebase
          .firestore()
          .collection('keys')
          .doc('mykey')
          .set({
            value: 'myvalue',
          });
      } else {
        console.log('ログインしていません');

        firebase
          .auth()
          .signInAnonymously() // 匿名ログインの実行
          .catch((error) => {
            // ログインに失敗したときの処理
            console.error('ログインエラー', error);
          });
      }
    });
  */
  },
};
</script>
