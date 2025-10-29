<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button type="button" title="All Tasks" @click="filter = 'all'">All tasks</button>
      <button type="button" title="Fav Tasks" @click="filter = 'favs'">Fav tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="isLoading">Loading tasks...</div>

    <!-- task list -->
    <ul class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalCount }} tasks left to do</p>
      <li v-for="task in tasks" :key="task.id">
        <TaskDetails :task="task" />
      </li>
    </ul>
    <ul class="task-list" v-if="filter === 'favs'">
      <p>You have {{ favCount }} favs left to do</p>
      <li v-for="task in favs" :key="task.id">
        <TaskDetails :task="task" />
      </li>
    </ul>

    <!-- reset button -->
    <!-- <button type="button" title="Reset" @click="taskStore.$reset">reset state</button> -->
  </main>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

const taskStore = useTaskStore();
const filter = ref("all");

const { tasks, isLoading, favs, totalCount, favCount } = storeToRefs(taskStore);
</script>
