<template>
  <div class="default-layout">
    <v-layout>
      <NavDrawer :drawer="drawer" @close_drawer="drawer = !drawer" />
      <v-main style="background-color: #f5f5f5; min-height: 100dvh">
        <Navbar @toggle="drawer = !drawer" />
        <v-container fluid class="px-sm-7 px-3 pt-7">
          <slot></slot>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script setup>
import Navbar from './NavBar.vue'
import NavDrawer from './NavDrawer.vue'
import { ref } from 'vue'

const drawer = ref(true)
</script>
