<template>
    <div>
        <li v-for="point in allUsers.slice().reverse()" :key="point.id">
        <b>{{point.name}}</b> {{point.newPoint}}
        </li>
    </div>
</template>

<script>
import {db} from '../firebase-config'

export default {
    name: 'HighscoreList',
    data () {
        return {
            newPoint: ''
        }
    },
    firebase: {
        /* Checks if you are logged in and if so your points */
        allUsers: db.ref('allUsers').orderByChild("newPoint")
    },
}
</script>

<style scoped>
li {
    display: flex;
    justify-content: space-between;
}
</style>






