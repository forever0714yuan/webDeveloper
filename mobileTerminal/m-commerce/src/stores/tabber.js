import { defineStore } from 'pinia'

export const useTabberStore = defineStore({
    id: 'tabber',
    state: () => ({
        active: 0
    }),
    getters: {
    },
    actions: {
        onChange(index) {
            this.active = index
        }
    }
})
