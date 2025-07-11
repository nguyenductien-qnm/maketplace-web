const findCategoryNameByCode = ({ categoryTree, categoryCode }) => {
  for (const category of categoryTree) {
    if (category.category_code === categoryCode) {
      return category.category_name
    }
    if (category.children && category.children.length > 0) {
      const result = findCategoryNameByCode({
        categoryTree: category.children,
        categoryCode
      })
      if (result) return result
    }
  }
  return null
}

export default findCategoryNameByCode
