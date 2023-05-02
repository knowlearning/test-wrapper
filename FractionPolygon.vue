<script setup>
const emit = defineEmits(['select'])

const props = defineProps({
  partitions: Array
})

const pathForPartition = index => {
  const startPosDeg = index * 360 / props.partitions.length
  const startPosRad = startPosDeg * Math.PI/180
  const endPosDeg = (index + 1) * (360 / props.partitions.length)
  const endPosRad = endPosDeg * (Math.PI/180)
  const p1 = `${50 + 46*Math.cos(startPosRad)},${50 + 46*Math.sin(startPosRad)}`
  const p2 = `${50 + 46*Math.cos(endPosRad)},${50 + 46*Math.sin(endPosRad)}`

  return `M50,50 L${p1} L${p2} z`
  // circle variant --- return `M50,50 L${p1} A 46 46 , 0, 0 1, ${p2} z`
  // cool variant --- return `M50,50 L${p1} A 46 46 , 0, 0 1, ${p2} z`
  // cool variant --- return `M50,50 L${p1} A 46 46 , 1, 0 0, ${p2} z`
}

</script>

<template>
  <svg viewBox="0 0 100 100" width="100%" height="100%">
    <path
      v-for="(partitionColor, i) in partitions"
      stroke-linejoin="round"
      stroke-width="2"
      stroke="black"
      :fill="partitionColor"
      :d="pathForPartition(i)"
      @click="emit('select', i)"
    />
  </svg>
</template>

<style scoped>
</style>
