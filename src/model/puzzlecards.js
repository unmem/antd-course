import uuid from 'uuid/v1'
import axios from 'axios'

const delay = millisecond => {
  return new Promise(resolve => {
    setTimeout(resolve, millisecond)
  })
}

export default {
  namespace: 'puzzlecards',
  state: {
    data: [],
  },
  effects: {
    *queryInitCards(action, sagaEffects) {
      const { call, put } = sagaEffects
      const endPointURI = `/dev/random_joke`

      const { data: puzzles } = yield call(axios, endPointURI)
      yield put({ type: 'addNewCard', payload: puzzles })

      yield call(delay, 200)

      const { data: puzzles2 } = yield call(axios, endPointURI)
      yield put({ type: 'addNewCard', payload: puzzles2 })
    },
  },
  reducers: {
    addNewCard(state, { payload: newCard }) {
      const newCardWithId = { ...newCard, id: uuid() }
      const nextData = [...state.data, newCardWithId]

      return {
        data: nextData,
      }
    },
  },
}
