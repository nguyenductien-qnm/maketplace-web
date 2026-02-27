export const getDescendantsUpToDepth = (list, rootId, maxDepth) => {
  const result = []
  const queue = [{ parentId: rootId, depth: 0 }]

  while (queue.length > 0) {
    const { parentId, depth } = queue.shift()

    if (depth >= maxDepth) continue

    const children = list.filter((item) => item.parent === parentId)

    for (const child of children) {
      result.push(child)
      queue.push({
        parentId: child.id,
        depth: depth + 1
      })
    }
  }

  return result
}
