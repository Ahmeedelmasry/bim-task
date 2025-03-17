import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', () => {
  const toaster = ref({
    type: '',
    message: '',
    showToaster: false,
  })

  const jsonData = {
    projects: {
      data: [],
    },
    spaces: {
      data: [],
    },
  }

  const showLayout = ref(false)

  // Methods
  const openToaster = (type, message) => {
    toaster.value.type = type
    toaster.value.message = message
    toaster.value.showToaster = true
  }

  const reset = () => {
    toaster.value = {
      type: '',
      message: '',
      showToaster: false,
    }
  }
  return { toaster, showLayout, jsonData, openToaster, reset }
})
