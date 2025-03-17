<template>
  <div class="nav-drawer">
    <v-navigation-drawer
      width="270"
      :model-value="drawer"
      @update:model-value="$emit('close_drawer')"
    >
      <v-card color="transparent" flat class="pt-3 px-5">
        <div class="logo-parent">
          <div class="mb-0 text-center" style="min-height: auto">
            <img src="/images/logo.png" class="w-100" alt="" width="70" />
          </div>
        </div>

        <v-list class="d-flex flex-column justify-space-between">
          <div style="min-height: 78dvh">
            <div v-for="(link, i) in links" :key="i">
              <v-list-item
                :to="{ name: link.to }"
                active-class="active-nav"
                :key="$route.name"
                class="mb-2"
              >
                <v-list-item-title
                  class="d-flex align-center weight-3 ga-4 font-16 py-2"
                >
                  <v-icon>{{ link.icon }}</v-icon>
                  <span>{{ link.title }}</span></v-list-item-title
                >
              </v-list-item>
            </div>
          </div>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script setup>
defineProps({
  drawer: {
    type: Boolean,
    defaut: false,
  },
})

const links = [
  {
    title: 'Spaces',
    icon: 'mdi-file',
    type: 'link',
    to: 'spaces',
  },
  {
    title: 'Projects',
    icon: 'mdi-file',
    type: 'link',
    to: 'projects',
  },
]
</script>

<style scoped lang="scss">
.v-list-group__items .v-list-item {
  padding: 10px !important;
  margin-top: 5px !important;
}

.v-list-group__header .v-list-item-title {
  color: #9094a0;
}
.reports-active > .v-list-group__header {
  background-color: #fdb81a;
  border-radius: 30px !important;
}

.reports-active > .v-list-group__header .v-list-item-title {
  color: white !important;
}
</style>
<style lang="scss">
.reports-active > .v-list-group__header svg path {
  fill: #fff !important;
}

.force-open {
  .v-list-group__items {
    display: block !important;
    opacity: 1 !important;
    height: auto !important;
    transform: translateY(0) !important;
  }
}
.force-open.v-list-group .v-list-group__items {
  visibility: visible !important;
}
</style>
