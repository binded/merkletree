import React, { Component } from 'react'
import merkletree from '../../src/'
// import Inspector from 'react-json-inspector'

export default class GenerateTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leavesText: '',
      tree: null,
    }
    this.onChange = this.onChange.bind(this)
    this.onClickGenerateTree = this.onClickGenerateTree.bind(this)
  }

  onChange(e) {
    this.setState({
      leavesText: e.target.value,
    })
  }

  onClickGenerateTree() {
    const leaves = this.state.leavesText
      .split('\n')
      .map((line) => line.trim())
    const tree = merkletree(leaves)
    this.setState({ tree })
  }

  renderTree() {
    const { tree } = this.state
    if (!tree) return
    const root = tree.root()
    const leaves = tree.leaves()

    const renderProof = (leafData) => {
      const proof = tree.proof(leafData)
      const json = JSON.stringify(proof, null, 2)
      const lineCount = json.split('\n').length
      return (
        <div key={leafData}>
          <h4>{leafData}</h4>
          <textarea
            rows={lineCount}
            className="form-control"
            disabled
            value={json}
          />
          {/* <Inspector data={proof} search={false} /> */}
        </div>
      )
    }

    return (
      <div>
        <pre>
          Merkle root: {root}
        </pre>
        <h3>Proofs</h3>
        <div>
          {leaves.map(renderProof)}
        </div>
      </div>

    )
  }

  render() {
    return (
      <div>
        <h2>Generate tree</h2>
        <p>Enter leaf hashes (one per line):</p>
        <p>
          <textarea
            onChange={this.onChange}
            rows="10"
            className="form-control"
          />
        </p>
        <p>
          <button
            onClick={this.onClickGenerateTree}
            className="btn btn-primary"
          >
            Generate Tree
          </button>
        </p>
        {this.renderTree()}
      </div>
    )
  }
}
