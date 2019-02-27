<template>
  <div>     
    <div id ="content">
      <router-link to="/highscore"><img  class="gamemenu" src="../assets/High_Score.jpg"></router-link>
      <router-link to="/rules"><img class="gamemenu" src="../assets/How_to_play.jpg"></router-link>
      <router-link to="/settings"><img class="gamemenu" src="../assets/Start_game.jpg"></router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "GameMenu",
  methods: {
    /* Logout function */
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>
