<template>
  <component
    :is="taggable ? 'v-combobox' : 'v-autocomplete'"
    :density="density"
    v-bind="commonProps"
    :variant="variant"
    :multiple="multiple"
    :chips="chips"
    closable-chips
    :loading="loading"
    :item-title="getItemText"
    item-value="id"
    :items="items || choices"
    @update:search="asyncSearch"
    @update:modelValue="update"
    :clearable="clearable"
    return-object
  >
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props">
        <template v-if="appendLogo?.field && item.raw[appendLogo.field]" #prepend>
          <v-avatar class="me-2" size="32">
            <img
              :src="appendLogo.base64
                ? item.raw[appendLogo.field]
                : `${appendLogo.baseUrl}/${item.raw[appendLogo.field]}`"
              alt="logo"
            />
          </v-avatar>
        </template>
      </v-list-item>
    </template>

<!--     <template v-slot:selection="{ item }">
      {{ item.name }}
    </template> -->

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
    
  </component>
</template>
<!-- https://blog.devgenius.io/vuetify-customize-autocomplete-c298033784d2 -->
<!-- https://codepen.io/cenozoic/pen/xxbBOYj -->
<script>
import Input from "../../../mixins/input";
import Multiple from "../../../mixins/multiple";
import ReferenceInput from "../../../mixins/reference-input";

/**
 * Value editing from a searchable choices. Support multiple and references.
 * Allows searching of linked resources from your API.
 */
export default {
  mixins: [Input, Multiple, ReferenceInput],
  props: {
    /**
     * Enable/disable current - selected item queries
     */
    loadCurrentItems: true,
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
    /**
     * Minimum characters to tap before search query launch.
     */
    minChars: {
      type: Number,
      default: 3,
    },
    /**
     * Name of request query for searching into your API.
     */
    searchQuery: {
      type: String,
      default: "q",
    },
    /**
     * Enable taggable mode. Transform autocomplete into combobox.
     */
    taggable: Boolean,
    /**
     * Use different styles: 
     * 
     * | 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
     */
    variant: {
      type: String,
      default: "outlined",
    },
  },
  data() {
    return {
      search: null
    };
  },
  methods: {
    async loadCurrentChoices(value) {
      if (this.reference && value) {
        this.items = await this.fetchCurrentChoices(
          this.multiple ? value : [value]
        );
      }
    },
    async asyncSearch(str) {
      this.search = str;
    }
  },
  watch: {
    input: {
      handler(newVal) {
        if (this.loadCurrentItems) {
          /**
           * Fetch full object as soon as we get input value
           */
          this.loadCurrentChoices(newVal);
        }
      },
      immediate: true,
    },
    async search(val, old) {
      if (old === null) {
        return;
      }
      if (!val || val.length < this.minChars) {
        return;
      }
      this.items = [
        // ...(this.items || []), // don't repeat same values
        ...((await this.fetchChoices(val)) || []),
      ];
    },

  },
};
</script>
