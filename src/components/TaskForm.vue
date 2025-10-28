<template>
  <section>
    <form @submit.prevent="handleSubmit">
      <input type="text" inputmode="text" placeholder="I need to..." v-model="newTask" />
      <button type="submit" title="Add">Add</button>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/store/TaskStore";

const taskStore = useTaskStore();
const newTask = ref("");

function handleSubmit() {
  if (!newTask.value.length) return;

  taskStore.addTask({
    id: Math.floor(Math.random() * 10_000),
    title: newTask.value,
    isFav: false,
  });
  newTask.value = "";
}
</script>
