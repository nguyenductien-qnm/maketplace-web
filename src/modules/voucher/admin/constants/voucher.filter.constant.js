const FILTER_LABEL_MAP = {
  sort_by: 'Sort',
  apply_to: 'Apply to',
  visibility: 'Visibility',
  type: 'Type',
  created_from: 'Created from',
  created_to: 'Created to',
  active_from: 'Active from',
  active_to: 'Active to',
  creator_role: 'Creator role',
  creator_selected: 'Creator'
}

const FILTER_VALUE_MAP = {
  apply_to: {
    all: 'All products',
    specific: 'Specific products'
  },
  visibility: {
    public: 'Public',
    private: 'Private'
  },
  type: {
    fixed_amount: 'Fixed amount',
    percent: 'Percent'
  },
  creator_role: {
    admin: 'Admin',
    shop: 'Shop'
  }
}

export { FILTER_LABEL_MAP, FILTER_VALUE_MAP }
