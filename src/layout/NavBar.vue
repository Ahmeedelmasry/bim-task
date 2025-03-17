<template>
  <div class="navbar">
    <v-app-bar elevation="0" height="80">
      <v-container fluid class="px-sm-5 px-0 pe-3">
        <v-row class="align-center">
          <v-col cols="5" class="d-flex align-center ga-2">
            <v-app-bar-nav-icon
              @click="$emit('toggle')"
              class="font-20"
            ></v-app-bar-nav-icon>
            <span class="font-20 weight-5">{{ $route.meta.title }}</span>
          </v-col>
          <v-col cols="3"> </v-col>
          <v-col cols="4">
            <div class="icons d-flex justify-end ga-5 align-center">
              <v-icon
                :size="smAndUp ? 30 : 25"
                id="notifs_menu"
                class="cursor-pointer"
                >mdi-bell-outline</v-icon
              >
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { smAndUp } = useDisplay()
</script>
