<template>
  <div class="users-listing">
    <TableData
      :items="items.data"
      :headers="headers"
      :loading="loading"
      :slots="['index']"
      @createAction="openCreate = true"
      title="Spaces"
      @delete="(openDelete = true), (toDelete = $event)"
      @update="openUpdate"
    >
      <template #index="{ item }">
        <div class="py-1">#{{ item.id }}</div>
      </template>
    </TableData>

    <DeleteIPopup
      :dialog="openDelete"
      v-if="openDelete"
      :loading="deleteLoading"
      @close="openDelete = false"
      @delete_item="(openDelete = false), spacesModule.deleteItem(toDelete.id)"
    />

    <CreateItem
      :dialog="openCreate"
      @closePopup="(openCreate = false), (toUpdate = {})"
      v-if="openCreate"
      :toUpdate="toUpdate"
      @refreshTable="
        (openCreate = false), spacesModule.getItems(), (toUpdate = {})
      "
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TableData from '@/components/shared/TableData.vue'
import CreateItem from '@/components/spaces/Create.vue'
import { useSpaceStore } from '@/stores/spaces'
import { storeToRefs } from 'pinia'

// Init Stores
const spacesModule = useSpaceStore()

const { items } = storeToRefs(spacesModule)

// Data
const loading = ref(false)
const openCreate = ref(false)
const toUpdate = ref({})

const deleteLoading = ref(false)
const openDelete = ref(false)
const toDelete = ref(null)
const headers = [
  {
    title: 'ID',
    key: 'index',
    width: '10%',
  },
  {
    title: 'Name',
    key: 'name',
    width: '20%',
  },
  {
    title: 'Area',
    key: 'area',
    width: '20%',
  },
  {
    title: 'Level',
    key: 'level',
    width: '20%',
  },
  {
    title: 'Actions',
    key: 'actions',
    width: '10%',
  },
]

// Methods
const openUpdate = e => {
  toUpdate.value = e
  openCreate.value = true
}

onMounted(() => {
  spacesModule.getItems()
})
</script>
