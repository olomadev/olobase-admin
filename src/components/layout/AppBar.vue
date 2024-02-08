<template>
  <div>
    <v-app-bar 
    :clipped-left="lgAndUp"
    :clipped-right="lgAndUp"
    app
    :density="density"
    :color="color"
    :flat="flat"
    >
      <!--
        Triggered on VAppBar icon click, use it for VaSidebar toggling or minimizing.
        @event toggle
      -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="ml-0 mt-1 pl-1" style="width: 274px">
        <!-- Logo image/svg content or any txt -->
        <slot name="logo"></slot>
        <!-- <span class="hidden-sm-and-down"> {{ title || $admin.title }}</span>-->
      </v-toolbar-title>
      <v-row v-if="headerMenu.length && lgAndUp">
        <v-col
          v-for="(item, i) in headerMenu"
          :key="i"
          class="text-center mb-sm-0 mb-5"
          cols="auto"
        >
          <component
            :is="item.href ? 'a' : 'router-link'"
            :href="item.href"
            :to="item.link"
            class="px-3 white--text link"
            :target="item.href ? '_blank' : '_self'"
            v-text="item.text"
          ></component>
        </v-col>
      </v-row>
      <v-spacer />
      <div>
        <v-btn
          v-if="!disableReload && isRouteList"
          icon
          small
          class="ml-1"
          :loading="$store.state.api.loading"
          @click="refresh"
        >
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        
        <v-menu offset-y v-if="$store.state.auth.user">

          <template v-slot:activator="{ props }">
            <v-btn icon small class="ml-1" v-bind="props">
              <v-avatar v-if="avatarExists" size="24px">
                <v-img 
                  :src="getAvatar"
                  alt="Avatar"
                ></v-img>
              </v-avatar>
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-list nav>
              <template v-if="getFirstName">
                <v-list-item 
                  :prepend-avatar="getAvatar"
                >
                  <div class="list-item-content">
                    <v-list-item-title class="title">{{ getFirstName }} {{ getLastName }}</v-list-item-title>
                    <v-list-item-subtitle v-if="getEmail">{{
                      getEmail
                    }}</v-list-item-subtitle>
                  </div>
                </v-list-item>
                <v-divider></v-divider>
              </template>
              <v-card flat>
                <v-card-text style="padding:9px">
                <v-list-item
                  v-for="(item, index) in profileMenu"
                  :key="index"
                  link
                  :to="item.link"
                  class=" mt-2"
                >
                  <template v-slot:prepend>
                    <v-icon>{{ item.icon }}</v-icon>
                  </template>
                  <v-list-item-title>{{ item.text }}</v-list-item-title>
                </v-list-item>

                <v-list-item :to="{ name: `account` }">
                  <template v-slot:prepend>
                    <v-icon>mdi-account</v-icon>
                  </template>
                  <v-list-item-title>{{ $t("va.account") }}</v-list-item-title>
                </v-list-item>

                <v-list-item :to="{ name: `password` }">
                  <template v-slot:prepend>
                    <v-icon>mdi-key-variant</v-icon>
                  </template>
                  <v-list-item-title>{{ $t("va.changePassword") }}</v-list-item-title>
                </v-list-item>

                <v-list-item @click="logout()">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>{{ $t("va.logout") }}</v-list-item-title>
                </v-list-item>
                </v-card-text>
              </v-card>
            </v-list>
          </v-card>
        </v-menu>

      </div>
    </v-app-bar>

    <v-navigation-drawer
      :color="sidebarColor"
      v-model="drawer"
    >
      <!--
        Apply a specific background image to the component.
      <template v-slot:img="props">
        <slot name="img" v-bind="props"></slot>
      </template> -->

      <template v-slot:prepend>
        <div class="mt-2"></div>
      </template>

      <v-list v-if="Array.isArray(sidebarMenu)">
        <template v-for="(item, index) in sidebarMenu.filter((l) => l)">
          <v-list-subheader v-if="item.heading" :key="'header_' + index">
            {{ item.heading }}
          </v-list-subheader>

          <v-divider v-else-if="item.divider" :key="'divider_' + index"></v-divider>

          <v-list-group
            v-else-if="item.children && item.children.length"
            :key="'vlist_' + index"
            :value="item.expanded"
            :prepend-icon="item.icon"
            append-icon="mdi-chevron-up"
          >
            <template v-slot:activator="{ props }">
              <v-list-item
                :color="color"
                v-bind="props"
                :title="item.text"
              ></v-list-item>
            </template>
            <v-list-item
              :color="color" 
              v-for="(child, i) in item.children"
              :key="'vlist-item_' + i"
              link
              :to="child.link"
              >
                <v-list-item-action v-if="child.icon">
                  <!-- <v-icon>{{ child.icon }}</v-icon> -->
                </v-list-item-action>
                <div class="list-item-content">
                  <v-list-item-title>
                    <div v-if="child.href">
                      <a :href="child.href" target="_blank" style="text-decoration: none;">{{ child.text }}</a>
                    </div>
                    <div v-else>
                      {{ child.text }}
                    </div>
                  </v-list-item-title>
                </div>
            </v-list-item>
          </v-list-group>

          <v-list-item 
            :color="color" 
            v-else-if="item.text" 
            :key="index" 
            link 
            :to="item.link"
          >
            <template v-slot:prepend>
              <v-icon>{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>

        </template>
      </v-list>
    </v-navigation-drawer>

  </div>
</template>

<script>
import nav from "@/_nav";
import isEmpty from "lodash/isEmpty"
import { useDisplay } from 'vuetify';
/**
 * Default customizable admin VAppBar.
 * Contains main app title, header menus, direct resource creation links, global refresh action, profile menu.
 * Profile user dropdown will not appear on guest mode.
 */
export default {
  inject: ["admin"],
  setup () {
    // Destructure only the keys we want to use
    const { lgAndUp } = useDisplay()
    return { lgAndUp }
  },
  props: {
    /**
     * Replace default admin app title set on OlabaseAdmin constructor.
     */
    title: String,
    /**
     * Header links visible on left side.
     */
    headerMenu: {
      type: Array,
      default: () => [],
    },
    /**
     * Profile related links, visible inside authenticated dropdown menu.
     */
    profileMenu: {
      type: Array,
      default: () => [],
    },
    /**
     * Disable create menu.
     */
    disableCreate: Boolean,
    /**
     * Disable reload state button.
     */
    disableReload: Boolean,
    /**
     * Density option: compact etc..
     */
    density: {
      type: String,
      default: "compact",
    },
    /**
     * Color for the VAppBar.
     */
    color: {
      type: String,
      default: "primary",
    },
    /**
     * Removes app var shadow.
     */
    flat: false,
    /**
     * Main color of VNavigationDrawer.
     */
    sidebarColor: {
      type: String,
      default: "white",
    }
  },
  watch: {
    drawer(val) {
      this.$store.commit('api/setToggleDrawer', val)
    },
  },
  data() {
    return {
      drawer: true,
      sidebarMenu: null,
    }
  },
  async created() {
    /**
     * Get default avatar image
     */
    this.defaultAvatar = this.admin.getConfig().avatar.base64;
    /**
     * Build dynamic sidebar menu
     */
    this.sidebarMenu = await nav.build(this.$t, this.admin);
  },
  computed: {
    getFirstName() {
      return this.$store.getters["auth/getFirstName"];
    },
    getLastName() {
      return this.$store.getters["auth/getLastName"];
    },
    getEmail() {
      return this.$store.getters["auth/getEmail"];
    },
    getAvatar() {
      let base64AvatarImage = this.$store.getters["auth/getAvatar"];
      if (base64AvatarImage == "null" || isEmpty(base64AvatarImage)) { // default avatar image
        base64AvatarImage = this.defaultAvatar;
      }
      return "data:image/png;base64," + base64AvatarImage;
    },
    avatarExists() {
      let avatar = this.$store.getters["auth/getAvatar"];
      if (! avatar || avatar == "null") {
        return false;
      }
      return true;
    },
    isRouteList() {
      if (typeof this.$route.meta.resource == 'undefined') {
        return false
      }
      let strArray = this.$route.name.split("_"); // check the current route is list
      if (Array.isArray(strArray) && strArray.length > 0) {
        let lastItem = strArray[strArray.length - 1]
        if (lastItem.trim() == "list") {
          return true
        }
      }
      return false
    },
  },
  methods: {
    refresh() {
      if (typeof this.$route.meta.resource !== 'undefined') {
        this.$store.dispatch("api/refresh", `${this.$route.meta.resource}`);  
      }
    },
    logout() {
      this.$store.dispatch("auth/logout");
    },
  },
};
</script>

<style scoped>
.link {
  font-size: 0.825rem;
  font-weight: 500;
  text-decoration: none;
}
</style>
