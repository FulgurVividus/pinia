import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "Buy some milk", isFav: false },
      { id: 2, title: "Play Gloomhaven", isFav: true },
    ],
  }),
});
