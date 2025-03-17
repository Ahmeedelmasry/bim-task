import { defineStore } from 'pinia'
import { useMainStore } from './main'

export const useProjectStore = defineStore('projects', {
  state: () => ({
    items: {},
    item: {},
  }),
  actions: {
    async createItem(body) {
      try {
        const bodyData = { ...body }
        if (useMainStore().jsonData.projects.data.length) {
          bodyData.id =
            useMainStore().jsonData.projects.data[
              useMainStore().jsonData.projects.data.length - 1
            ].id + 1
        } else {
          bodyData.id = 1
        }
        useMainStore().jsonData.projects.data.push({
          ...bodyData,
        })
        useMainStore().openToaster('success', 'Record Created Successfully')
        return true
      } catch (error) {
        console.log(error)
        useMainStore().openToaster('error', 'Something went wrong')
        return false
      }
    },
    async getItems() {
      this.items = {}
      try {
        this.items = { ...useMainStore().jsonData.projects }
        return true
      } catch (error) {
        console.log(error)
        useMainStore().openToaster('error', 'Something went wrong')
        return false
      }
    },
    async updateItem(body, id) {
      try {
        const index = useMainStore().jsonData.projects.data.findIndex(
          e => e.id == id,
        )
        useMainStore().jsonData.projects.data[index] = { ...body, id }
        useMainStore().openToaster('success', 'Record updated Successfully')
        return true
      } catch (error) {
        console.log(error)
        useMainStore().openToaster('error', 'Something went wrong')
        return false
      }
    },
    async deleteItem(id) {
      try {
        const index = useMainStore().jsonData.projects.data.findIndex(
          e => e.id == id,
        )
        useMainStore().jsonData.projects.data.splice(index, 1)
        useMainStore().openToaster('success', 'Record Deleted Successfully')
        return true
      } catch (error) {
        console.log(error)
        useMainStore().openToaster('error', 'Something went wrong')
        return false
      }
    },
  },
})
