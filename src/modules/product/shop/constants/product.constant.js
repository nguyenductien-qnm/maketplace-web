const PRODUCT_TAB_LABELS = {
  ALL: 'All',
  PENDING: 'Pending',
  APPROVED_PUBLIC: 'Approved public',
  APPROVED_PRIVATE: 'Approved private',
  BANNED: 'Banned',
  REJECTED: 'Rejected'
}

const PRODUCT_TAB_KEYS = Object.keys(PRODUCT_TAB_LABELS)

const PRODUCT_TABLE_COLUMNS = [
  'Product(s)',
  'Price',
  'Stock',
  'Revenue',
  'Action'
]

const PRODUCT_DELETE_CONFIRM_DIALOG = {
  header: 'Confirm Deletion',
  content:
    'This action cannot be undone! Are you sure you want to permanently delete this product?',
  confirmText: 'Confirm',
  confirmColor: 'error'
}

const PRODUCT_UPDATE_REQUIRES_REAPPROVAL_WARNING_MESSAGE = [
  'Updating the product name, images, category, or description will require re-approval.',
  'Please consider carefully before making changes.'
]

const PRODUCT_DETAIL_INFO_TOOLTIP = {
  TAGS: 'Add up to 10 tags to help buyers find your product easily. Each tag can contain letters only and maximum 20 characters.',
  ATTRIBUTES:
    'Add custom attributes for your product (e.g., Color, Size, Material). Key: maximum 20 characters, Value: maximum 50 characters. Only letters, numbers and commas allowed.'
}

const PRODUCT_TAGS_LIMIT = 10

const PRODUCT_DIMENSION_FIELDS = [
  { key: 'length', label: 'Length (cm)', min: 0.1, max: 200 },
  { key: 'width', label: 'Width (cm)', min: 0.1, max: 200 },
  { key: 'height', label: 'Height (cm)', min: 0.1, max: 200 },
  { key: 'weight', label: 'Weight (gr)', min: 1, max: 50000 }
]

const PRODUCT_BASIC_INFO_TOOLTIP = {
  PRODUCT_NAME:
    'Product name must be 10-120 characters. Only letters, numbers, spaces and special characters (- _ , . ( ) :) are allowed.',
  CATEGORY: `Select only 1 category for your product. If you don't have a suitable category, go to Settings to customize your shop categories based on platform's available categories.`,
  DESCRIPTION:
    'Product description must be 100-3000 characters. Provide detailed information about your product including materials, dimensions, features, and benefits.'
}

const PRODUCT_SAFE_INTO_TOOLTIP = {
  VARIATIONS:
    'Maximum 2 variations. Total variants (option combinations) cannot exceed 96.',
  APPLY_ALL: 'Apply price and stock to all SKU combinations',
  PRICE:
    'Enter product price. Maximum: $2,000 USD. Price must be greater than 0.',
  STOCK:
    'Enter available stock quantity. Must be between 1 and 10,000,000 units.'
}

const PRODUCT_FORM_DEFAULT_VALUES = {
  enable_variations: false,
  product_name: '',
  product_images: [],
  product_price: null,
  product_stock: null,
  product_category: '',
  product_visibility: '',
  product_tags: [],
  product_attributes: [
    { key: '', value: '' },
    { key: '', value: '' },
    { key: '', value: '' }
  ],
  product_description: '',
  product_variations: [],
  products_sku: [],
  product_dimensions: {
    length: null,
    width: null,
    height: null,
    weight: null
  }
}

const BASE_PRODUCT_FIELDS = [
  'product_images',
  'product_name',
  'product_category',
  'product_description',
  'product_tags',
  'product_attributes',
  'product_dimensions',
  'product_visibility',
  'enable_variations'
]

const SIMPLE_PRODUCT_FIELDS = [
  ...BASE_PRODUCT_FIELDS,
  'product_price',
  'product_stock'
]

const VARIABLE_PRODUCT_FIELDS = [
  ...BASE_PRODUCT_FIELDS,
  'product_variations',
  'products_sku'
]

export {
  PRODUCT_TAB_LABELS,
  PRODUCT_TAB_KEYS,
  PRODUCT_TABLE_COLUMNS,
  PRODUCT_DELETE_CONFIRM_DIALOG,
  PRODUCT_UPDATE_REQUIRES_REAPPROVAL_WARNING_MESSAGE,
  PRODUCT_DETAIL_INFO_TOOLTIP,
  PRODUCT_TAGS_LIMIT,
  PRODUCT_DIMENSION_FIELDS,
  PRODUCT_BASIC_INFO_TOOLTIP,
  PRODUCT_SAFE_INTO_TOOLTIP,
  PRODUCT_FORM_DEFAULT_VALUES,
  SIMPLE_PRODUCT_FIELDS,
  VARIABLE_PRODUCT_FIELDS
}
