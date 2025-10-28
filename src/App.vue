<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="Pinia Logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- task list -->
    <ul class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </li>
    </ul>
  </main>
</template>

<script setup lang="js">
import { useTaskStore } from './store/TaskStore';
import TaskDetails from './components/TaskDetails.vue';

const taskStore = useTaskStore()
</script>
