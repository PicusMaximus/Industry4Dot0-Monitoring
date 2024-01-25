<script setup lang="ts">
import { ref } from 'vue';

const counter = ref(0)
</script>
    
<template>
    <button @click="counter--">-</button>
    <span>{{ counter }}</span>
    <button @click="counter++">+</button>
    <span>Ahoi</span>
    <test :counter="counter"></test>
</template>