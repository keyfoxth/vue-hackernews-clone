<template lang="jade">
  .user-view(v-show="user")
    ul
      li
        =" "
        span.label user:
        =" "
        | {{user.id}}
      li
        =" "
        span.label created:
        =" "
        | {{user.created | fromNow}} ago
      li
        =" "
        span.label karma:
        =" "
        | {{user.karma}}
      li
        span.label about:
        .about {{{user.about}}}
    p.links
      a(:href="'https://news.ycombinator.com/submitted?id=' + user.id") submissions
      br
      a(:href="'https://news.ycombinator.com/threads?id=' + user.id") comments
</template>

<style lang="stylus">
@import "../variables.styl"

.user-view
  color $gray
  li
    margin 5px 0
  .label
    display inline-block
    min-width 60px
  .about
    margin-top 1em
  .links a
    text-decoration underline
</style>

<script>
import store from '../store'

export default {
  name: 'UserView',
  data () {
    return {
      user: {}
    }
  },
  route: {
    data ({ to }) {
      return {
        user: store.fetchUser(to.params.id)
      }
    }
  }
}
</script>
