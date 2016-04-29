# merlketree

Merkle tree data structure in pure Javascript. Always builds complete
binary trees.

The proofs are compatible with the
[chainpoint proof format](https://github.com/chainpoint/whitepaper/raw/master/chainpoint_white_paper.pdf).

## Install

```
npm install --save merkletree
```

## Usage

```javascript
import merkletree from 'merkletree'
const leaves = [
  'e1566f09e0deea437826514431be6e4bdb4fe10aa54d75aecf0b4cdc1bc4320c',
  '2f7f9092b2d6c5c17cfe2bcf33fc38a41f2e4d4485b198c2b1074bba067e7168',
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  'e1566f09e0deea437826514431be6e4bdb4fe10aa54d75aecf0b4cdc1bc4320c',
]
const tree = merkletree(leaves)
tree.root() === '6a9a3c86d47f1fe12648c86368ecd9723ff12e3fc34f6ae219d4d9d3e0d60667'
tree.proof('2f7f9092b2d6c5c17cfe2bcf33fc38a41f2e4d4485b198c2b1074bba067e7168') === [
  {
    left: 'e1566f09e0deea437826514431be6e4bdb4fe10aa54d75aecf0b4cdc1bc4320c',
    parent: '0fdd6b6895e15115c262f6acb9a6ae0c73248568b740454ab21591f8a533dd7f',
    right: '2f7f9092b2d6c5c17cfe2bcf33fc38a41f2e4d4485b198c2b1074bba067e7168',
  },
  {
    left: '0fdd6b6895e15115c262f6acb9a6ae0c73248568b740454ab21591f8a533dd7f',
    parent: '6a9a3c86d47f1fe12648c86368ecd9723ff12e3fc34f6ae219d4d9d3e0d60667',
    right: '3b7546ed79e3e5a7907381b093c5a182cbf364c5dd0443dfa956c8cca271cc33',
  },
]
```
