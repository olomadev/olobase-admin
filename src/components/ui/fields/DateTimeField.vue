<template>
  <span>{{ dateFormatted(value) }}</span>
</template>

<script>
import i18nConfig from "@/modules/i18n/src/@config";
import Field from "../../../mixins/field";

export default {
  mixins: [Field],
  inject: ['i18n'],
  props: {
    format: {
      type: String,
      default() {
        return null;
      },
    },
  },
  methods: {
    getSelectedFormat() {
      return this.format || i18nConfig[this.i18n.global.locale.value].dateTimeFormat;
    },
    dateFormatted(val) {
      if (val) {
        return this.formatDateForDisplay(val);
      }
      return '';
    },
    pad(num) {
      return num < 10 ? '0' + num : num;
    },
    formatDateForDisplay(val) {
      const dateFormat = this.getSelectedFormat();
      const separatorMatch = dateFormat.match(/(\.)|(-)|(\/)|(\\)/);
      let separator = "-"; // default separator
      if (Array.isArray(separatorMatch)) {
        separator = separatorMatch[0];
      }

      const date = new Date(val);
      const pad = (n) => (n < 10 ? '0' + n : n);

      const Y = date.getFullYear();
      const m = pad(date.getMonth() + 1);
      const d = pad(date.getDate());
      const H = pad(date.getHours());
      const i = pad(date.getMinutes());
      const s = pad(date.getSeconds());

      // Replace custom format tokens with values
      let formatted = dateFormat
        .replace(/Y/, Y)
        .replace(/m/, m)
        .replace(/d/, d)
        .replace(/H/, H)
        .replace(/i/, i)
        .replace(/s/, s);

      return formatted;
    }
  },
};
</script>
