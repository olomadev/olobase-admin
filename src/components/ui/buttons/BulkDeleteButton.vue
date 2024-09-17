<template>
  <va-delete-button
    :resource="listState.resource"
    @delete="onBulkDelete"
  ></va-delete-button>
</template>

<script>
/**
 * Button for delete bulk actions for VaList. Shown after items selections.
 * Keep all VaDeleteButton feature and use `deleteMany` data provider method under the hood.
 */
export default {
  inject: {
    admin: { default: undefined },
    listState: { default: undefined },
  },
  props: {
    /**
     * Selected resources items.
     */
    value: Array,
  },
  computed: {
    currentResource() {
      return this.$admin.getResource(this.listState.resource);
    },
  },
  methods: {
    async onBulkDelete() {
      let value = this.value;

      let confirm = await this.$admin.confirm(
          this.$t("va.confirm.delete_many_title", {
            resource: this.currentResource.getName(value.length).toLowerCase(),
            count: value.length,
          }),
          this.$t("va.confirm.delete_many_message", {
            resource: this.currentResource.getName(value.length).toLowerCase(),
            count: value.length,
          })
        );
    
      if (confirm) {
        let Self = this;

        await this.$store.getResource(this.listState.resource).deleteMany({
          ids: value, // value.map(({ id }) => id)
        }).then(function(){
          /**
           * Cleanup selected elements
           */
          Self.$emit("input", []);
          Self.listState.selected = [];
          Self.$store.getResource(Self.listState.resource).refresh();
        });
      }
    },
  },
};
</script>
