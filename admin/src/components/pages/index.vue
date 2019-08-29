<template>
  <div class="box">
    <v-header></v-header>
    <div class="main">
      <v-left></v-left>
      <v-right></v-right>
    </div>
  </div>
</template>
<script>
import vHeader from "../views/header";
import vRight from "../views/right";
import vLeft from "../views/left";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    vHeader,
    vLeft,
    vRight
  },
  watch: {},
  computed: {},
  mounted() {},
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .main {
    height: 100%;
    flex: 1;
    display: flex;
    margin-top: 80px;
  }
}
</style>