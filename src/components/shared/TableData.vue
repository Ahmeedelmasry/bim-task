<template>
  <v-card
    :class="{ 'pb-10': !hideFooter, 'pb-2': hideFooter }"
    color="#F3F3F3"
    flat
  >
    <div class="heading d-flex align-center justify-space-between mb-5">
      <h2 class="font-24 text-dark">{{ title }}</h2>
      <v-btn
        class="font-16 weight-5 text-none text-white"
        flat
        rounded="lg"
        color="primary"
        @click="$emit('createAction')"
        height="45"
      >
        Create {{ title.replace('s', '') }}
      </v-btn>
    </div>
    <v-data-table
      :items="items"
      :headers="getHeaders"
      :loading="loading"
      :items-per-page="20"
      :mobile="smAndDown"
    >
      <template #[`item.${slot}`]="item" v-for="slot in slots" :key="slot">
        <slot :name="slot" :item="item.item" />
      </template>
      <template #[`item.actions`]="item">
        <v-btn
          color="primary"
          size="small"
          flat
          :id="`row_actions_${item.index}`"
        >
          <v-icon size="20">mdi-dots-vertical</v-icon>
        </v-btn>
        <v-menu
          :activator="`#row_actions_${item.index}`"
          transition="slide-y-transition"
        >
          <v-list elevation="3" class="pa-0">
            <v-list-item
              @click="$emit('update', item.item)"
              close-on-click
              class="list-item-with-action"
            >
              <div class="d-flex justify-space-between align-center w-100 ga-2">
                <span>Update</span>
                <v-icon color="blue">mdi-pencil</v-icon>
              </div>
            </v-list-item>
            <v-list-item
              @click="$emit('delete', item.item)"
              close-on-click
              class="list-item-with-action"
            >
              <div class="d-flex justify-space-between align-center w-100">
                <span>Delete</span>
                <v-icon color="red">mdi-trash-can</v-icon>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template #bottom> </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'

const { smAndDown } = useDisplay()

const emits = defineEmits(['getData'])

const props = defineProps({
  headers: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: () => [],
  },
  slots: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})

const getHeaders = computed(() => {
  const headersWithoutSort = props.headers.map(el => {
    return { ...el, sortable: false }
  })
  return headersWithoutSort
})
</script>

<style lang="scss">
.input_search {
  padding-left: 25px;
}
.search_button {
  position: absolute;
  height: 60px !important;
  background: transparent;
  z-index: 999;
  min-width: 30px;
  i {
    color: #fdb81a;
  }
}
.v-table {
  color: #333333 !important;
}
.v-list .v-list-item {
  table {
    width: 96%;
  }
  a {
    color: #333333;
    text-decoration: none;
  }
}
</style>
