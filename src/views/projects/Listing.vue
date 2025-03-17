<template>
  <div class="users-listing">
    <TableData
      :items="items.data"
      :headers="headers"
      :loading="loading"
      :slots="['index', 'spaces']"
      @createAction="openCreate = true"
      title="Projects"
      @delete="(openDelete = true), (toDelete = $event)"
      @update="openUpdate"
    >
      <template #index="{ item }">
        <div class="py-1">#{{ item.id }}</div>
      </template>
      <template #spaces="{ item }">
        <div>
          <v-chip
            v-for="record in item.spaces"
            :key="record.id"
            class="me-2"
            size="small"
            >{{ record.name }}</v-chip
          >
        </div>
      </template>
    </TableData>

    <DeleteIPopup
      :dialog="openDelete"
      v-if="openDelete"
      :loading="deleteLoading"
      @close="openDelete = false"
      @delete_item="
        (openDelete = false), projectsModule.deleteItem(toDelete.id)
      "
    />

    <CreateItem
      :dialog="openCreate"
      @closePopup="(openCreate = false), (toUpdate = {})"
      v-if="openCreate"
      :toUpdate="toUpdate"
      @refreshTable="
        (openCreate = false), projectsModule.getItems(), (toUpdate = {})
      "
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TableData from '@/components/shared/TableData.vue'
import CreateItem from '@/components/projects/Create.vue'
import { useProjectStore } from '@/stores/projects'
import { storeToRefs } from 'pinia'

// Init Stores
const projectsModule = useProjectStore()

const { items } = storeToRefs(projectsModule)

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
    title: 'Location',
    key: 'location',
    width: '20%',
  },
  {
    title: 'Spaces',
    key: 'spaces',
    width: '20%',
  },
  {
    title: 'Status',
    key: 'status',
    width: '20%',
  },
  {
    title: 'Description',
    key: 'description',
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
  projectsModule.getItems()
})
</script>
