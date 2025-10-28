<template>
  <section>
    <div class="task">
      <h3>{{ task.title }}</h3>
      <div class="icons">
        <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
        <i
          class="material-icons"
          :class="{ active: task.isFav }"
          @click="taskStore.toggleFav(task.id)"
          >favorite</i
        >
      </div>
    </div>
  </section>
</template>

<script setup>
import { useTaskStore } from "@/store/TaskStore";
import { defineProps } from "vue";

const { task } = defineProps({
  task: Object,
});

const taskStore = useTaskStore();
</script>
