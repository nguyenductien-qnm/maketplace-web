import Avatar from '@mui/material/Avatar'
import capitalizeFirstLetter from '~/utils/capitalizeFirstLetter'
import formatCurrency from '~/utils/formatCurrency'

const getNestedValue = (obj, path) => {
  return path.split('?.').reduce((acc, key) => acc?.[key], obj)
}

const renderAmount = (object, key) =>
  object?.[key] ? formatCurrency(object[key]) : 'N/A'

const renderDefault = (object, key) => {
  const nestedValue = getNestedValue(object, key)
  const flatValue = object?.[key]
  return <span>{nestedValue ?? flatValue ?? 'N/A'}</span>
}

const renderCapitalizeFirstLetter = (object, key) =>
  object?.[key] ? capitalizeFirstLetter(object?.[key]) : 'N/A'

const renderAvatar = (object, key) => {
  const nestedValue = getNestedValue(object, key)
  const flatValue = object?.[key]
  return <Avatar src={nestedValue ?? flatValue} />
}

export {
  renderAvatar,
  renderAmount,
  renderDefault,
  renderCapitalizeFirstLetter
}
