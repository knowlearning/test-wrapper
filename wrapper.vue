<template>
  <div id="container">
    <div id="header">
      <svg
        v-for="item, i in items"
        class="item-circle"
        viewBox="0 0 100 100"
        @click="index = i"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="chartreuse"
          stroke="black"
          :stroke-width="index === i ? 4 : 0"
        />
      </svg>
    </div>
    <div id="content">
      <content
        :id="items[index]"
        :key="index"
        :scope="items[index]"
      />
    </div>
    <div>
      <ScopeViewer :scope="items[index]" :key="items[index]" />
    </div>
  </div>
</template>

<script>
import ScopeViewer from './scope-viewer.vue'

export default {
  components: { ScopeViewer },
  props: {
    items: Array
  },
  data() {
    return {
      index: 0
    }
  },
  computed: {},
  methods: {}
}

</script>

<style scoped>

#container {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

#header {
  text-align: center;
  height: 40px;
}

#content {
  position: relative;
  flex-grow: 1;
}

.item-circle {
  height: 100%;
}

</style>
