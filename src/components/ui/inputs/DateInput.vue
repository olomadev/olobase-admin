<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-for="(_, scopedSlotName) in $slots" v-slot:[scopedSlotName]="slotData">
        <slot :name="scopedSlotName" v-bind="slotData" />
      </template>
      <template v-slot:activator="{ props }">
        <v-text-field
          density="compact"
          v-bind="{ ...props, ...commonProps }"
          :modelValue="dateFormatted"
          :variant="variant"
          :readonly="true"
          append-inner-icon="mdi-calendar"
          @click:clear="cleanInput"
          @change="change"
          @keyup="onKeyUp"
        ></v-text-field>
      </template>
     <v-locale-provider :locale="getLocale">
      <v-date-picker
        :elevation="elevation"
        :header="header"
        :hide-header="hideHeader"
        :color="color"
        :allowed-dates="allowedDates"
        :height="height"
        :width="width"
        :max="max"
        :maxHeight="maxHeight"
        :maxWidth="maxWidth"
        :min="min"
        :minHeight="minHeight"
        :minWidth="minWidth"
        :multiple="multiple"
        :position="position"
        :rounded="rounded"
        :showAdjacentMonths="showAdjacentMonths"
        :showWeek="showWeek"
        :title="$t('va.datepicker.title')"
        :hide-actions="hideActions"
        :hide-weekdays="hideWeekdays"
        :input-placeholder="inputPlaceholder"
        :variant="variant"
        :viewMode="viewMode"
        :disabled="disabled"
        :landscape="landscape"
        :modelValue="getDate"
        @update:modelValue="updateDate"
        @change="change"
        :cancel-text="$t('va.datepicker.cancel')"
        :ok-text="$t('va.datepicker.select')"
      ></v-date-picker>
      </v-locale-provider>
    </v-menu>
  </div>
</template>

<script>
import config from "@/_config";
import Input from "../../../mixins/input";

/**
 * Use for date type value editing. Is composed of a readonly textfield associated to a vuetify datepicker.
 * Do not support time, use classic VaTextInput in that case.
 */
export default {
  mixins: [Input],
  inject: ['i18n'],
  props: {
    /**
     * Sets a text under date tile
     */
    header: {
      type: String,
      default() {
        return ""
      },
    },
    /**
     * Sets main color of date picker
     */
    color: {
      type: String,
      default() {
        return "primary"
      },
    },
    /**
     * Sets elevation
     */
    elevation: [String, Number],
    /**
     * Restricts which dates can be selected.
     * @type Function|Array
     */
    allowedDates: {
      type: [Function, Array],
      default() {
        return null
      },
    },
    /**
     * Exact height
     */
    height: [String, Number],
    /**
     * Exact width
     */
    width: {
      type: [String, Number],
      default() {
        return 375;
      },
    },
    /**
     * Max allowed date/month (ISO 8601 format)
     */
    max: [String, Number, Date],
    /**
     * Sets the maximum height for the component
     */
    maxHeight: [String, Number],
    /**
     * Sets the maximum width for the component
     */
    maxWidth: [String, Number],
    /**
     * Minimum allowed date/month (ISO 8601 format)
     */
    min: [String, Number, Date],
    /**
     * Sets the minumum height for the component
     */
    minHeight: [String, Number],
    /**
     * Sets the minumum width for the component
     */
    minWidth: [String, Number],
    /**
     * Allow the selection of multiple dates.
     */
    multiple: Boolean,
    /**
     * Sets the position for the component
     */
    position: String,
    /**
     * Designates the border-radius applied to the component
     */
    rounded: [String, Number, Boolean],
    /**
     * Toggles visibility of days from previous and next months
     */
    showAdjacentMonths: Boolean,
    /**
     * Toggles visibility of the week numbers in the body of the calendar
     */
    showWeek: Boolean,
    /**
     * Hide header
     */
    hideHeader: {
      type: Boolean,
      default() {
        return false;
      },
    },
    /**
     * Hide actions
     */
    hideActions: Boolean,
    /**
     * Hide weekdays
     */
    hideWeekdays: Boolean,
    /**
     * Input placeholder
     */
    inputPlaceholder: String,
    /**
     * Use different styles: 
     * 
     * | 'outlined' | 'plain' | 'underlined' | 'filled' | 'solo' | 'solo-inverted' | 'solo-filled'
     */
    variant: {
      type: String,
      default: "outlined",
    },
    /**
     * Month / year
     */
    viewMode: String,
    /**
     * disabled
     */
    disabled: Boolean,
    /**
     * landscape
     */
    landscape: Boolean,
    /**
     * Date on ISO format to be edited.
     * @model
     */
    value: {
      type: String,
      default() {
        return "" // this.$d(new Date(), this.format)
      },
    }
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    getLocale() {
      return this.i18n.global.locale.value;
    },
    getDate() {
      /**
       * Return ISO 8601
       */
      let date = this.input ? new Date(this.input) : new Date();
      return date;
    },
    dateFormatted() {
      if (this.input) {
        return [this.formatDateForDisplay(this.input)]
      }
      return;
    }
  },
  methods: {
    cleanInput(){
      this.input = null;
      this.update(null);
    },
    onKeyUp(event) {
      if (! event.target.value) {
        this.cleanInput();
      }
    },
    /**
     * date format
     * 
     * https://stackoverflow.com/questions/75592703/v-date-picker-date-format-to-dd-mm-yyyy-vuetify
     */
    formatDateForDisplay(val) {
      const date = new Date(val);
      let month = 1 + date.getMonth();
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      let year = date.getFullYear();
      const dateFormat = config.i18n.datePickerFormat;
      switch (dateFormat) {
        case 'dd-mm-YYYY':
          return `${day}-${month}-${year}`;
          break;
        case 'mm-dd-YYYY':
          return `${month}-${day}-${year}`;
          break;
        case 'YYYY-mm-dd':
          return `${year}-${month}-${day}`;
          break;
        case 'YYYY-dd-mm':
          return `${year}-${day}-${month}`;
          break;
        default:
          return `${day}-${month}-${year}`;
      }
    },
    formatDateForDatabase(val) {
      const date = new Date(val);
      let month = 1 + date.getMonth();
      if (month < 10) {
        month = `0${month}`;
      }
      let day = date.getDate();
      if (day < 10) {
        day = `0${day}`;
      }
      return `${date.getFullYear()}-${month}-${day}`;
    },
    updateDate(val) {
      this.menu = false;
      this.update(this.formatDateForDatabase(val));
    },
  },
};
</script>
