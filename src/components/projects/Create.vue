<template>
  <v-dialog
    :model-value="dialog"
    @after-leave="$emit('closePopup')"
    width="700px"
  >
    <v-card class="px-6 pb-6" rounded="lg">
      <div class="admins-create-form">
        <v-card flat>
          <form @submit.prevent="submitForm">
            <h2 class="py-3 text-center font-24">
              {{ toUpdate.id ? 'Update' : 'Create' }} Project
            </h2>
            <v-divider></v-divider>
            <v-divider></v-divider>
            <v-container fluid class="pa-0">
              <v-row class="mt-5">
                <v-col cols="12" md="6">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Name</label
                  >
                  <v-text-field
                    hide-details
                    variant="text"
                    placeholder="Enter project name"
                    v-model="formData.name"
                    :class="{ errorField: v$.name.$error }"
                  ></v-text-field>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.name.$error"
                    >{{ v$.name.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12" md="6">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Location</label
                  >
                  <v-text-field
                    hide-details
                    variant="text"
                    placeholder="Enter project location"
                    v-model="formData.location"
                    :class="{ errorField: v$.location.$error }"
                  ></v-text-field>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.location.$error"
                    >{{ v$.location.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Status</label
                  >
                  <v-select
                    hide-details
                    :items="statuses"
                    variant="text"
                    placeholder="Select project status"
                    v-model="formData.status"
                    :class="{ errorField: v$.status.$error }"
                  ></v-select>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.status.$error"
                    >{{ v$.status.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Spaces</label
                  >
                  <v-select
                    multiple
                    chips
                    hide-details
                    :items="spaces.data"
                    variant="text"
                    item-title="name"
                    item-value="id"
                    return-object
                    placeholder="Select project spaces"
                    v-model="formData.spaces"
                    :class="{ errorField: v$.spaces.$error }"
                  ></v-select>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.spaces.$error"
                    >{{ v$.spaces.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Description</label
                  >
                  <v-textarea
                    hide-details
                    no-resize
                    variant="text"
                    placeholder="Enter project description"
                    v-model="formData.description"
                    :class="{ errorField: v$.description.$error }"
                  ></v-textarea>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.description.$error"
                    >{{ v$.description.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12" class="text-center">
                  <div
                    class="text-center d-flex align-center ga-3 justify-center"
                  >
                    <v-btn
                      class="mt-3 font-18 weight-5 text-none px-10"
                      flat
                      color="primary"
                      height="50"
                      :loading="loading"
                      rounded="lg"
                      type="submit"
                    >
                      Save
                    </v-btn>
                    <v-btn
                      class="mt-3 font-18 weight-5 text-none px-10"
                      flat
                      color="red-darken-2"
                      height="50"
                      :disabled="loading"
                      @click="$emit('closePopup')"
                      rounded="lg"
                    >
                      Close
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </form>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Vuelidate
import { useProjectStore } from '@/stores/projects'
import { useSpaceStore } from '@/stores/spaces'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { storeToRefs } from 'pinia'
import { computed, onMounted, ref } from 'vue'

// Init Stores
const projectsModule = useProjectStore()
const spacesModule = useSpaceStore()

// Data
const { items: spaces } = storeToRefs(spacesModule)

const formData = ref({
  name: null,
  location: null,
  status: null,
  spaces: [],
  description: null,
})

const formRoles = computed(() => ({
  name: { required },
  location: { required },
  status: { required },
  spaces: { required },
  description: { required },
}))

const statuses = [
  {
    title: 'Pending',
    value: 'Pending',
  },
  {
    title: 'In Progress',
    value: 'In Progress',
  },
  {
    title: 'Completed',
    value: 'Completed',
  },
  {
    title: 'Rejected',
    value: 'Rejected',
  },
]

const props = defineProps({
  dialog: {
    type: Boolean,
    default: false,
  },
  toUpdate: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['refreshTable'])

const loading = ref(false)

const v$ = useVuelidate(formRoles, formData)

const submitForm = async () => {
  const res = await v$.value.$validate()
  if (res) {
    if (res) {
      loading.value = true
      const result = props.toUpdate.id
        ? await projectsModule.updateItem(
            { ...formData.value },
            props.toUpdate.id,
          )
        : await projectsModule.createItem({ ...formData.value })

      loading.value = false
      if (result) {
        v$.value.$reset()
        formData.value = {
          name: null,
          location: null,
          status: null,
          description: null,
        }
        emits('refreshTable')
      }
    }
  }
}

onMounted(() => {
  if (props.toUpdate.id) {
    for (const val of Object.entries(formData.value)) {
      formData.value[val[0]] = props.toUpdate[val[0]]
    }
  }
})
</script>
