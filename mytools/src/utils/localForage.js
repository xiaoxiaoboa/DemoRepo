import Dexie from 'dexie'

export const db = new Dexie('MyTools')

db.version(2).stores({
  items: "&id, item",
  time:"&id, time"
})