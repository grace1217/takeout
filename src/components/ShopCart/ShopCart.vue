<template>
<div class='shopcart'>
  <div class='cart'>
    <div class='content' @click='toggleList'>
      <div class='content-left'>
        <div class='logo-wrapper'>
          <div class='logo' :class='{highlight:totalCount>0}'>
            <span class='icon-shopping_cart' :class='{highlight:totalCount>0}'></span>
          </div>
          <div class='num' v-show='totalCount>0'>{{totalCount}}</div>
        </div>
        <div class='price' :class='{highlight:totalPrice>0}'>
          &yen;{{totalPrice}}元
        </div>
        <div class='desc'>
          另需配送费&yen;{{deliveryPrice}}元
        </div>
      </div>
      <div class='content-right' @click.stop.prevent='pay'>
        <div class='pay' :class='payClass'>
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class='ball-container'>
      <transition name='drop' v-on:before-enter="beforeEnter" v-on:enter="enter"
      v-on:after-enter="afterEnter" v-for='(ball,index) in balls' :key='index'>
        <div v-show='ball.show' class='ball'>
          <div class='inner inner-hook'></div>
        </div>
      </transition>
    </div>
    <transition name='fold'>
    <div class='shopcart-list' v-show='!listShow'>
      <div class='list-header border-bottom-1px'>
        <h1 class='title'>购物车</h1>
        <span class='empty' @click='empty'>清空</span>
      </div>
      <div class='list-content' ref='listContent'>
        <ul>
          <li class='food border-1px' v-for='(food,index) in selectFoods' :key='index'>
            <span class='name'>{{food.name}}</span>
            <div class='price'>
              <span>&yen;{{food.price*food.count}}</span>
            </div>
            <div class='cartcontrol-wrapper'>
              <v-cartcontrol :food='food'></v-cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </transition>
  </div>
  <transition name='fade'>
    <div class='list-mask' v-show='!listShow' @click='hideList'>
    </div>
  </transition>
</div>
</template>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../assets/stylus/mixin.styl'

.cart
  position: fixed
  bottom: 0
  left: 0
  z-index: 50
  width: 100%
  height: 48px
  .content
    display: flex
    background: #141d27
    font-size: 0
    color: rgba(255, 255, 255, 0.4)
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        position: relative
        top: -10px
        margin: 0 12px
        padding: 6px
        width: 56px
        height: 56px
        box-sizing: border-box
        vertical-align: top
        border-radius: 50%
        background: #141d27
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: #2b343c
          &.highlight
            background: rgb(0, 160, 220)
          .icon-shopping_cart
            font-size: 24px
            color: #80858a
            line-height: 44px
            &.highlight
              color: #fff
        .num
          position: absolute
          top: 0
          right: 0
          width: 24px
          height: 16px
          line-height: 16px
          text-align: center
          border-radius: 16px
          font-size: 9px
          font-weight: 700
          color: #fff
          background: rgb(240, 20, 20)
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        padding-right: 12px
        box-sizing: border-box
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        font-size: 16px
        font-weight: 700
        line-height: 24px
        &.highlight
          color: #fff
      .desc
        display: inline-block
        vertical-align: top
        margin: 12px 0 0 12px
        font-size: 10px
        line-height: 24px
    .content-right
      flex: 0 0 105px
      width: 105px
      .pay
        height: 48px
        line-height: 48px
        text-align: center
        font-size: 12px
        font-weight: 700
        &.not-enough
          background: #2b333b
        &.enough
          background: #00b43c
          color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 200
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: rgb(0, 160, 220)
  .shopcart-list
    position: absolute
    left: 0
    bottom: 48px;
    z-index: -1
    width: 100%
    background: #fff
    &.fold-enter-active, &.fold-leave-active
      transform: translateY(0)
      transition: all .3s
    &.fold-enter, &.fold-leave-to
      transform: translateY(100%)
      transition: all .3s
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom-1px(rgba(7, 17, 27, 0.1))
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          line-height: 24px
          font-size: 14px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
.list-mask
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 40
  background: rgba(7, 17, 27, 0.6)
  backdrop-filter：blur(10px)
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
  &.fade-enter, &.fade-leave-to
    transition: all 0.5s
    opacity: 0
    background: rgba(7, 17, 27, 0)
</style>

<script>
import BScroll from 'better-scroll'
import CartControl from '../CartControl/CartControl.vue'

export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `¥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        return `还差¥${this.minPrice - this.totalPrice}元起送`
      } else {
        return `去结算`
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    },
    listShow: {
      get: function () {
        return this.fold
      },
      set: function () {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        return show
      }
    }
  },
  methods: {
    _initScroll: function () {
      this.listScroll = new BScroll(this.$refs.listContent, {
        click: true
      })
    },
    drop (el) {
      let ball
      for (let i = 0; i < this.balls.length; i++) {
        ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter: function (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let left = rect.left - 32
          let top = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${top}px, 0)`
          el.style.transform = `translate3d(0, ${top}px ,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${left}px, 0, 0)`
          inner.style.transform = `translate3d(${left}px, 0, 0)`
        }
      }
    },
    enter: function (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
      done()
    },
    afterEnter: function (el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
      if (!this.fold) {
        this.$nextTick(() => {
          this._initScroll()
        })
      }
    },
    empty () {
      this.selectFoods.forEach((food) => {
        food.count = 0
        this.fold = true
      })
    },
    hideList () {
      this.fold = true
    },
    pay () {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}`)
    }
  },
  components: {
    'v-cartcontrol': CartControl
  }
}
</script>
