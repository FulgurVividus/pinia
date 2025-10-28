import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "Buy some milk", isFav: false },
      { id: 2, title: "Play Gloomhaven", isFav: true },
    ],
  }),
  getters: {
    favs(state) {
      return state.tasks.filter((task) => task.isFav === true);
    },
    favCount(state) {
      return state.tasks.reduce((prev, curr) => {
        return curr.isFav ? prev + 1 : prev;
      }, 0);
    },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
});
