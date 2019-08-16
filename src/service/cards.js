import axios from 'axios'

export function queryList() {
  return axios.get('/dev/cards')
}

export function addOne(data) {
  return axios.post('/dev/cards/add', data, {
    headers: {
      'content-type': 'application/json',
    },
  })
}
