<template>
  <div class="right">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  components: {},
  watch: {},
  computed: {},
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';

.right {
  flex: 1;
  // width: 100%;
  height 100%
  overflow-y auto 
  background: $primayr-color;
  background: url("../../assets/images/bg2.jpg")
  background-size 100% 100%
  margin-left 180px
  padding-bottom 30px
}
</style>