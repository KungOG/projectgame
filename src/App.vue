<template>
  <div id="app">
    <div id ="nav2">
      <router-link to="/"><button class="navbutton" type="button">Home</button></router-link>
      <router-link to="/login"><button class="navbutton" v-if="!user" type="button">Login</button></router-link>
      <button class="navbutton" v-if="user" @click="logout" type="button">Logout</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: "app",
    data () {
    return {
      user: null
    }
  },
  /* Logout function */
  methods: {
        logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({path: '/'});
        });
    }
  },  
  /* Checks if the user is logged in or not */
  created: function () {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.user = user;
        } else {
          this.user = null;
        }
      });
    }
};
</script>

<style>
 @import url('https://fonts.googleapis.com/css?family=Pattaya');

body {
  background: lightblue url("gbg.gif");
}

button:focus {
outline:0 !important;
}

#content {
  font-family: Century Gothic, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
  border-radius: 20px;
  padding: 50px;
  width: 60%;
  margin: auto;
  margin-top: 10px;
  font-size: 18px;
  opacity: 0.95;
}

@media only screen and (max-width: 600px) {
  #content {
width: 95%;
  }
}


#nav2 {
  font-family: Century Gothic, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: aliceblue;
  border-radius: 20px;
  padding: 10px 50px 0px 50px;
  width: 60%;
  margin: auto;
  margin-bottom:40px;
  margin-top: 40px;
  opacity: 0.95;
  outline: none;

}
#nav2 a {
  font-weight: bold;
  color: #2484e4;
  text-transform: uppercase;
  text-decoration: none;
}
#nav2 a.router-link-exact-active {
  color: #70d3f3;
  text-decoration: underline;
}
#nav2 a:hover {
  color: #70d3f3;
  transition: 0.4s;
}
#highscore  {
  background-color: #fec84e;
  background-image: linear-gradient(315deg, #fec84e 0%, #ffdea8 74%);
  border: 2px solid gold;
  display: block;
  width: 90%;
  padding: 50px;
  margin: auto;
  text-align: center;
  border-radius: 30px;
}

@media only screen and (max-width: 600px) {

#nav2 {
  width: 90%;
}

  #highscore {
width: 100%;
padding: 10px;
font-size: 15px;
}
}

@media only screen and (max-width: 600px) {
  #nav2 {
width: 95%;
margin-top: 5px;
margin-bottom: 0px;
}
}

h1 {
  color:cornflowerblue;
  font-size:2.3em;
  font-family: 'Avenir', sans-serif;
  margin: 1px 1px 1px 1px;
}
h2 {
  color:cornflowerblue;
  font-size: 5rem;
  font-family: 'Pattaya', sans-serif;
  margin: 1px 1px 1px 1px;
}
h3{
  color:cornflowerblue;
  font-size: 25px;
  font-family: 'Pattaya', sans-serif;
  margin: 1px 1px 1px 1px;
  margin-bottom: 1rem;
}

p {
  font-family: 'Poppins', sans-serif;
  color: midnightblue;
  font-size: 1.6rem;
  margin-top: 1rem;
  margin-bottom: 0rem;
}

#musicText {
  font-size: 0.9rem;
}

@media only screen and (max-width: 600px) {
  h2 {
font-size: 3rem;
}
}



h3 {
  color:cornflowerblue;
  font-size: 2rem;
  font-family: 'Pattaya', sans-serif;
  margin: 1px 1px 5px 1px;
}

h4 {
  color:cornflowerblue;
  font-size: 2rem;
  font-family: 'Pattaya', sans-serif;
  margin: 1px 1px 5px 1px;
}

