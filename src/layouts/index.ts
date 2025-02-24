import AdminLayout from './AdminLayout.vue'
import DefaultLayout from './DefaultLayout.vue'
import EmptyLayout from './EmptyLayout.vue'
import WelcomeLayout from './WelcomeLayout.vue'

export default {
  default: DefaultLayout,
  admin: AdminLayout,
  empty: EmptyLayout,
  welcome: WelcomeLayout,
}
