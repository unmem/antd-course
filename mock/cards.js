let cards = [
  {
    id: 1,
    name: 'umi',
    desc: '极快的类 Next.js 的 React 应用框架。',
    url: 'https://umijs.org',
  },
  {
    id: 2,
    name: 'antd',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  },
  {
    id: 3,
    name: 'antd-pro',
    desc: '一个服务于企业级产品的设计体系。',
    url: 'https://ant.design/index-cn',
  },
]

let statistic = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 1150 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
]

const getLastestId = () => cards[cards.length - 1].id

export default {
  'get /dev/cards': function(req, res, next) {
    setTimeout(() => {
      res.json({
        result: cards,
      })
    }, 1000)
  },
  'post /dev/cards/add': function(req, res, next) {
    const record = {
      ...req.body,
      id: getLastestId() + 1,
    }

    cards = [...cards, record]

    res.json({
      success: true,
    })
  },
  'get /dev/cards/:id/statistic': function(req, res, next) {
    res.json({
      result: statistic,
    })
  },
}
