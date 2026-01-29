const PRODUCT_STATUS_CHIP_CONFIG = {
  pending: {
    label: 'Pending',
    color: '#ED6C02'
  },
  approved: {
    label: 'Approved',
    color: '#2E7D32'
  },
  rejected: {
    label: 'Rejected',
    color: '#D32F2F'
  },
  banned: {
    label: 'Banned',
    color: '#616161'
  }
}

const PRODUCT_VISIBILITY_CHIP_CONFIG = {
  public: {
    label: 'Public',
    sx: {
      color: '#1565C0',
      bgcolor: '#E3F2FD'
    }
  },
  private: {
    label: 'Private',
    sx: {
      color: '#6A1B9A',
      bgcolor: '#F3E5F5'
    }
  }
}

export { PRODUCT_STATUS_CHIP_CONFIG, PRODUCT_VISIBILITY_CHIP_CONFIG }
