<template>
  <div> 
    <div id ="content">
      <div id="highscorecontent">
        <div id="highscore">
        <h2>High score list</h2>
        <HighscoreList />
        </div>    
        <img width="200px" v-for="img in images" v-bind:src="img" :key="img"> 
        <br><br> <router-link to="/gamemenu"><button class="gamebutton">Back</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import HighscoreList from "@/components/HighscoreList"

export default {
  name: "Highscore",
  components: {
    HighscoreList
  },
  data() {
    return {
        images: ['http://i66.tinypic.com/fy0869.png']
    }
},
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
