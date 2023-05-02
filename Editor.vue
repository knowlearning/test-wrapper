<script setup>
import { ref, computed } from 'vue'
import FractionPolygon from './FractionPolygon.vue'

const color = ref('chartreuse')
const partitions = ref(['white','white','white'])
const colored = computed(() => partitions.value.filter(c => c !== 'white').length)
const total = computed(() => partitions.value.length)

</script>

<template>
  {{ colored }} / {{ total }}
  <button @click="partitions.push('white')">+</button>
  <button @click="partitions.pop()">-</button>
  <FractionPolygon
    :partitions="partitions"
    @select="index => partitions[index] = partitions[index] === 'white' ? color : 'white'"
  />
</template>

<style scoped>
</style>
