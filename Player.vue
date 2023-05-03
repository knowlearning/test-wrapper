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

<script>
import FractionPolygon from './FractionPolygon.vue'
import confetti from 'canvas-confetti'

export default {
  components: { FractionPolygon },
  props: {
    numerator: {
      type: Number,
      required: true
    },
    denominator: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      color: 'pink',
      partitions: new Array(this.denominator).fill('white'),
      correct: null
    }
  },
  computed: {
    selected() {
      return this.partitions.filter(x => x !== 'white').length
    }
  },
  methods: {
    submit() {
      if (this.selected === this.numerator) {
        this.correct = true
        confetti({
          particleCount: 200,
          spread: 70,
          origin: { y: 1 }
        })
      }
      else this.correct = false
    }
  }
}

</script>

<style scoped>
</style>
