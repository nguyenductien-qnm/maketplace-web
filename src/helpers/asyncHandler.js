import { StatusCodes } from 'http-status-codes'
import { navigate } from './navigation'

const asyncHandlerShop = async (asyncFn) => {
  try {
    const result = await asyncFn()
    return [result, null]
  } catch (error) {
    const status = error?.status || error?.response?.status
    if (status === StatusCodes.FORBIDDEN || status === StatusCodes.NOT_FOUND) {
      navigate?.('/access-denied')
    }
    return [null, error]
  }
}

export { asyncHandlerShop }
