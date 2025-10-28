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

    <!-- task list -->
    <ul class="task-list" v-if="filter === 'all'">
      <p>You have {{ taskStore.totalCount }} tasks left to do</p>
      <li v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </li>
    </ul>
    <ul class="task-list" v-if="filter === 'favs'">
      <p>You have {{ taskStore.favCount }} favs left to do</p>
      <li v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </li>
    </ul>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "./store/TaskStore";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";

const taskStore = useTaskStore();
const filter = ref("all");
</script>
