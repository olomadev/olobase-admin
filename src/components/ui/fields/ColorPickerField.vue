<template>
  <v-chip :color="getColor"></v-chip>
</template>

<script>
import Field from "../../../mixins/field";
/**
 * Show value as simple text, render a simple span. HTML tags will be stripped.
 */
export default {
  mixins: [Field],
  props: {
    /**
     * Truncate text
     */
    truncate: Number,
  },
  computed: {
    getColor() {
      return this.value
    },
  },
};
</script>
