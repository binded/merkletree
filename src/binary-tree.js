// Complete binary tree utility functions
// Using array representation explained at
// http://algoviz.org/OpenDSA/Books/OpenDSA/html/CompleteTree.html

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

// throws range error if idx returned is not within array range
const guardRange = (tree) => (fn) => (idx) => {
  // Guard
  const guard = (i) => {
    if (!(i >= 0 && i < tree.length)) {
      throw new RangeError()
    }
    return i
  }
  return guard(fn(guard(idx)))
}
export const parent = (tree) => guardRange(tree)((idx) => Math.floor((idx - 1) / 2))
export const left = (tree) => guardRange(tree)((idx) => 2 * idx + 1)
export const right = (tree) => guardRange(tree)((idx) => 2 * idx + 2)

export const climb = (tree) => (idx, fn) => {
  if (idx === 0) {
    return
  }
  const parentIdx = parent(tree)(idx)
  fn(tree[parentIdx], parentIdx)
  return climb(tree)(parentIdx, fn)
}

export const findLeaf = (tree) => (leaf) => {
  const leafCount = nodeCountToLeafCount(tree.length)
  for (let i = 0; i < leafCount; i++) {
    const idx = tree.length - 1 - i
    if (tree[idx] === leaf) {
      return idx
    }
  }
  return -1
}
