<template>
  <el-container id="app" class="container">

    <!--  头部的显示  -->
    <el-header height="80px">
      <my-header></my-header>
    </el-header>

    <!--    主体显示-->
    <el-main>

    </el-main>
  </el-container>
</template>

<script>

import myHeader from './components/common/header.vue'

export default {
  name: 'App',
  components: {
    myHeader,
  },
  computed:{

  },
  methods:{

  }
}
</script>
<style scoped>
.container {
  height: 100%;
}
.layout {
  min-height: calc(100vh - 80px - 40px);
}
</style>