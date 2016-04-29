// Complete binary tree utility functions

// The number of nodes n in a complete binary tree can be found using this formula:
// n = 2l-1 where l is the number of leaf nodes in the tree.
export const leafCountToNodeCount = (leafCount) => 2 * leafCount - 1

export const buildFromLeaves = (leaves) => {
  const leafCount = leaves.length
  const nodeCount = leafCountToNodeCount(leaves.length)
  const delta = nodeCount - leafCount
  return [
    ...new Array(delta),
    ...leaves,
  ]
}

export const left = (arr) => (idx) => {

}
