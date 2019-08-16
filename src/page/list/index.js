import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'

const namespace = 'cards'

const getCardList = state => state[namespace].cardsList
// https://github.com/dvajs/dva/tree/master/packages/dva-loading, dependency of package `umi-plugin-react`
// but do NOT need to add `dva-loading` to config.js file, why?
const getCardsLoading = state => state['loading'].effects['cards/queryList']

const mapStateToProps = state => ({
  cardsList: getCardList(state),
  cardsLoading: getCardsLoading(state),
})

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch({
      type: 'cards/queryList',
    })
  },
})

const COLUMNS = [
  {
    title: '名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '链接',
    dataIndex: 'url',
    render: value => <a href={value}>{value}</a>,
  },
]

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class List extends React.Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const { cardsList, cardsLoading } = this.props

    return (
      <div>
        <Table
          columns={COLUMNS}
          dataSource={cardsList}
          loading={cardsLoading}
          rowKey="id"
        />
      </div>
    )
  }
}

export default List
