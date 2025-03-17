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
              {{ toUpdate.id ? 'Update' : 'Create' }} Space
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
                    >Area</label
                  >
                  <v-text-field
                    hide-details
                    variant="text"
                    placeholder="Enter project area"
                    v-model="formData.area"
                    :class="{ errorField: v$.area.$error }"
                  ></v-text-field>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.area.$error"
                    >{{ v$.area.$errors[0].$message }}</span
                  >
                </v-col>
                <v-col cols="12">
                  <label
                    style="margin-bottom: 5px; display: block"
                    class="weight-3 font-16"
                    >Level</label
                  >
                  <v-select
                    hide-details
                    :items="levels"
                    variant="text"
                    placeholder="Select project level"
                    v-model="formData.level"
                    :class="{ errorField: v$.level.$error }"
                  ></v-select>
                  <span
                    class="text-error font-14 pt-1 d-block weight-3"
                    v-if="v$.level.$error"
                    >{{ v$.level.$errors[0].$message }}</span
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
import { useSpaceStore } from '@/stores/spaces'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { computed, onMounted, ref } from 'vue'

// Init Stores
const spacesModule = useSpaceStore()

// Data
const formData = ref({
  name: null,
  area: null,
  level: null,
})

const formRoles = computed(() => ({
  name: { required },
  area: { required },
  level: { required },
}))

const levels = [
  {
    title: 'Level One',
    value: 'Level One',
  },
  {
    title: 'Level Two',
    value: 'Level Two',
  },
  {
    title: 'Level Three',
    value: 'Level Three',
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
        ? await spacesModule.updateItem(
            { ...formData.value },
            props.toUpdate.id,
          )
        : await spacesModule.createItem({ ...formData.value })

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
