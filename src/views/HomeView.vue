<template>
  <div class="home-page"></div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push({ name: 'projects' })
})
</script>
