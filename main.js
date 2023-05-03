import Editor from './Editor.vue'
import Player from './Player.vue'
import { BrowserAgent, vuePersistentComponent } from '@knowlearning/agents'

window.Agent = BrowserAgent()

const url = new URL(window.location.href)

const params = url.searchParams
if (params.get('numerator')) {
  const props = {
    numerator: parseInt(params.get('numerator')),
    denominator: parseInt(params.get('denominator'))
  }
  vuePersistentComponent(Player, props)
}
else {
  vuePersistentComponent(Editor)
}