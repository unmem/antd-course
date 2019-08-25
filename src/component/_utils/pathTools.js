// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']

const mapUrl = (urlItem, index, urlList) =>
  `/${urlList.slice(0, index + 1).join('/')}`
const noEmpty = i => i !== ''

export function urlToList(url) {
  const urlList = url.split('/').filter(noEmpty)

  return urlList.map(mapUrl)
}
