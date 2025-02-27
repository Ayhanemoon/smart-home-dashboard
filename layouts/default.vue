<template>
  <div class="default-layout">
    <main-header />
    <main-sidebar />
    <main>
      <slot ></slot>
    </main>
    <main-footer />
  </div>
</template>

<script setup>
import MainHeader from '@/components/Organisms/MainHeader.vue';
import MainFooter from '@/components/Organisms/MainFooter.vue';
import MainSidebar from '@/components/Organisms/MainSidebar.vue';
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  background-color: #f8f9fa;
  flex: 1;
}

.sidebar.active + main {
  margin-left: 0;
}
</style>
