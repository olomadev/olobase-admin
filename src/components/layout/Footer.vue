<template>
  <v-footer>
    <v-row  align="center" no-gutters>
      <v-col
        v-for="(item, i) in menu"
        :key="i"
        class="text-center mb-sm-0"
        cols="auto"
        >
          <a :style="getAStyle()" 
            :href="item.href"
            :to="item.link"
            class="px-3 grey--text text--darken-3"
            :target="item.href ? '_blank' : '_self'"
            v-text="item.text"
          />
      </v-col>
      <v-spacer class="hidden-xs-and-down" />
      <v-col cols="12" sm="auto">
        <div class="font-weight-light pt-sm-0 text-center">
          <!-- @slot Right side information. -->
          <slot></slot>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
/**
 * Default customizable admin VFooter with possibility of corporate related links and infos.
 */
export default {
  props: {
    /**
     * Menu links.
     */
    menu: {
      type: Array,
      default: () => [],
    },
  },
  inject: ['vuetify'],
  methods: {
    getAStyle() {
      let themeColor = this.vuetify.theme.themes.value.defaultTheme.colors.primary;
      return 'color: ' + themeColor + ';';
    }
  }
};
</script>