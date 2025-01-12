import { defaultConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { createAutoAnimatePlugin } from '@formkit/addons'
import { genesisIcons } from '@formkit/icons'

export default defaultConfig({
  config: {
    rootClasses,
  },
  icons: {
    ...genesisIcons,
  },
  plugins: [createAutoAnimatePlugin()],
})
