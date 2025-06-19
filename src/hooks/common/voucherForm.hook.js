import { useForm } from 'react-hook-form'

export const useVoucherForm = ({ mode, handleAction }) => {
  const {
    register,
    watch,
    formState: { errors }
  } = useForm()

  return {
    register,
    watch,
    errors
  }
}
