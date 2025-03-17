<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
  <v-snackbar
    v-model="toaster.showToaster"
    location="right"
    :color="toaster.type == 'success' ? 'success' : 'error'"
    timeout="10000"
    @update:model-value="mainModule.reset()"
  >
    <v-card color="transparent" flat>
      <div class="d-flex justify-space-between">
        <div>
          <v-card-title class="pa-0 mb-2"
            ><span class="font-28 text-capitalize">{{
              toaster.type
            }}</span></v-card-title
          >
          <span class="font-17">{{ toaster.message }}</span>
        </div>
        <v-icon @click="(toaster.showToaster = false), mainModule.reset()"
          >mdi-close</v-icon
        >
      </div>
    </v-card>
  </v-snackbar>
</template>

<script setup>
import AppLayout from '@/layout/Default.vue'
import { useMainStore } from './stores/main'
import { storeToRefs } from 'pinia'

// Init Store
const mainModule = useMainStore()
const { toaster, showLayout } = storeToRefs(mainModule)
</script>

<style lang="scss">
@font-face {
  font-family: Poppins;
  src: url(/fonts/Poppins/Poppins-Regular.ttf);
}

*,
body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
  font-family: Poppins;
}

.v-navigation-drawer__content a:not(.active-nav),
.active-order {
  text-decoration: none;
  color: #9094a0 !important;
  svg {
    path {
      fill: #9094a0;
    }
  }
}

.v-navigation-drawer__content {
  .v-list-item:not(.active-nav):hover,
  .active-order:hover {
    transition: 0.5s !important;
    background-color: rgb(253 193 54 / 49%);
    color: rgba(0, 0, 0, 0.701) !important;
    border-radius: 30px !important;
  }
}

.active-nav,
.active-order {
  background-color: #fdb81a !important;
  color: #fff !important;
  border-radius: 30px !important;
  span {
    color: #fff !important;
  }
  svg {
    path {
      fill: #fff !important;
    }
  }
}

ul {
  list-style: none;
}

.not-link {
  display: none !important;
}

.v-data-table {
  // table {
  //   min-width: 767px;
  //   overflow-x: auto;
  // }
  .v-data-table-headers--mobile {
    display: none;
  }
  .v-data-table__tr--mobile {
    td:first-child {
      padding-top: 20px;
    }
    td:last-child {
      padding-bottom: 20px;
      border-bottom: 1px solid !important;
    }
    .v-data-table__td-title {
      font-weight: 600;
      font-size: 14px;
    }
  }
  .v-data-table__tr--mobile:last-child {
    td:last-child {
      border-bottom: unset !important;
    }
  }
  .v-data-table-header__content {
    font-size: 16px;
    color: #96a5b8;
    font-weight: 500;
    white-space: nowrap;
  }
  .v-data-table__td {
    font-size: 16px;
  }
}

.v-btn {
  letter-spacing: 0;
}

input,
textarea {
  font-size: 20px;
}

.v-input:not(.v-textarea):not(.v-switch):not(.v-autocomplete):not(
    .v-file-input
  ) {
  border: 2px solid #d7dadf;
  border-radius: 7px;
  height: 60px;
  input {
    font-size: 16px !important;
    &::placeholder {
      font-size: 13px !important;
    }
  }
}

// Test

.v-input.v-autocomplete,
.v-input.v-file-input {
  border: 2px solid #d7dadf;
  min-height: 60px;
  border-radius: 7px;
  input {
    font-size: 16px !important;
    &::placeholder {
      font-size: 13px !important;
    }
  }
}

.tiptap {
  border: 2px solid #d7dadf;
  border-radius: 7px;
  font-size: 16px !important;
  height: 300px;
  padding: 15px;
}

.v-textarea {
  border: 2px solid #d7dadf;
  border-radius: 7px;
  textarea {
    font-size: 16px !important;
    &::placeholder {
      font-size: 13px !important;
    }
  }
}

.ql-container {
  height: 200px !important;
}

.v-radio-group {
  border: none;
}

.v-switch {
  border: none;
  border-radius: 7px;
  height: 60px;
  input {
    font-size: 16px !important;
    &::placeholder {
      font-size: 13px !important;
    }
  }
}

.errorField {
  background-color: #ff00001a;
  border: 1px solid indianred;
}

.delete-img {
  background-color: indianred;
  width: 40px;
  height: 40px;
  color: white;
}

.v-navigation-drawer__scrim {
  position: fixed;
}

.v-navigation-drawer__content {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.v-navigation-drawer__content::-webkit-scrollbar {
  display: none;
}
</style>