@media only screen and (max-width: 600px) {
  p, h3 {
font-size: 1.5rem;
}
}
.startgamebutton {
  background-color: deepskyblue;
  font-size: 30px;
  color: white;
  padding: 10px 40px 10px 40px;
  font-family: 'Pattaya', sans-serif;
  border: 1px solid deepskyblue;
  cursor: pointer;
  border-radius: 20px;
  outline: 0;
}
.startgamebutton span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}
.startgamebutton span:after {
  content: '\00bb';
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}
.startgamebutton:hover span {
  padding-right: 25px;
}
.startgamebutton:hover span:after {
  opacity: 1;
  right: 0;
}
.guessbutton {
  background-color: deepskyblue;
  font-size: 15px;
  margin: 5px;
  color: white;
  padding: 10px;
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  border-radius: 20px;
  border: 1px solid deepskyblue;
  cursor: pointer;
  outline: 0;
}
.guessbutton:hover {
  background-color: skyblue;
  color: white;
  transition: 0.4s;
}
.buttonsubmit {
  background-color: deepskyblue;
  font-size: 20px;
  color: white;
  padding: 8px;
  margin: 10px;
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  border: 1px solid deepskyblue;
  cursor: pointer;
  border-radius: 20px;
  outline: 0;
}
.buttonsubmit:hover {
  background-color: skyblue;
  color: white;
  transition: 0.4s;
}
.gamebutton {
  background-color: deepskyblue;
  font-size: 25px;
  border-radius: 20px;
  border: 1px solid deepskyblue;
  margin-left: 10px;
  color: white;
  padding: 5px 17px 5px 17px;
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 10px 10px 0px;
  outline: 0;
}
.gamebutton:hover {
  background-color: skyblue;
  color: white;
  transition: 0.4s;
}
.startgamebuttonsmall {
  background-color: #02b771;
  font-size: 25px;
  border-radius: 20px;
  border: 1px solid #02b771;
  margin-left: 10px;
  color: white;
  padding: 15px 17px 15px 17px;
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 10px 10px 0px;
  outline: 0;
}
.startgamebuttonsmall:hover {
  background-color: mediumspringgreen;
  color: white;
  transition: 0.4s;
  border: 1px solid mediumspringgreen;
}
.navbutton {
  background-color: #02b771;
  font-size:1.2em;
  border-radius: 20px;
  border: 1px solid #02b771;
  margin-left: 10px;
  color: white;
  padding: 5px 17px 5px 17px;
  font-family: 'Avenir', sans-serif;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 10px 10px 0px;
  outline: 0;
  width: 100px;
}
.navbutton:hover {
  background-color: mediumspringgreen;
  border: 1px solid mediumspringgreen;
  color: white;
  transition: 0.4s;
}
.musicbutton {
  border: 0px;
  background: none;
  outline: 0;
  cursor: pointer;
}

.categorybutton {
  border: 0px;
  background: none;
  outline: 0;
  margin: 10px;
  padding: 0px;
  outline: 0;


}

.categorybutton:hover {
        filter: alpha(opacity=50);
        opacity: 0.5;
        -webkit-transition: opacity .15s ease-in-out;
        -moz-transition: opacity .15s ease-in-out;
        transition: opacity .15s ease-in-out;

}

.myCustomClass {
  width: 9rem;
  margin-left: auto;
  margin-right: auto;
  font-size: 2.5rem;
}

img.gamemenu {
margin: 7px;
outline: 0;


}

img.gamemenu:hover {
        filter: alpha(opacity=50);
        opacity: 0.5;
        -webkit-transition: opacity .15s ease-in-out;
        -moz-transition: opacity .15s ease-in-out;
        transition: opacity .15s ease-in-out;

}


input[type=email], input[type=password], input[type=text] {
  padding: 10px;
  margin: 8px;
  font-size: 15px;
  display: inline-block;
  border: 1px solid #70d3f3;
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Avenir', sans-serif;
  font-weight: 500;
  -webkit-appearance: none;
  margin: 0;
}


.field {
  font-size: 15px;
  padding: 8px;
  color: dodgerblue;
  font-weight: 600;
  width: 100px;
  border: 1px solid cornflowerblue;
  -moz-appearance:textfield;
  -webkit-appearance:textfield;

  }

input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  -moz-appearance:none;

}

</style>
