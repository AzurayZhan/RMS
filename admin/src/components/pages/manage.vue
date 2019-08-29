<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  methods: {},
  components: {},
  watch: {},
  computed: {},
  mounted() {
    
  },
  beforeRouteEnter (to, from, next) {
  var isAdmin=localStorage.getItem("isAdmin")
    if(isAdmin==0){
      next()
    }else{
      next("/index")
    }
  }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/index.styl';
</style>