import React from 'react'
import { Table, Modal, Button, Form, Input } from 'antd'
import { connect } from 'dva'

const FormItem = Form.Item

const namespace = 'cards'

const getCardList = state => state[namespace].cardsList
// https://github.com/dvajs/dva/tree/master/packages/dva-loading, dependency of package `umi-plugin-react`
// but do NOT need to add `dva-loading` to config.js file, why?
const getCardsLoading = state =>
  state['loading'].effects[`${namespace}/queryList`]

const mapStateToProps = state => ({
  cardsList: getCardList(state),
  cardsLoading: getCardsLoading(state),
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

@Form.create()
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class List extends React.Component {
  state = {
    visible: false,
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

  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const { cardsList, cardsLoading } = this.props
    const {
      form: { getFieldDecorator },
    } = this.props
    const { visible } = this.state

    return (
      <div>
        <Table
          columns={COLUMNS}
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
      </div>
    )
  }
}

export default List
