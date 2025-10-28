import { defineStore } from "pinia";

const tasksReserve = [
  { id: 1, title: "Buy some milk", isFav: false },
  { id: 2, title: "Play Gloomhaven", isFav: true },
];

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [...(JSON.parse(localStorage.getItem("tasks")) || [...tasksReserve])],
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
  actions: {
    addTask(task) {
      this.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    toggleFav(id) {
      this.tasks = this.tasks.map((task) => {
        if (task.id === id) {
          return { ...task, isFav: !task.isFav };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
});
