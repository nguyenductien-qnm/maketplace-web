import slugify from 'slugify'
import { API_ROOT } from './constants'

const generateURL = (name) => {
  const slug = slugify(name, {
    lower: true,
    strict: true,
    locale: 'vi'
  })
  return `${API_ROOT}/${slug}`
}

export default generateURL
