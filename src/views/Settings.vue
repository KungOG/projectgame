<template>
  <div>
    <div id ="content">
      <h3>Pick a category {{theQuestion}}</h3>
      <div>
      <button class="categorybutton" @click="afunction('trams'), categoryButton = 1, checkSelect()" v-bind:style="{'border':buttonSelector[1].categorySelected}"><img src="../assets/Trams.jpg"></button>
      <button class="categorybutton" @click="afunction('history'), categoryButton = 2, checkSelect()" v-bind:style="{'border':buttonSelector[2].categorySelected}"><img src="../assets/History.jpg"></button>
      <button class="categorybutton" @click="afunction('food'), categoryButton = 3, checkSelect()" v-bind:style="{'border':buttonSelector[3].categorySelected}"><img src="../assets/Food.jpg"></button>
      <br><br>
      <h3> Choose your opponent </h3>
      </div>
      <br>
      <button class="categorybutton" @click="activeButton = 4, selectedBot('easy'), checkSelect()" v-bind:style="{'border':buttonSelector[4].opponentSelected}"><img src="../assets/Glenn.jpg"></button>
      <button class="categorybutton" @click="activeButton = 5,  selectedBot('medium'), checkSelect()" v-bind:style="{'border':buttonSelector[5].opponentSelected}"><img src="../assets/Hakan.jpg"></button>
      <button class="categorybutton" @click="activeButton = 6,  selectedBot('hard'), checkSelect()" v-bind:style="{'border':buttonSelector[6].opponentSelected}"><img src="../assets/Miriam.jpg"></button>
      <br>
      <br>
      <router-link to="/playgame"><button v-show="optionsSelected" class="gamebutton">Start Game</button></router-link>
    </div>
  </div>
</template>

<script>
import {db} from '../firebase-config'
import { functions } from 'firebase';

export default {
  name: "Settings",
  data() {
      return {
        choosenBot: 0,
        theQuestion: '',
        theAnswer: '',
        activeButton: 0,
        categoryButton: 0,
        choosenBot: 0,
        optionsSelected: false

      }
  },
  computed: {
    /* Checks what you have picked and makes a green dotted around the option */
      buttonSelector: function() {
      let result = [];
      for (var i = 0; i< 7; i++){
        if (this.activeButton == i){
          result.push({
            opponentSelected: '5px seagreen dotted'
            
            });
        } else if ( this.categoryButton == i){
          result.push({
            categorySelected: '5px seagreen dotted'
            });
        } else {
          result.push({
            opponentSelected: 'none',
            categorySelected: 'none'
          });
        }
      }
      return result;
    }
  },
  /* Gets the question from firebase */
  firebase: {
    questions: db.ref('questions')
  },
  methods: {
    /* No fucking clue, only that you set everything to 0 */ 
    afunction: function(cat) {
      var arr = [];
      for(var i = 0; i < this.questions.length; i++){
        if (this.questions[i].category === cat) {
          arr.push(this.questions[i]);
        }
      }
      var num = Math.floor(Math.random() * arr.length);
      this.$store.state.theQuestion = arr[num].question;
      this.$store.state.theAnswer = arr[num].answer;
      this.$store.state.numOfGuesses = 0;
      this.$store.state.value = 0;
      this.$store.state.bot = 0;
    },
    /* Chooses the right bot from which you picked */
    selectedBot: function(oppo) {

      if (oppo === 'easy') {
        this.$store.state.choosenBot = "Glenn's";
      } else if (oppo === 'medium') {
        this.$store.state.choosenBot = "Håkan's";
      }else {
        this.$store.state.choosenBot = "Miriam's";
    }
    console.log(this.$store.state.choosenBot);

    },
    /* Checks which category and what bot you picked */
    checkSelect() {
      if (this.categoryButton && this.activeButton > 0) {
      this.optionsSelected = true;
    }
    }
  },

};
</script>
