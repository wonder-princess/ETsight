<template>
  <div id="app">
    <shelf-header />
    <!--<test-firebase />-->
  </div>
</template>

<script>
import ShelfHeader from '@/components/ShelfHeader.vue';
// import TestFirebase from '@/components/TestFirebase.vue';

export default {
  components: { ShelfHeader },
  // components: { TestFirebase },
};

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
