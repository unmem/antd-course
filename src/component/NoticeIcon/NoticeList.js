import React from 'react'
import { Avatar, List } from 'antd'
import classNames from 'classnames'
import styles from './NoticeList.less'

export default function NoticeList({
  data = [],
  onClick,
  onClear,
  title,
  locale,
  emptyText,
  emptyImage,
}) {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        {emptyImage ? <img src={emptyImage} alt="not found" /> : null}
        {emptyText ? emptyText : locale.emptyText}
      </div>
    )
  }

  const getDescription = ({ description, datetime }) => (
    <div>
      <div className={styles.description} title={description}>
        {description}
      </div>
      <div className={styles.datetime}>{datetime}</div>
    </div>
  )

  const getTitle = ({ title, extra }) => (
    <div className={styles.title}>
      {title}
      <div className={styles.extra}>{extra}</div>
    </div>
  )

  const getAvatar = ({ avatar }) =>
    avatar ? <Avatar className={styles.avatar} src={avatar} /> : null

  const clearAll = (
    <div className={styles.clear} onClick={onClear}>
      {locale.clear}
      {title}
    </div>
  )

  return (
    <div>
      <List className={styles.list}>
        {data.map((notice, i) => {
          const noticeClassNames = classNames(styles.item, {
            [styles.read]: notice.read,
          })

          return (
            <List.Item
              className={noticeClassNames}
              key={notice.key || i}
              onClick={() => onClick(notice)}
            >
              <List.Item.Meta
                className={styles.meta}
                avatar={getAvatar(notice)}
                title={getTitle(notice)}
                description={getDescription(notice)}
              />
            </List.Item>
          )
        })}
      </List>
      {clearAll}
    </div>
  )
}
