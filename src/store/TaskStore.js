import { defineStore } from "pinia";

const tasksReserve = [
  { id: 1, title: "Buy some milk", isFav: false },
  { id: 2, title: "Play Gloomhaven", isFav: true },
];

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [...(JSON.parse(localStorage.getItem("tasks")) || [...tasksReserve])],
    isLoading: false,
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
    async getTasks() {
      this.isLoading = true;
      const res = await fetch(`http://localhost:3000/tasks`);
      const data = await res.json();
      // this.tasks = data;
      this.isLoading = false;
    },
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
    async asyncAddTask(task) {
      this.tasks.push(task);

      const res = await fetch(`http://localhost:3000/tasks`, {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
    async asyncDeleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.error) {
        console.log(res.error);
      }
    },
    async asyncToggleFav(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isFav = !task.isFav;

      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ isFav: task.isFav }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.error) {
        console.log(res.error);
      }
    },
  },
});
