import test from 'blue-tape'
import {
  buildFromLeaves,
} from '../src/binary-tree'

[
  {
    leaves: ['a'],
    expectedTree: ['a'],
  },
  {
    leaves: ['a', 'b'],
    expectedTree: [
       undefined,
       'a', 'b'
    ],
  },
  {
    leaves: ['a', 'b', 'c'],
    expectedTree: [
         undefined,
       undefined, 'a',
       'b', 'c'
    ],
  },
].forEach(({ leaves, expectedTree }, idx) => {
  test((t) => {
    const tree = buildFromLeaves(leaves)
    t.deepEqual(tree, expectedTree, `test data #{idx}`)
    t.end()
  })
})
