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
       'a', 'b',
    ],
  },
  {
    leaves: ['a', 'b', 'c'],
    expectedTree: [
         undefined,
       undefined, 'a',
       'b', 'c',
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
          'b', 'c',   'd', 'e',      'f', 'g',
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

test((t) => {
  const tree = [
                 'a',
           'b',         'c',
       'd',  'e',    'f',   'g',
    'h','i','k','l',
  ]
  // bind funcitons to tree
  const smartTree = {
    parent: btree.parent(tree),
    left: btree.left(tree),
    right: btree.right(tree),
    findLeaf: btree.findLeaf(tree),
    climb: btree.climb(tree),
  }
  const k = smartTree.findLeaf('k')
  t.equal(k, 9)
  t.equal(smartTree.parent(k), 4)
  const d = 3
  t.equal(tree[smartTree.parent(d)], 'b')
  t.equal(tree[smartTree.left(d)], 'h')
  t.equal(tree[smartTree.right(d)], 'i')

  const i = smartTree.findLeaf('i')
  const parents = []
  smartTree.climb(i, (data) => {
    parents.push(data)
  })
  t.deepEqual(parents, ['d', 'b', 'a'])
  t.end()
})

