<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-card-title class="display-0">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red darken-1"
          text
          @click.native="$store.getModule('messages').agree()"
        >
          {{ $t("va.confirm.yes") }}
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click.native="$store.getModule('messages').cancel()"
        >
          {{ $t("va.confirm.no") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { storeToRefs } from 'pinia'
import useStore from "olobase-admin/src/store/messages"

export default {
  // setup() {
  //   //
  //   // https://runthatline.com/pinia-watch-state-getters-inside-vue-components/
  //   // 

  //   // console.error(confirmObject);
  // },
  data: () => ({
    dialog: false,
    confirm: null,
    title: null,
    message: null,
  }),
  created() {
    const messages = useStore();
    const { confirmObject } = storeToRefs(messages)
    this.confirm = confirmObject;
  },
  watch: {
    "confirm"(newVal) {
      if (newVal) {
        this.dialog = true;
        this.title = newVal.title;
        this.message = newVal.message;
        return;
      }
      this.dialog = false;
    },
  },
};
</script>
