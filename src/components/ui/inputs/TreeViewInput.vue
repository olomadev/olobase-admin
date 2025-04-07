<template>
  <v-treeview 
    :selected-color="color"
    v-bind="commonProps"
    :lines="lines"
    :open-all="openAll"
    :opened="opened"
    :density="density"
    :variant="variant"
    :item-title="getItemText"
    :item-value="getItemValue"
    :select-strategy="selectionType" 
    :selectable="selectable"
    :items="items || choices"
    @update:modelValue="update"
    :return-object="returnObject"
  >
    <template v-for="(_, scopedSlotName) in $slots" v-slot:[scopedSlotName]="slotData">
      <slot :name="scopedSlotName" v-bind="slotData" />
    </template>
    <template v-slot:no-data>
      <div>
        <v-table density="compact">
          <tbody>
            <tr>
              <td>{{ $t("i18n.datatable.nodata")}}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>
  </v-treeview>
</template>

<script>
import Input from "../../../mixins/input";
import ReferenceInput from "../../../mixins/reference-input";

/**
 * Value editing from a fixed choices. Support multiple and references.
 * If no choices, by default, takes localized enums with source as value from your VueI18n resources locales.
 */
export default {
  mixins: [Input, ReferenceInput],
  props: {
    /**
     * Use different styles: 
     * 
     * | 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
     */
    variant: {
      type: String,
      default: 'outlined',
    },
    lines: {
      type: String,
      default: 'one',
    },
    openAll: {
      type: Boolean,
      default: false,
    },
    opened: {
      type: Array,
      default: [],
    },
    color: {
      type: String,
      default: 'primary',
    },
    selectionType: {
      type: String,
      default: 'leaf',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    returnObject: {
      type: Boolean,
      default: false,
    }
  },
  async created() {
    this.items = await this.fetchChoices();
  },
};
</script>
