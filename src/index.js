import {
  buildFromLeaves,
  computeInteriorNodes,
  root,
} from './binary-tree'
import { createHash } from 'crypto'

const toBuffer = (value) => {
  console.log(`toBuffer(${value})`)
  if (Buffer.isBuffer(value)) return value
  return new Buffer(value)
}

const combine = (hashAlgorithm = 'sha256', encoding = 'hex') => (left, right) => {
  const hash = createHash(hashAlgorithm)
  const input = Buffer.concat([
    toBuffer(left),
    toBuffer(right),
  ])
  return hash.update(input).digest('hex')
}

export const computeTree = (combineFn) => (leaves) => {
  const tree = [...leaves.reverse()]
  let idx = 0
  while (idx + 1 < tree.length) {
    tree.push(combineFn(tree[idx + 1], tree[idx]))
    idx = idx + 2
  }
  // TODO: IF ODD, ADD FIRST ENTRY TO END OF LIST TO MATCH
  // https://github.com/StorjOld/hashserv/blob/master/hashserv/MerkleTree.py#L105
  return tree.reverse()
}

export default (leaves, {
  hashAlgorithm,
  encoding,
} = {}) => {
  const tree = computeTree(combine(hashAlgorithm, encoding))(leaves)

  return {
    root: () => root(tree),
  }
}
