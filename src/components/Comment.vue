<template lang="jade">
  li(v-show="comment.text")
    .comhead
      a.toggle(@click="open = !open") {{open ? '[-]' : '[+]'}}
      =" "
      a(:href="'#/user/' + comment.by") {{comment.by}}
      =" "
      | {{comment.time | fromNow}} ago
    p.comment-content(v-show="open") {{{comment.text}}}
    ul.child-comments(v-if="comment.kids", v-show="open")
      comment(v-for="comment in childComments", :comment="comment")
</template>

<style lang="stylus">
@import "../variables.styl"

.comhead
  color $gray
  font-size 11px
  margin-bottom 8px
  a
    color $gray
    &:hover
      text-decoration underline
  .toggle
    margin-right 4px
.comment-content
  margin 0 0 16px 24px
  word-wrap break-word
  code
    white-space pre-wrap
.child-comments
  margin 8px 0 8px 22px
</style>

<script>
import store from '../store'

export default {
  name: 'Comment',
  props: {
    comment: Object
  },
  data () {
    return {
      childComments: [],
      open: true
    }
  },
  created () {
    if (this.comment.kids) {
      store.fetchItems(this.comment.kids).then(comments => {
        this.childComments = comments
      })
    }
  }
}
</script>
