<script setup>
import { ref, computed } from 'vue'
import FractionPolygon from './FractionPolygon.vue'
import confetti from 'canvas-confetti'

const props = defineProps({
  numerator: Number,
  denominator: Number,
})

const color = ref('pink')
const partitions = ref(new Array(props.denominator).fill('white'))
const selected = computed(() => partitions.value.filter(c => c !== 'white').length)
const correct = ref(null)

function submit() {
  if (selected.value === props.numerator) {
    correct.value = true
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 1 }
    })
  }
  else correct.value = false
}

</script>

<template>
  <span>Color in {{ numerator }} / {{ denominator }} of the shape.</span>
  <FractionPolygon
    :partitions="partitions"
    @select="index => {
      partitions[index] = partitions[index] === 'white' ? color : 'white'
      correct = null
    }"
  />
  <span v-if="correct">Correct!</span>
  <span v-else-if="correct === false">That is {{ selected }} / {{ denominator }}. Keep trying!</span>
  <button v-else @click="submit">done</button>
</template>

<style scoped>
</style>
