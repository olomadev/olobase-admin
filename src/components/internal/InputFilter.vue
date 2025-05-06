<template>
  <component
    :is="`va-${type}-input`"
    :resource="resource"
    :source="source"
    :label="label"
    :appendLogo="appendLogo"
    v-bind="$attrs"
    hide-details
    :filled="false"
    small-chips
    variant="outlined"
    :loadCurrentItems="false"
    v-model="input"
    color="primary"
    :return-object="returnObject"
  >
  </component>
</template>

<script>
import Source from "../../mixins/source";
import { debounce } from '@/helpers/lodash';

export default {
  mixins: [Source],
  props: {
    loadCurrentItems: false,
    /**
     * Append logo path
     */
    appendLogo: {
      type: Object,
      default: () => ({
        base64: false,
        baseUrl: null,
        field: 'logo'   // örn: item.logo
      }),
    },
    value: {
      default: null,
    },
    type: {
      type: String,
      required: true,
      validator: (v) =>
        [
          "text",
          "number",
          "boolean",
          "date",
          "rating",
          "select",
          "auto-complete",
          "autoComplete",
        ].includes(v),
    },
    /**
     * Override default label behavior.
     */
    label: String,
    /**
     * 
     */
    returnObject: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        this.input = val
      },
      immediate: true,
    },
    input() {
      this.debounceInput()
    },
  },
  methods: {
    debounceInput: debounce(function () {
      this.$emit("input", this.input)
    }, 200),
  },
};
</script>
