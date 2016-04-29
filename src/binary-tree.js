// Complete binary tree utility functions

// The number of nodes n in a complete binary tree can be found using this formula:
// n = 2l-1 where l is the number of leaf nodes in the tree.
export const leafCountToNodeCount = (leafCount) => 2 * leafCount - 1
export const nodeCountToLeafCount = (nodeCount) => (nodeCount + 1) / 2
export const isInteriorNode = (idx, nodeCount) => {
  const leafCount = nodeCountToLeafCount(nodeCount)
  return idx >= 0 && idx < (nodeCount - leafCount)
}

// Tree
export const buildFromLeaves = (leaves) => {
  const leafCount = leaves.length
  const nodeCount = leafCountToNodeCount(leaves.length)
  const delta = nodeCount - leafCount
  return [
    ...new Array(delta),
    ...leaves,
  ]
}

export const leaves = (tree) => {
  const leafCount = nodeCountToLeafCount(tree.length)
  return tree.slice(-leafCount)
}

export const root = (tree) => tree[0]

export const levelOrder = (tree) => tree.map((val, idx) => idx)
