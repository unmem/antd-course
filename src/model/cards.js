import * as cardsService from '../service/cards'

export default {
  namespace: 'cards',

  state: {
    cardsList: [],
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(cardsService.queryList)
      const { data } = rsp

      console.log('queryList')
      console.log(rsp)
      yield put({ type: 'saveList', payload: { cardsList: data.result } })
    },
    *addOne({ payload }, { call, put }) {
      yield call(cardsService.addOne, payload)
      yield put({ type: 'queryList' })
    },
  },

  reducers: {
    saveList(
      state,
      {
        payload: { cardsList },
      }
    ) {
      return {
        ...state,
        cardsList,
      }
    },
  },
}
