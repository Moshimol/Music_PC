<template>
  <div class="header">
    <div class="w1200">
      <el-row class="wrapper">
        <el-col :span="4">
          <router-link to="/" class="logo"><img src="../../assets/logo.jpg" alt=""></router-link>
        </el-col>

        <el-col :span="12">
          <ul class="nav">
<!--            <li :class="[menuActive.indexOf(item.path) === 0 ? 'is-active' : '']" v-for="item in menuList" :key="item.path" @click="selectMenu(item.path)"><span>{{item.name}}</span></li>-->
          </ul>
        </el-col>

        <el-col :span="6">
          <span class="search">
            <el-popover ref="popcover" width="200" placement="botton-end" trigger="manual" v-model="isShowSearch" @click="handleClose">
              <el-input
                  class="keyVal"
                  slot="reference"
                  placeholder="请输入歌名、歌词、歌手或专辑"
                  v-model="keyVal"
                  @focus="handleFocus"
                  @input="handleInput"
                  clearable>
              </el-input>
            </el-popover>
          </span>
        </el-col>

      </el-row>
    </div>
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
      curIndex: '0',
      keyVal: '',
      logined: true,
      profile: {},
      serachHot: [],
      suggestInfo: {},
      listType: {
        songs: '单曲',
        artists: '歌手',
        albums: '专辑',
        playlists: '歌单'
      },
      menuList: [{
        name: '首页',
        path: '/index'
      }, {
        name: '排行榜',
        path: '/index'
      }, {
        name: '歌单',
        path: '/index'
      }, {
        name: 'MV',
        path: '/index'
      }, {
        name: '歌手',
        path: '/index'
      }, {
        name: '我的音乐',
        path: '/index'
      }],
      isShowSearch: false
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
    ...mapMutations(['setLogin', 'setUserInfo', 'setLoginDialog']),
    async getSearchHot () {
      const { data: res } = await this.$http.serachHot()

      if (res.code !== 200) {
        return this.$msg.error('数据请求失败')
      }

      this.serachHot = res.result.hots
    },
    async getSerachSuggest () {
      const { data: res } = await this.$http.serachSuggest({ keywords: this.keyVal })

      if (res.code !== 200) {
        return this.$msg.error('数据请求失败')
      }

      this.suggestInfo = res.result
    },
    async logout () {
      const { data: res } = await this.$http.logout()

      if (res.code !== 200) {
        return this.$msg.error('数据请求失败')
      }

      this.$msg.success('退出成功')
      window.sessionStorage.removeItem('isLogin')
      window.sessionStorage.removeItem('token')
      window.sessionStorage.removeItem('cookie')
      window.sessionStorage.removeItem('userInfo')
      this.setLogin(false)
      this.setUserInfo()

      if (this.$route.path.indexOf('/my') >= 0) {
        this.$router.push({ path: '/' })
      }
    },
    loginDialog () {
      this.setLoginDialog(true)
    },
    // 顶部头像下拉菜单
    userMenuHandler (type) {
      switch (type) {
        case 'home' :
          this.$router.push({
            name: 'homePage'
          })
          break
        case 'grade' :
          this.$router.push({
            name: 'grade'
          })
          break
        case 'set':
          this.$router.push({
            name: 'setting'
          })
          break
        case 'quit':
          this.logout()
          break
      }
    },
    // 默认热门搜索列表，点击后台跳转到搜索结果页面
    jumpSearch (item) {
      this.isShowSearch = false
      this.keyVal = item.first
      if (item.first === this.$route.query.key) {
        return
      }
      this.$router.push({ path: '/search', query: { key: item.first } })
    },
    // 搜索建议列表，点击后跳转到相对应的落地页
    jumpPage (item, type) {
      this.keyVal = item.name
      switch (type) {
        case 'songs':
          this.$router.push({ path: '/song', query: { id: item.id } })
          break
        case 'artists':
          this.$router.push({ path: '/singer', query: { id: item.id } })
          break
        case 'albums':
          this.$router.push({ path: '/album', query: { id: item.id } })
          break
        case 'playlists':
          this.$router.push({ path: '/playlist/detail', query: { id: item.id } })
          break
      }
      this.isShowSearch = false
    },
    showSearch () {
      // 显示搜索列表 若有关键词显示搜索建议，否则显示默认热门搜索列表
      if (!this.keyVal) {
        this.serachHot = []
        this.getSearchHot()
      } else {
        this.suggestInfo = {}
        this.getSerachSuggest()
      }
    },
    search () {
      // 点击搜索关键词，跳转到搜索结果页面
      if (this.keyVal) {
        this.$router.push({ path: '/search', query: { key: this.keyVal } })
        this.isShowSearch = false
      }
    },
    handleInput () {
      if (this.keyVal) {
        this.showSearch()
        this.isShowSearch = true
      } else {
        this.isShowSearch = false
      }
    },
    handleFocus () {
      this.showSearch()
      this.isShowSearch = true
    },
    handleClose () {
      this.isShowSearch = false
    },
    selectMenu (item) {
      if (this.isLogin || item.indexOf('/my') < 0) {
        this.$router.push({
          path: item
        })
      } else {
        this.loginDialog()
      }
    }

  }
}
</script>

<style scoped lang="less">
.header {
  position: relative;
  z-index: 2;
  font-size: 0;
  box-shadow: 0 2px 10px 0 rgba(52,52,52,.1);
  background: #fff;
}

.wrapper {
  display: flex;
  align-items: center;
}

.logo {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  padding: 10px 0;
}

.nav {
  border: 0;
  font-size: 0;

  li {
    display: inline-block;
    padding: 0;
    height: 80px;
    line-height: 80px;
    color: #909399;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .is-active {
    border-bottom: 2px solid @color-theme;
    color: #303133;
  }

  span {
    padding: 0 20px;
    display: block;
    font-size: 14px;
    text-decoration: none;
  }
}
.search {
  position: relative;
  display: block;
  text-align: right;

  .keyVal {
    width: 226px;
    line-height: 32px;
    border: 0;
    border-bottom: 1px solid #999;

    /deep/input {
      padding: 0;
      border: none;
    }
  }

  .icon-search {
    font-size: 20px;
    margin: 5px 0 5px 10px;
    cursor: pointer;
  }
}
.hot-search {
  h5 {
    font-size: 18px;
  }

  .hot-search-list {
    padding: 10px 0;
  }
  .hot-item {
    line-height: 28px;
    cursor: pointer;

    .top-0 {
      font-weight: bold;
      color: rgba(255, 0, 0, 1);
    }

    .top-1 {
      font-weight: bold;
      color: rgba(255, 0, 0, .6);
    }

    .top-2 {
      font-weight: bold;
      color: rgba(255, 0, 0, .4);
    }

    img {
      display: inline-block;
      width: auto;
      height: 16px;
      padding: 6px 0;
      vertical-align: top;
    }
  }
}
.search-item {
  border-top: solid 1px #f2f2f2;
  margin: -1px -12px 0;

  h6 {
    font-size: 14px;
    line-height: 36px;
    color: #666;
    padding: 0 12px;
  }

  .list {
    line-height: 36px;
    color: #999;
    padding: 0 12px 0 40px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover {
      color: #fff;
      background: @color-theme;
    }
  }

  &:first-child {
    border: 0;
  }
}
.user-avatar {
  text-align: center;

  .avatar {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
    cursor: pointer;
  }

  .el-dropdown {
    padding: 20px 0;
    font-size: 0;
  }
}
.login {
  text-align: center;

  .login-btn {
    font-size: 16px;
    cursor: pointer;
  }
}

</style>