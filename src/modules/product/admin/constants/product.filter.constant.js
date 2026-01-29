const FILTER_LABEL_MAP = {
  search: 'Search',
  sort_by: 'Sort',
  visibility: 'Visibility',
  type: 'Type',
  created_from: 'Created from',
  created_to: 'Created to',
  creator_selected: 'Creator'
}

const FILTER_VALUE_MAP = {
  type: {
    simple: 'Simple products',
    variable: 'Variable products'
  },
  visibility: {
    public: 'Public',
    private: 'Private'
  }
}

export { FILTER_LABEL_MAP, FILTER_VALUE_MAP }
