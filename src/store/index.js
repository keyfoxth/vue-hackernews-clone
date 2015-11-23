import Firebase from 'firebase'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'

const api = new Firebase('https://hacker-news.firebaseio.com/v0')
const itemsCache = Object.create(null)
const store = new EventEmitter()
const storiesPerPage = store.storiesPerPage = 30

let topStoryIds = []

export default store

api.child('topstories').on('value', snapshot => {
  topStoryIds = snapshot.val()
  store.emit('topstories-updated')
})

store.fetchItem = id => {
  return new Promise((resolve, reject) => {
    if (itemsCache[id]) {
      resolve(itemsCache[id])
    } else {
      api.child('item/' + id).once('value', snapshot => {
        const story = itemsCache[id] = snapshot.val()
        resolve(story)
      }, reject)
    }
  })
}

store.fecthItems = ids => {
  if (!ids || !ids.length) {
    return Promise.resolve([])
  } else {
    return Promise.all(ids.map(id => store.fecthItems(id)))
  }
}

store.fechItemsByPage = page => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  const ids = topStoryIds.slice(start, end)
  return store.fetchItems(ids)
}

store.fetchUser = id => {
  return new Promise((resolve, reject) => {
    api.child('user/' + id).once('value', snapshot => {
      resolve(snapshot.val())
    }, reject)
  })
}
