/* eslint no-useless-escape:0 */

const menuData = [
  {
    name: 'Hello World',
    icon: 'pie-chart',
    path: 'helloworld',
  },
  {
    name: 'Pages',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '分析页',
        path: 'analysis',
      },
      {
        name: '监控页',
        path: 'monitor',
      },
      {
        name: '工作台',
        path: 'workplace',
        // hideInBreadcrumb: true,
        // hideInMenu: true,
      },
    ],
  },
  {
    name: 'typescript',
    icon: 'dashboard',
    path: 'typescript',
  },
  {
    name: 'List',
    icon: 'ordered-list',
    path: 'list',
  },
]

const isUrl = (function() {
  const urlReg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g

  return path => urlReg.test(path)
})()

function formatter(menus, parentPath = '/', parentAuthority) {
  return menus.map(menu => {
    let { path: menuPath } = menu

    if (!isUrl(menuPath)) {
      menuPath = parentPath + menuPath
    }

    const result = {
      ...menu,
      path: menuPath,
      authority: menu.authority || parentAuthority,
    }

    const subMenu = menu.children
    if (subMenu) {
      const _parentPath = `${menuPath}/`
      const _parentAuthority = menu.authority

      result.children = formatter(subMenu, _parentPath, _parentAuthority)
    }

    return result
  })
}

const getMenuData = () => formatter(menuData)

export { isUrl, getMenuData }
