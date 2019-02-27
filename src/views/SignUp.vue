<template>
  <div>
    <div id ="content">
      <div class="sign-up">
        <p>Let's create you a new account!</p>
        <input type="text" v-model="username" placeholder="Username">
        <br>
        <input type="email" v-model="email" placeholder="Email">
        <br>
        <input type="password" v-model="password" placeholder="Password">
        <br>
        <button class="buttonsubmit" @click="signUp">Sign Up</button>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import {db, fb} from "../firebase-config";

export default {
  name: "signUp",
  data() {
    return {
      email: "",
      password: "",
      username: ""
    };
  },
  created () {
    this.$bindAsObject('allUsers', db.ref('allUsers/'))
  },
  firebase: {
    allUsers: db.ref('allUsers')
  },
  computed: {
    uid() {
      return fb.auth().currentUser.uid;
    }
  },
  methods: {
    /* Create you a new account */
    signUp: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(this.username)

            this.$router.replace("/");
            this.$firebaseRefs.allUsers.child(this.uid).set({
              name: this.username,
              newPoint: 0,
              user: this.email
            })
        },
      )
    }
  }
};
</script>
