import * as cardsService from '../service/cards'

export default {
  namespace: 'cards',

  state: {
    cardsList: [],
    statistic: {},
  },

  effects: {
    *queryList({ _ }, { call, put }) {
      const rsp = yield call(cardsService.queryList)
      const { data } = rsp
      yield put({ type: 'saveList', payload: { cardsList: data.result } })
    },
    *addOne({ payload }, { call, put }) {
      yield call(cardsService.addOne, payload)
      yield put({ type: 'queryList' })
    },
    *getStatistic({ payload: id }, { call, put }) {
      const rsp = yield call(cardsService.getStatistic, id)
      const { data } = rsp

      yield put({
        type: 'saveStatistic',
        payload: { id, statistic: data.result },
      })
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
    saveStatistic(
      state,
      {
        payload: { id, statistic },
      }
    ) {
      return {
        ...state,
        statistic: {
          ...state.statistic,
          [id]: statistic,
        },
      }
    },
  },
}
