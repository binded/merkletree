import test from 'blue-tape'
import * as btree from '../src/binary-tree'

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
  {
    leaves: ['a', 'b', 'c', 'd', 'e'],
    expectedTree: [
                undefined,
        undefined,     undefined,
     undefined, 'a',   'b',  'c',
     'd', 'e',
    ],
  },
  {
    leaves: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    expectedTree: [
                           undefined,
                undefined,             undefined,
          undefined,  undefined,    undefined,   'a',
          'b', 'c',   'd', 'e',      'f', 'g'
    ],
  },
].forEach(({
  leaves,
  expectedTree,
}, idx) => {
  const tree = btree.buildFromLeaves(leaves)
  test((t) => {
    t.comment(`testing tree #${idx}`)
    t.deepEqual(tree, expectedTree, 'expected tree')
    t.end()
  })
  test((t) => {
    t.deepEqual(btree.root(tree), expectedTree[0], 'root()')
    t.end()
  })
  test((t) => {
    t.deepEqual(btree.leaves(tree), leaves, 'leaves()')
    t.end()
  })
})
