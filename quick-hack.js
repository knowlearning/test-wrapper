import { createApp, watchEffect } from 'vue'

//  TODO: probably want to make this a util, and better fleshed out (with white instead of blacklist)
function isScopeSerializable(v) {
  return !(
    v instanceof HTMLElement
  )
}

export default async function (module, props) {
  const component = module.default ? { ...module.default } : { ...module } //  copy component since we will mess with mounted and data functions

  if (!component.ephemeral) {
    const state = await Agent.mutate()

    if (component.data) {
      const origDataFn = component.data
      component.data = function dataProxy() {
        if (Object.keys(state).length === 0) {
          const startState = origDataFn.apply(this, arguments)
          Object.assign(state, startState)
        }
        return state
      }
    }
    else if (component.setup) {
      const origSetupFn = component.setup
      const isReactiveRef = r => r && r.__v_isRef
      component.setup = function setupProxy(a, b) { // need to specifically add this here, otherwise second argument not passed in arguments array (probably because of webpack optimization...)
        let refs = origSetupFn.call(this, a, b)

        Object
          .entries(state)
          .filter(([k]) => isReactiveRef(refs[k]))
          .forEach(([k, v]) => refs[k].value = v)

        Object
          .entries(refs)
          .filter(([_,r]) => isReactiveRef(r) && isScopeSerializable(r.value))
          .forEach(([key, ref]) => {
            watchEffect(() => {
              if (state[key] !== ref.value) {
                state[key] = ref.value
              }
            })
          })

        return refs
      }
    }
  }


  document.body.innerHTML = ''
  const app = createApp(component, props)
  console.log(app)
  app.mount(document.body)
}
