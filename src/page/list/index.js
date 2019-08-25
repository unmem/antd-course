import React from 'react'
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'
import SampleChart from '../../component/SampleChart'

const FormItem = Form.Item

const namespace = 'cards'

const getCardList = state => state[namespace].cardsList
// https://github.com/dvajs/dva/tree/master/packages/dva-loading, dependency of package `umi-plugin-react`
// but do NOT need to add `dva-loading` to config.js file, why?
const getCardsLoading = state =>
  state['loading'].effects[`${namespace}/queryList`]
const getStatistic = state => state[namespace].statistic

const mapStateToProps = state => ({
  cardsList: getCardList(state),
  cardsLoading: getCardsLoading(state),
  statistic: getStatistic(state),
})

const mapDispatchToProps = dispatch => ({
  onDidMount: () => {
    dispatch({
      type: `${namespace}/queryList`,
    })
  },
  addOne: values => {
    dispatch({
      type: `${namespace}/addOne`,
      payload: values,
    })
  },
  getStatistic: id => {
    dispatch({
      type: 'cards/getStatistic',
      payload: id,
    })
  },
})

@Form.create()
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class List extends React.Component {
  COLUMNS = [
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
    {
      title: '',
      dataIndex: '',
      render: (_, { id }) => {
        return (
          <Button onClick={() => this.handleStatisticShow(id)}>图表</Button>
        )
      },
    },
  ]

  state = {
    visible: false,
    statisticVisible: false,
    id: null,
  }

  showModal = () => {
    this.setState({ visible: true })
  }

  hideModal = () => {
    this.setState({ visible: false })
  }

  handleCancel = () => {
    this.hideModal()
  }

  handleOk = () => {
    const {
      addOne,
      form: { validateFields },
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        addOne(values)
        this.hideModal()
      }
    })
  }

  hideSimpleChartModal = () =>
    this.setState({
      statisticVisible: false,
    })

  handleStatisticCancel = () => this.hideSimpleChartModal()

  handleStatisticShow = id => {
    const { getStatistic } = this.props
    getStatistic(id)
    this.setState({ id, statisticVisible: true })
  }

  componentDidMount() {
    const { onDidMount } = this.props
    onDidMount()
  }

  render() {
    const { cardsList, cardsLoading, statistic } = this.props
    const {
      form: { getFieldDecorator },
    } = this.props
    const { visible, statisticVisible, id } = this.state

    return (
      <div>
        <Table
          columns={this.COLUMNS}
          dataSource={cardsList}
          loading={cardsLoading}
          rowKey="id"
        />
        <Button onClick={this.showModal}>Create</Button>
        <Modal
          title="Create new record"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form>
            <FormItem label="Name">
              {getFieldDecorator('name', {
                rules: [{ required: true }],
              })(<Input />)}
            </FormItem>
            <FormItem label="Description">
              {getFieldDecorator('desc')(<Input />)}
            </FormItem>
            <FormItem label="Link">
              {getFieldDecorator('url', {
                rules: [{ type: 'url' }],
              })(<Input />)}
            </FormItem>
          </Form>
        </Modal>
        <Modal
          visible={statisticVisible}
          footer={null}
          onCancel={this.handleStatisticCancel}
        >
          <SampleChart data={statistic[id]} />
        </Modal>
      </div>
    )
  }
}

export default List
