<template>
  <div class="global_alert">
    <v-dialog :model-value="dialog" max-width="500">
      <v-card class="card text-center pt-3 pb-7 px-4">
        <div class="text-center mb-2">
          <v-icon size="70" class="global_icon" color="orange"
            >mdi-alert</v-icon
          >
        </div>
        <h3
          style="white-space: nowrap; font-size: 22px; color: orange"
          class="mb-2"
        >
          Delete Item
        </h3>
        <p style="font-size: 19px; color: rgb(138, 138, 138)" class="my-1">
          Are you sure you want to delete this item?
        </p>
        <div
          class="text-center d-flex justify-center align-center mt-5"
          style="gap: 10px"
        >
        

        <v-btn
            class="weight-5"
            width="100"
            @click="$emit('delete_item')"
            color="red"
            style="
              height: 44px;
              text-transform: capitalize;
              font-size: 16px;
              letter-spacing: 0px;
              color: white !important;
            "
            elevation="0"
            :loading="loading"
            >Delete</v-btn
          >
          <v-btn
            class="weight-5"
            width="100"
            color="blue"
            @click="$emit('close')"
            style="
              height: 44px;
              text-transform: capitalize;
              font-size: 16px;
              color: white !important;
              letter-spacing: 0px;
            "
            elevation="0"
            >Cancel</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  dialog: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.global_icon {
  padding: 40px;
  border: 1px solid;
  border-radius: 50%;
}
</style>
