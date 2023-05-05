<template>
  <div v-if="loading">loading</div>
  <div v-else>
    <JSONViewer v-if="state" :data="state" />
    <span v-else>null</span>
  </div>
</template>

<script>
  import JSONViewer from 'vue-json-pretty'
  import 'vue-json-pretty/lib/styles.css'

  export default {
    components: { JSONViewer },
    props: {
      scope: String
    },
    data() {
      return {
        loading: true,
        state: null
      }
    },
    created() {
      Agent
        .state(this.scope)
        .watch(({ state }) => this.state = state)
        .then(state => {
          this.state = state
          this.loading = false
        })
    }
  }

</script>