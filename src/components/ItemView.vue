<template lang="jade">
  .item-view(v-show="item")
    item(:item="item")
    ul.poll-options(v-if="pollOptions")
      li(v-for="option in pollOptions")
        p {{option.text}}
        p.subtext {{option.score}} points
    ul.comments(v-if="comments")
      comment(v-for="comment in comments", :comment="comment")
    p(v-show="!comments.length") No comments yet.
</template>

<style lang="stylus">
@import "../variables.styl"

.item-view
  .item
    padding-left 0
    margin-bottom 30px
    .index
      display none
  .poll-options
    margin-left 30px
    margin-bottom 40px
    li
      margin 12px 0
    p
      margin 8px 0
    .subtext
      color $gray
      font-size 11px
</style>

<script>
import store from '../store'
import Item from './Item.vue'
import Comment from './Comment.vue'

export default {
  name: 'ItemView',
  components: {
    Item,
    Comment
  },
  data () {
    return {
      item: {},
      comments: [],
      pollOptions: null
    }
  },
  route: {
    data ({ to }) {
      return store.fetchItem(to.params.id).then(item => ({
        item,
        comments: store.fetchItems(item.kids),
        pollOptions: item.type === 'poll'
          ? store.fetchItems(item.parts)
          : null
      }))
    }
  }
}
</script>
