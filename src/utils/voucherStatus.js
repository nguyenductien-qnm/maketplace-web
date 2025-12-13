export const getVoucherStatus = ({ start, end }) => {
  const now = new Date()
  const startDate = new Date(start)
  const endDate = new Date(end)

  if (startDate > now) return 'UPCOMING'

  if (startDate <= now && endDate >= now) return 'ONGOING'

  if (endDate < now) return 'EXPIRED'
}
