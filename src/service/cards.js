import axios from 'axios'

export function queryList() {
  return axios('/dev/cards')
}
