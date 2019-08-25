import 'rc-drawer/assets/index.css'
import React from 'react'
import DrawerMenu from 'rc-drawer'
import SiderMenu from './SiderMenu'

const SiderMenuWrapper = props => {
  const { collapsed } = props

  return props.isMobile ? (
    <DrawerMenu
      getContainer={null}
      level={null}
      handleChild={null}
      open={!collapsed}
      onMaskClick={() => {
        props.onCollapse(true)
      }}
      width="256px"
    >
      <SiderMenu {...props} collapsed={collapsed} />
    </DrawerMenu>
  ) : (
    <SiderMenu {...props} />
  )
}

export default SiderMenuWrapper
