<template>
  <v-switch
    :false-value="0"
    :true-value="1"
    v-bind="commonProps"
    @change="change"
    @update:modelValue="update"
  >
    <template v-for="(_, scopedSlotName) in $slots" v-slot:[scopedSlotName]="slotData">
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
  </v-switch>
</template>

<script>
import Input from "../../../mixins/input";

/**
 * Edit value as boolean. Rendered as a switch.
 */
export default {
  mixins: [Input],
  props: {
    /**
     * Integer to be edited.
     * @model
     */
    value: {
      type: [String, Number, Boolean], 
    },
    /**
     * false value
     */
    falseValue: {
      type: [String, Number, Boolean],
      default: "0",
    },
    /**
     * true value
     */
    trueValue: {
      type: [String, Number, Boolean],
      default: "1",
    },
  }
};
</script>
