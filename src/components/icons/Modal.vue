<template>
    <div class="container">
        <div class="time">
           <span> {{ date }}</span>
           <div><p>Congratulations for Your Milestone</p></div>
        </div>
        <Comments />
    </div>
</template>


<script setup>
import { ref } from 'vue';

import Comments from './Comments.vue'

const date = ref(new Date().toLocaleString())
</script>
<style scoped>
.container{
    top: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}
.time{
    padding: 25px;
    background: white;
    border-radius: 10px;
    margin: auto;
    width: 300px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.container .time span {
    font-weight: bold;
}
</style>