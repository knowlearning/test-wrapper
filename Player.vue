<template>
  <div
    id="instructions-page"
    v-if="view === 'instructions'"
  >
    <div
      id="instructions-text"
      :ref="fillText"
    >
      Color {{ numerator }} / {{ denominator }} of the {{ shape }}.
    </div>
    <div>
      <button @click="view = 'workspace'">Okay!</button>
    </div>
  </div>
  <div v-else-if="view === 'workspace'" id="workspace">
    <div id="workspace-visual">
      <FractionPolygon
        :partitions="partitions"
        :exploded="showFractionVisual"
        @select="index => {
          partitions[index] = partitions[index] === 'white' ? color : 'white'
          correct = null
        }"
      />
    </div>
    <div v-if="correct===true" id="feedback-box" :ref="fillText">
      Nice work!
    </div>
    <div v-else-if="correct===false" id="feedback-box" :ref="fillText">
      Oops too {{ selected > numerator ? 'many' : 'few' }}.
    </div>
    <div id="button-bar">
      <button v-if="!correct" @click="view = 'instructions'">instructions</button>
      <button v-if="correct === null" @click="submit">I colored {{ numerator }} / {{ denominator }} of the {{ shape }}</button>
      <button v-else-if="correct === false" @click="correct = null">Keep Trying!</button>
    </div>
  </div>
</template>

<script>
import FractionPolygon from './FractionPolygon.vue'
import confetti from 'canvas-confetti'
import fillText from '@knowlearning/fill-text'

const shapes = [null, null, null, 'triangle', 'square', 'pentagon', 'hexagon', 'heptagon', 'octagon']

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
      view: 'instructions',
      color: 'pink',
      partitions: new Array(this.denominator).fill('white'),
      correct: null
    }
  },
  computed: {
    selected() {
      return this.partitions.filter(x => x !== 'white').length
    },
    shape() {
      return shapes[this.denominator] || 'shape'
    },
    showFractionVisual() {
      return this.correct !== null
    }
  },
  methods: {
    fillText(el) {
      if (el) setTimeout(() => fillText(el, 'center'))
    },
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

#instructions-page,
#workspace {
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  text-align: center;
  justify-content: space-around;
}

#instructions-text {
  flex-grow: 1;
}

#workspace-visual {
  flex-grow: 1;
  position: relative;
  max-height: 80vh;
}

#feedback-box {
  height: 33vh;
  overflow: hidden;
}

</style>
