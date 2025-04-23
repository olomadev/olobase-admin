import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

const useListStore = defineStore('list', {
  state: () => ({
    options: reactive({
      page: 1,
      itemsPerPage: 10,
      sortBy: [],
      sortDesc: [],
      groupBy: [],
      groupDesc: [],
      multiSort: false,
      mustSort: false,
      filter: {},
    }),
  }),
  actions: {
    updateOptions(newOptions) {
      Object.assign(this.options, newOptions)
    },
  },
})
export default useListStore;
