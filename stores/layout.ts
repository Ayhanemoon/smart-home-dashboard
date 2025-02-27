import { defineStore } from "pinia";

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    sidebar: false,
    sidebarMini: false,
    sidebarItems: [
      {
        title: 'Dashboard',
        icon: 'mdi-view-dashboard',
        to: '/dashboard',
      },
      {
        title: 'Users',
        icon: 'mdi-account-group',
        to: '/users',
      },
      {
        title: 'Settings',
        icon: 'mdi-cog',
        to: '/settings',
      },
    ],
  }),
  actions: {
    toggleSidebar() {
      this.sidebar = !this.sidebar;
    },
    setSidebar(value: boolean) {
      this.sidebar = value;
    },
    toggleSidebarMini() {
      this.sidebarMini = !this.sidebarMini;
    },
  },
});