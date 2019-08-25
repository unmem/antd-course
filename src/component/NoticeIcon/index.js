import React, { PureComponent } from 'react'
import { Popover, Icon, Tabs, Badge, Spin } from 'antd'
import classNames from 'classnames'
import List from './NoticeList'
import styles from './index.less'

const { TabPane } = Tabs

const voidFunc = () => {}

class NoticeIcon extends PureComponent {
  static defaultProps = {
    onItemClick: voidFunc,
    onPopupVisibleChange: voidFunc,
    onTabChange: voidFunc,
    onClear: voidFunc,
    loading: false,
    locale: {
      emptyText: '暂无数据',
      clear: '清空',
    },
    emptyImage:
      'https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg',
  }

  static Tab = TabPane

  constructor(props) {
    super(props)
    this.state = {}
    if (props.children && props.children[0]) {
      this.state.tabType = props.children[0].props.title
    }
  }

  onTabChange = tabType => {
    this.setState({ tabType })
    this.props.onTabChange(tabType)
  }

  getNotificationBox() {
    const getTitleWithNoticeCount = props => {
      let { list, title } = props

      if (list && list.length > 0) title += `(${list.length})`

      return title
    }

    const { children, loading, locale, onItemClick } = this.props
    if (!children) {
      return null
    }
    const panes = React.Children.map(children, child => {
      const title = getTitleWithNoticeCount(child.props)
      const { title: childTitle, list: childList } = child.props

      return (
        <TabPane tab={title} key={childTitle}>
          <List
            {...child.props}
            data={childList}
            onClick={item => onItemClick(item, child.props)}
            onClear={() => this.props.onClear(childTitle)}
            title={childTitle}
            locale={locale}
          />
        </TabPane>
      )
    })

    return (
      <Spin spinning={loading} delay={0}>
        <Tabs className={styles.tabs} onChange={this.onTabChange}>
          {panes}
        </Tabs>
      </Spin>
    )
  }

  render() {
    const { className, count, popupAlign, onPopupVisibleChange } = this.props
    const noticeButtonClass = classNames(className, styles.noticeButton)
    const notificationBox = this.getNotificationBox()

    const trigger = (
      <span className={noticeButtonClass}>
        <Badge count={count} className={styles.badge}>
          <Icon type="bell" className={styles.icon} />
        </Badge>
      </span>
    )

    if (!notificationBox) {
      return trigger // not responding for click when empty notices
    }

    const popoverProps = {}
    if ('popupVisible' in this.props) {
      popoverProps.visible = this.props.popupVisible
    }

    return (
      <Popover
        placement="bottomRight"
        content={notificationBox}
        popupClassName={styles.popover}
        trigger="click"
        arrowPointAtCenter
        popupAlign={popupAlign}
        onVisibleChange={onPopupVisibleChange}
        {...popoverProps}
      >
        {trigger}
      </Popover>
    )
  }
}

export default NoticeIcon
