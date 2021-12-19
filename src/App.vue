<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view />
  </div>
</template>
<script>
import sidebar from "./components/SideBar";
export default {
  components: {
    sidebar,
  },
};
</script>