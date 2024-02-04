<template>
  <div>
    <v-snackbar 
      class="mt-15"
      v-model="snackbar.visible" 
      :location="snackbar.position"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      transition="slide-y-transition"
      :multi-line="true"
      eager
      vertical
      style="padding:0;"
    >
      <v-layout class="align-center">
        <table style="min-width:350px;border:none;">
          <tr>
            <td width="15%" style="border:none;padding-left:5px;">
              <v-icon class="pr-3" size="x-large">{{ snackbar.icon }}</v-icon>
            </td>
            <td style="border:none;">
              <div v-html="snackbar.text"></div>
            </td>
            <td width="10%" style="border:none;" align="right"> 
              <v-btn 
                variant="text"
                style="padding:0;"
                min-width="35"
                @click="snackbar.visible = false"
              >
                <v-icon size="x-large">mdi-close</v-icon>
              </v-btn>
          </td>
          </tr>
        </table>
      </v-layout>
    </v-snackbar>
    <confirm></confirm>
  </div>
</template>

<script>
import Confirm from "../internal/Confirm";

/**
 * Internal VaMessages system for snackbar infos and confirm dialog.
 * Integrated with all resource modules for message API calls.
 * Will automatically show `message` error property in case or API errors.
 * Already included in main admin layout, use it only if you need total custom layout.
 */
export default {
  inject: ["admin"],
  components: {
    Confirm,
  },
  computed : {
    snackbar() {
      return this.admin.store.getters['messages/getSnackbar']
    }
  }
};
</script>
