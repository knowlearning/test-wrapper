<script setup>
import { computed } from 'vue'
const emit = defineEmits(['select'])

const props = defineProps({
  partitions: Array,
  exploded: Boolean
})

const numPartitions = props.partitions.length

const pathForPartition = (index, upperRow) => {
  const points = []
  if (props.exploded) {
    const baseLength = 100 / numPartitions
    const height = 46
    const yOffset = upperRow ? 0 : 50
    points.push(`${(index + 0.5) * baseLength},${yOffset}`)
    points.push(`${index * baseLength},${yOffset + height}`)
    points.push(`${(index + 1) * baseLength},${yOffset + height}`)
  }
  else {
    const startPosDeg = index * 360 / numPartitions
    const startPosRad = startPosDeg * Math.PI/180
    const endPosDeg = (index + 1) * (360 / numPartitions)
    const endPosRad = endPosDeg * (Math.PI/180)
    points.push('50,50')
    points.push(`${50 + 46*Math.cos(startPosRad)},${50 + 46*Math.sin(startPosRad)}`)
    points.push(`${50 + 46*Math.cos(endPosRad)},${50 + 46*Math.sin(endPosRad)}`)
  }

  return `M${points.join(' L')} z`
  // circle variant --- return `M50,50 L${p1} A 46 46 , 0, 0 1, ${p2} z`
  // cool variant --- return `M50,50 L${p1} A 46 46 , 0, 0 1, ${p2} z`
  // cool variant --- return `M50,50 L${p1} A 46 46 , 1, 0 0, ${p2} z`
}

const partitionPaths = computed(() => {
  return props.partitions.map((_, i) => pathForPartition(i))
})

const filledPartitionPaths = computed(() => {
  let coloredIndex = -1
  return props.partitions.map((color, i) => {
    if (color !== 'white') {
      coloredIndex += 1
      return pathForPartition(props.exploded ? coloredIndex : i, true)
    }
    else `M 0,0 Z`
  })
})

</script>

<template>
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path
      class="partition-path"
      v-for="(path, i) in partitionPaths"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="black"
      fill="white"
      :d="path"
      @click="emit('select', i)"
    />
    <path
      class="partition-path"
      v-for="(path, i) in filledPartitionPaths"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="black"
      fill="pink"
      :d="path"
      @click="emit('select', i)"
    />
  </svg>
</template>

<style scoped>

.partition-path {
  transition: d 1s ease-in-out;
}

</style>
