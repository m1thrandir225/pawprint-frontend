import { defineStore } from "pinia";
import { ref, computed } from 'vue'

export const useUserStore = defineStore("user", () => {
  const user = ref(null)
  function setUser(user: any) {
    user.value = user
  }
  function clearUser() {
    user.value = null
  }
  return { user, setUser}
})
