<template>
  <div class="header">

  </div>
</template>

<script>

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: "myHeader",
  components:{

  },
  data() {
    // 在这里去处理数据相关
    return {

    }
  },
  //监听属性相关
  computed:{
    ...mapGetters(['isLogin', 'userInfo']),
    menuActive () {
      return this.$route.path
    }
  },
  //方法合集
  methods:{
    ...mapMutations([]),
    async getSearchHot (){

    },

  }
}
</script>

<style scoped>

</style>