/**
 * Allow any input to have editable behavior.
 */
export default {
  props: {
    /**
     * Full item resource to be editable.
     */
    item: null,
    /**
     * Mark this field as live-editable.
     * If enabled, the input will send directly a call to the API for live edit on change.
     * Ideal for editable input inside VaDataTable, with combination of `editable` prop for each column.
     */
    editable: Boolean,
  },
  methods: {
    /**
     * Interaction event
     */
    change(event) {
       let value = event.target.value
      /**
       * Triggered on any user input interaction.
       */
      this.$emit("change", value);

      if (this.editable) {

        // Select type support
        // 
        let val = null
        if (typeof value.id != 'undefined') {
            val = value.id
        } else {
            val = value
        }
        /**
         * Quick update model on server
         */
        this.$store.dispatch(`${this.resource}/updateRow`, {
          id: this.item.id,
          data: {
            [this.uniqueFormId]: val,
          },
        });
      }
    },
  },
};
