const projectCategoryToTreeNode = (data) => ({
  id: data?._id,
  parent: data?.category_parent_id || 0,
  text: data?.category_name,
  icon: data?.category_icon,
  status: data?.category_status
})

export default projectCategoryToTreeNode
