<template>  
  <div id ="content">  
    <h1>{{theQuestion}}</h1>
    <input id="guess" class="field" @input="newValue" type="number" ref ="focused" autofocus="this.value=''" v-on:keypress.enter = "makeGuess"  v-on:keypress = "OnlyNumbers"/>
    <button class="guessbutton" @click="makeGuess">Make a guess</button>
    <p id="errormess" style="color: orangered; display: none">Only numbers! </p>
    <p id="playerTurn" v-show="playersTurn">Your turn! </p>
    <p id="botTurn" v-show="!playersTurn">Bot turn! </p>
    <Timer v-show="show" ref="form"/>
    <div class="botText">
      <p class="specifikBot">My guess: {{value}}</p>
      <p class="specifikBot" id="bot"> Bot guess: {{bot}} </p>
    </div>
    <flash-message class="myCustomClass"></flash-message>
    <br>
  </div>
</template>


<script>
import Timer from '@/components/Timer.vue'
import {db, fb} from '../firebase-config'
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import { timeout } from 'q';
import { functions } from 'firebase';
Vue.use(VueFlashMessage);
require('vue-flash-message/dist/vue-flash-message.min.css');


export default {
  name: "PlayGame",
  data: function() {
    return {
      numberKeys: [],
      show: true,
      botGuesses: [],
      highLow: '',
      userGuess: 0,
      maxGuess: 0,
      minGuess: 0,
      show: true,
      playersTurn: true,
    }
  },
  firebase: {
    /* Gets the questions and also sets your new point over your old ones */
  questions: db.ref('questions'),
  allUsers: db.ref('allUsers').orderByChild("newPoint")
  },
  components: {
    Timer,
  },
  computed: {
    value() {
      return this.$store.getters.value;
    },
    number() {
      return this.$store.state.number;
    },
    bot() {
      return this.$store.state.bot;
    },
    uid() {
    return fb.auth().currentUser.uid;
    },
    user() {
      return fb.auth().currentUser;
    },
    oldScore() {
    return this.allUsers[this.uid].newPoint;
    },
    theQuestion () {
      return this.$store.state.theQuestion;
    },
    theAnswer() {
      return this.$store.state.theAnswer;
    },
    num() {
      return  this.$store.state.num;
    },
    arr() {
     return this.$store.state.arr;
    },
    choosenBot() {
      return this.$store.state.choosenBot;
    }
  },
  created () {
    this.$bindAsObject('allUsers', db.ref('allUsers/'))
  },
  methods: {
    setFocus()
    {
      this.$refs.focused.focus();
    },
    /* Set your point and adds 10 */
    /* Poäng baserat på svårighetsgrad, lätt = 1, medel = 1,5 och svår = 2 */
    storeData() {
      this.$firebaseRefs.allUsers.child(this.uid).update({
      newPoint: parseInt(this.oldScore) + parseInt(10)});
    },
    stop() {
      this.$refs.form.stop()
    },
    start() {
      this.$refs.form.start()
    },
    reset() {
      this.$refs.form.reset()
    },
    newValue(event) {
      this.$store.dispatch('newValue', event.target.value)
    },
    /* Bot and more bot stuff under  */
    decideMinMax: function () {
      var Min = 0;
      if (this.$store.state.choosenBot == "Glenn's") {
        Min = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
      } else if (this.$store.state.choosenBot == "Håkan's") {
        Min = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
      } else {
      this.$store.state.theAnswer;
    }
    console.log(Min);

    },
    ranNumBot(min, max) {
        min = this.$store.state.theAnswer - Math.ceil(min);
        max = Math.floor(max) + this.$store.state.theAnswer;
       this.disableInput();
        var rng = Math.floor(Math.random() * (max - min)) + min;
        if (this.botGuesses.includes(rng) !== true) {
                this.botGuesses.push(rng);
                this.$store.state.bot = rng;
                console.log(rng + " pushed in");
            } else {
              console.log(rng + " already inside");
              console.log(this.botGuesses);
              this.ranNumBot(min, max);
            }
    },
    makeGuess(value, number, bot) {
      this.ranNumBot(this.$store.state.theAnswer,100);
      this.stopDisable();
      var input = document.getElementById("guess");
      if(this.value < this.$store.state.theAnswer){
        this.$store.state.numOfGuesses++;
        this.playersTurn = false;
        this.stop();
        this.reset();
        this.flash('Higher', 'error', {
          timeout: 2000,
          important: true
        });
        input.value = "";
      }
      else if (this.value > this.$store.state.theAnswer){
        this.$store.state.numOfGuesses++;
        this.playersTurn = false;
        this.stop();
        this.reset();
        this.start();
        this.flash('Lower', 'error', {
          timeout: 2000,
          important: true
        });
        input.value = "";
      }
      else if (this.value == this.$store.state.theAnswer && this.user){
        this.$store.state.numOfGuesses++;
        this.playersTurn = false;
        //when bot wins
        this.$store.state.winner = true;
        this.show = false;
        this.stop();
        this.storeData();
        this.$router.push({ path: 'winner' });
      }
      else {
        this.$store.state.numOfGuesses++;
        //when bot wins
        this.$store.state.winner = true;
        this.show = false;
        this.stop();
        this.$router.push({ path: 'winner' });
      }
    },
    /* Checks that user only uses numbers and not letters */
      OnlyNumbers(e) {
      var keyCode = e.which;
      var ret = ((keyCode >= 48 && keyCode <= 57) || (keyCode >= 8 && keyCode <= 13) || this.numberKeys.indexOf(keyCode) != -1);
      document.getElementById("errormess").style.display = ret ? "none" : "inline";
      return ret;
    },
    /* Set a timeout on input */
     disableInput() {
        setTimeout(() => {
        document.getElementById("guess").disabled = true;
        }, 0);
     },
     /* Stops the timer and resets it after bot has guessed */
     stopDisable() {
       setTimeout(() => {
         document.getElementById("guess").disabled = false;
          this.playersTurn = true;
          this.reset();
          this.start();
          this.setFocus();
       }, 2500);
     }
    }
  };
</script>

<style scoped>
.botText {
    display: flex;
    justify-content: space-between;
    margin: 1rem;
}
.specifikBot {
  border: 3px solid lavender;
  border-radius: 15px;
  padding: 15px;
  background: white;
  color: RoyalBlue;
}

#bot {
  color: DodgerBlue;
}
</style>
