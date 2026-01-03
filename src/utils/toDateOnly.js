import dayjs from 'dayjs'

const toDateOnly = (date) =>
  date ? dayjs(date).format('YYYY-MM-DD') : undefined

export default toDateOnly
