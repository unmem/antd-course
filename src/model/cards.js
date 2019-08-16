import * as cardsService from '../service/cards'

export default {
  namespace: 'cards',

  state: {
    cardsList: [],
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(cardsService.queryList)
      console.log('queryList')
      console.log(rsp)
      yield put({ type: 'saveList', payload: { cardsList: rsp.data.result } })
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
