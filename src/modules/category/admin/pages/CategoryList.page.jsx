import Box from '@mui/material/Box'
import CategoryHeader from '../components/CategoryHeader'
import useAdminCategoryList from '../hooks/useAdminCategory'
import CategoryTreeBoard from '../components/CategoryTreeBoard'
import CategoryForm from '../components/CategoryForm'
import CategoryDetailModal from '../components/CategoryDetailModal'
import ConfirmDialog from '~/modules/voucher/shop/components/VoucherList/ConfirmDialog'

function CategoryList() {
  const { ui, data, handler } = useAdminCategoryList()
  return (
    <Box>
      <CategoryHeader ui={ui.header} handler={handler.header} />

      <CategoryTreeBoard
        ui={ui.board}
        data={data.board}
        handler={handler.board}
      />

      <CategoryForm ui={ui.form} data={data.form} handler={handler.form} />

      <CategoryDetailModal
        ui={ui.detailModal}
        data={data.detailModal}
        handler={handler.detailModal}
      />

      <ConfirmDialog ui={ui.confirmDialog} handler={handler.confirmDialog} />
    </Box>
  )
}

export default CategoryList
