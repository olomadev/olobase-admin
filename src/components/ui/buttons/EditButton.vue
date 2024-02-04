<template>
  <va-action-button
    v-if="item && visible"
    :hide-label="icon"
    :item="item"
    :label="$t('va.actions.edit')"
    icon="mdi-pencil"
    :color="color || 'blue'"
    variant="text"
    exact
    :to="getRoute('edit', { params: { id: item.id } })"
    @click="onClick"
  ></va-action-button>
</template>

<script>
import RedirectButton from "../../../mixins/redirect-button"

/**
 * Button for all edit resource action. Redirect to edit page by default.
 */
export default {
  mixins: [RedirectButton],
  data() {
    return {
      visible: false
    }
  },
  async created() {
    this.visible = await this.canShow('edit')
  },
};
</script>
