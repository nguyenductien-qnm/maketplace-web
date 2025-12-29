import { FIELD_REQUIRED_MESSAGE } from '~/utils/validators'

const integerValidator = (min, max, label = 'Value') => ({
  required: FIELD_REQUIRED_MESSAGE,
  validate: (value) => {
    const numValue = Number(value)

    if (!Number.isInteger(numValue)) {
      return `${label} must be an integer`
    }

    if (numValue < min || numValue > max) {
      return `${label} must be between ${min} and ${max}`
    }

    return true
  }
})

const voucherStartDateValidator = ({ voucherStatus, watch }) => ({
  required: FIELD_REQUIRED_MESSAGE,
  validate: {
    futureDate: (value) => {
      if (voucherStatus === 'ONGOING') return true
      if (!value) return true

      const selectedDate = new Date(value)
      const now = new Date()

      if (selectedDate <= now) {
        return 'Start date must be in the future.'
      }

      return true
    }
  }
})

const voucherEndDateValidator = ({ watch }) => ({
  required: FIELD_REQUIRED_MESSAGE,
  validate: {
    greaterThanStart: (value) => {
      if (!value) return true

      const startDate = watch('voucher_start_date')
      if (!startDate) return 'Please select start date first'

      const start = new Date(startDate)
      const end = new Date(value)

      const diffInHours = (end - start) / (1000 * 60 * 60)

      if (diffInHours < 1) {
        return 'End date must be at least 1 hour after start date'
      }

      return true
    }
  }
})

const voucherValueValidator = ({ voucherType }) =>
  voucherType === 'percent'
    ? integerValidator(1, 99, 'Value')
    : integerValidator(1, 2000, 'Value')

const voucherQuantityValidator = () => integerValidator(1, 200000)

const voucherMaxDistributeValidator = () => integerValidator(1, 5)

const voucherMinOrderValidator = () => integerValidator(1, 2000)

const voucherMaxDiscountValueValidator = () => integerValidator(1, 2000)

export {
  voucherStartDateValidator,
  voucherEndDateValidator,
  voucherValueValidator,
  voucherQuantityValidator,
  voucherMaxDistributeValidator,
  voucherMinOrderValidator,
  voucherMaxDiscountValueValidator
}
