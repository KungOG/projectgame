
<template>
  <div>
    <div class="timeBar" style="position: relative; margin-top: 20px;">
      <p>{{ time }}</p>
      <div class="timeBar"
        :style = "{width: barTime + '%'}"
        style="background-color: rgb(83, 179, 238); position: absolute;">
      </div>
    </div>
 </div>
</template>

<script>
export default {
  name: 'Timer',
  data() {
    return {
      isRunning: false,
      barTimer: 10,
      barTime: 100,
      time:10,
      timer:null,
      sound:new Audio("http://s1download-universal-soundbank.com/wav/nudge.wav")
    }
  },
  mounted(){
    this.start()
  },
  methods: {
    /* Timer */
    start() {
      this.isRunning = true
      if (!this.timer) {
          this.timer = setInterval( () => {
            if (this.time > 0) {
              this.time--
              this.barTime = this.barTime - (100/this.barTimer)
            } else {
              this.sound.play()
              clearInterval(this.timer)
              this.reset()
              this.$store.state.winner = false
              this.$router.push({ path: 'winner' });
            }
        }, 1000 )
      }
   },
    stop() {
      this.isRunning = false
      clearInterval(this.timer)
      this.timer = null
    },
    reset() {
      this.stop()
      this.time = 10
      this.barTime = 100
    }
  }
}
</script>
<style scoped>
  html {
    box-sizing:border-box;
  }
  p {
    z-index: 3;
    font-size: 2em;
    left: 0;
    right: 0;
    margin: auto;
    position: absolute;
    margin-top: -9px;
  }
  .timeBar {
    width: 200px;
    height: 40px;
    background-color: #eee;
    margin: auto;
    transition: width 1000ms;
    border-radius: 5px;
    text-align: center;
    margin-top: 0px;
    margin-bottom: 10px;
  }
  </style>
