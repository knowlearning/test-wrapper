import Wrapper from './wrapper.vue'
import { BrowserAgent, vuePersistentComponent } from '@knowlearning/agents'

window.Agent = BrowserAgent()
const props = {
  items: [
    'ef08a8e0-ead1-11ed-9243-012070fe7fad',
    'https://fill-the-fraction.netlify.app/?numerator=1&denominator=5',
    'https://fill-the-fraction.netlify.app/?numerator=2&denominator=5',
    'https://fill-the-fraction.netlify.app/?numerator=3&denominator=8',
    'https://fill-the-fraction.netlify.app/?numerator=6&denominator=12'
  ]
}
vuePersistentComponent(Wrapper, props)
