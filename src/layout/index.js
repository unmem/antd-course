import { Component } from 'react'
import { Layout } from 'antd'
import SiderMenu from '../component/SiderMenu'
import { getMenuData } from '../common/menu'
import logo from '../assets/logo.svg'
import GlobalHeader from '../component/GlobalHeader'
import GlobalFooter from '../component/GlobalFooter'

const { Header, Content } = Layout

class BasicLayout extends Component {
  state = {
    collapsed: false,
  }

  handleMenuCollapse = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed,
    }))
  }
  render() {
    const { children, location } = this.props
    const { collapsed } = this.state

    return (
      <Layout>
        <SiderMenu
          logo={logo}
          collapsed={collapsed}
          menuData={getMenuData()}
          location={location}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              collapsed={collapsed}
              currentUser={{
                name: 'Serati Ma',
                avatar:
                  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                userid: '00000001',
                notifyCount: 12,
              }}
              notices={[
                {
                  type: '通知',
                  avatar:
                    'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
                  title: 'GTD',
                  description: 'Find a job',
                  datetime: '2019-08-27',
                },
              ]}
              onCollapse={this.handleMenuCollapse}
            />
          </Header>
          <Content style={{ margin: '24px 16px 0', height: '100%' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {children}
            </div>
          </Content>
          <GlobalFooter
            style={{ textAlign: 'center' }}
            copyright="Ant Design ©2018 Created by Ant UED"
          />
        </Layout>
      </Layout>
    )
  }
}

export default BasicLayout
