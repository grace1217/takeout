<template>
  <div class='ratingselect border-1px'>
    <ul class='rating-type'>
      <li @click='$emit("ratingtype-select",2)' class='block positive' :class='{"active":this.$parent.selectType===2}'>
        {{desc.all}}
        <span class='count'>{{ratings.length}}</span>
      </li>
      <li @click='$emit("ratingtype-select",0)' class='block positive' :class='{"active":this.$parent.selectType===0}'>
        {{desc.positive}}
        <span class='count'>{{positives.length}}</span>
      </li>
      <li @click='$emit("ratingtype-select",1)' class='block negative' :class='{"active":this.$parent.selectType===1}'>
        {{desc.negative}}
        <span class='count'>{{negatives.length}}</span>
      </li>
    </ul>
    <div @click='$emit("onlycontent-toggle")' class='switch border-bottom-1px' :class='{"on":this.$parent.onlyContent}'>
      <span class='icon-check_circle'></span>
      <span class='text'>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>

const POSITIVE = 0
const NEGATIVE = 1

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
  },
  created () {
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus'>
@import '../../assets/stylus/mixin.styl'

.ratingselect
  .rating-type
    padding: 18px 0
    margin: 0 18px
    border-1px(rgba(7, 17, 27, 0.1))
    font-size: 0
    .block
      display: inline-block
      padding: 8px 12px
      margin-right: 8px
      line-height: 16px
      border-radius: 1px
      font-size: 12px
      color: rgb(77, 85, 93)
      &.active
        color: #fff
      .count
        margin-left: 2px
        font-size: 8px
      &.positive
        background: rgba(0, 160, 220, 0.2)
        &.active
          background: rgb(0, 160, 220)
      &.negative
        background: rgba(77, 85, 93, 0.2)
        &.active
         background: rgb(77, 85, 93)
  .switch
    font-size: 24px
    line-height: 24px
    padding: 12px 18px
    border-bottom-1px(rgba(7, 17, 27, 0.1))
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 12px
</style>
