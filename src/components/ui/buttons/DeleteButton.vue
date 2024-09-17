<template>
  <va-action-button
    v-if="visible && !isItMine"
    :hide-label="icon"
    :label="$t('va.actions.delete')"
    icon="mdi-delete-forever"
    icon-size="x-small"
    :color="color || 'red'"
    text
    @click="onDelete"
  ></va-action-button>
</template>

<script>
import Button from "../../../mixins/button";
/**
 * Button for all delete resource action. Comes with confirm dialog.
 * Auto hide if no delete action available unless show prop is active.
 */
export default {
  mixins: [Button],
  inject: [],
  props: {
    /**
     * Redirect to resource list after successful deletion.
     * Default redirect active if current page is resource being deleted.
     */
    redirect: Boolean,
    /**
     * Router queries
     */
    query: Object,
  },
  data() {
    return {
      visible: false,
      user: {
        id: null,
      }
    }
  },
  async created() {
    let user = await this.$store.getModule("auth").checkAuth();
    this.user.id = user.id;
    this.visible = await this.hasAction('delete');
  },
  computed: {
    isItMine() {
      /**
       * User cannot delete own record
       */
      if (this.item 
        && typeof this.item.id != "undefined" 
        && this.item.id
        && this.item.id == this.user.id) {
          return true;
      }
      return false;
    }
  },
  methods: {
    async onDelete() {

      if (!this.item) {
        /**
         * Custom delete action if no item.
         * Used for bulk delete button which has his custom logic.
         */
        this.$emit("delete");
        return;
      }

      if (
        await this.$admin.confirm(
          this.$t("va.confirm.delete_title", {
            resource: this.currentResource.singularName.toLowerCase(),
            id: this.item.id,
          }),
          this.$t("va.confirm.delete_message", {
            resource: this.currentResource.singularName.toLowerCase(),
            id: this.item.id,
          })
        )
      ) {
        
        // we need use await in here otherwise refresh will 
        // not work as we expected
        // 
        let Self = this;

        await this.$store.getModule(this.resource).delete({
          id: this.item.id,
          query: this.query 
        }).then(function(){

            if (Self.redirect) {
              Self.$router.push({ name: `${Self.resource}_list`})
              return
            }
            setTimeout(function(){
              Self.$store.getResource(Self.resource).refresh(); 
            }, 200);
            
            /**
             * Triggered on successful deletion of resource item.
             */
            Self.$emit("deleted")
        });

      }

    },
  },
};
</script>