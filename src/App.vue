<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <v-tab></v-tab>
    <div class='content'>
    <keep-alive>
      <router-view :seller='seller'></router-view>
    </keep-alive>
    </div>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Tab from './components/Tab/Tab.vue'
import {urlParse} from '../static/js/util.js'

const ERR_OK = 0

export default{
  data () {
    return {
      seller: {
        id: (() => {
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created () {
    this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
      response = response.body
      if (response.errno === ERR_OK) {
        this.seller = Object.assign({}, this.seller, response.data)
      }
    })
  },
  components: {
    'v-header': Header,
    'v-tab': Tab
  }
}
</script>

<style>

</style>
