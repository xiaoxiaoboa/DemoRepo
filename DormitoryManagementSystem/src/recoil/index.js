import {atom} from 'recoil'


export const studentState = atom({
  key: 'student',
  default: []
})

export const pageSizeState = atom({
  key:'pagesize',
  default: 6
})

export const openState = atom({
  key:'open',
  default: false
})

export const pendingSubmit = atom({
  key: 'pendingSubmit',
  default: {
    item:[],
    student:[],
    delete:[]
  }
})

export const loginedName = atom({
  key: "loginedName",
  default:''
})