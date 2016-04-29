import {
  findLeaf,
  climb,
  left,
  right,
  leaves as getLeaves,
} from './binary-tree.js'
import { createHash } from 'crypto'

const toBuffer = (value) => {
  if (Buffer.isBuffer(value)) return value
  return new Buffer(value)
}

const combine = (hashAlgorithm = 'sha256', encoding = 'hex') => (leftData, rightData) => {
  const hash = createHash(hashAlgorithm)
  const input = Buffer.concat([
    toBuffer(leftData),
    toBuffer(rightData),
  ])
  return hash.update(input).digest(encoding)
}

export const computeTree = (combineFn) => (leaves) => {
  const tree = [...leaves.reverse()]
  let idx = 0
  while (idx + 1 < tree.length) {
    tree.push(combineFn(tree[idx + 1], tree[idx]))
    idx = idx + 2
  }
  return tree.reverse()
}

// throws if leaf not found
export const proof = (tree) => (leafData) => {
  const startIdx = findLeaf(tree)(leafData)
  const proofArr = []
  climb(tree)(startIdx, (data, idx) => {
    const leftIdx = left(tree)(idx)
    const rightIdx = right(tree)(idx)
    proofArr.push({
      left: tree[leftIdx],
      parent: tree[idx],
      right: tree[rightIdx],
    })
  })
  return proofArr
}

export const verifyProof = (leaf, expectedMerkleRoot, proofArr, {
  hashAlgorithm, encoding,
} = {}) => {
  const combineFn = combine(hashAlgorithm, encoding)

  // the merkle root should be the parent of the last part
  const actualMerkleRoot = proofArr[proofArr.length - 1].parent

  if (actualMerkleRoot !== expectedMerkleRoot) {
    return false
  }

  let prevParent = leaf
  for (const part of proofArr) {
    if (part.left !== prevParent && part.right !== prevParent) {
      //  prevParent is neither left or right value
      return false
    }
    // Compute parent node
    const parentData = combineFn(part.left, part.right)
    // Parent in proof is incorrect
    if (parentData !== part.parent) {
      return false
    }
    prevParent = parentData
  }
  // Check one more time to be sure :P (this is not needed)
  return prevParent === expectedMerkleRoot
}

export default (leaves, {
  hashAlgorithm,
  encoding,
} = {}) => {
  const combineFn = combine(hashAlgorithm, encoding)
  const tree = computeTree(combineFn)(leaves)

  return {
    root: () => tree[0],
    proof: (leaf) => proof(tree)(leaf),
    leaves: () => getLeaves(tree),
  }
}
