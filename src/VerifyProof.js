import React, { Component } from 'react'
import { verifyProof } from '../../src/'
// import Inspector from 'react-json-inspector'

export default class VerifyProof extends Component {
  constructor(props) {
    super(props)
    this.state = {
      error: false,
      proofText: '',
      merkleRootText: '',
      leafDataText: '',
      verified: null,
      result: null,
    }
    this.onChange = this.onChange.bind(this)
    this.onClickVerify = this.onClickVerify.bind(this)
  }

  onChange(e) {
    this.setState({
      [`${e.target.name}Text`]: e.target.value,
    })
  }

  onClickVerify() {
    try {
      const proof = JSON.parse(this.state.proofText)
      const leafData = this.state.leafDataText.trim()
      const merkleRoot = this.state.merkleRootText.trim()
      const verified = verifyProof(leafData, merkleRoot, proof)
      this.setState({ result: verified, error: false })
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err.stack)
      this.setState({ error: err })
    }
    // const tree = merkletree(leaves)

    // this.setState({ tree })
  }

  renderResult() {
    const { error, result } = this.state
    if (error) {
      return (
        <div className="alert alert-warning">
          {error.name || 'Error'}: {error.message}
        </div>
      )
    } else if (result !== null) {
      if (result) {
        return (
          <div className="alert alert-success">
            Proof verified!
          </div>
        )
      }
      return (
        <div className="alert alert-danger">
          Invalid proof!
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Verify proof</h2>
        <p>Copy/paste proof:</p>
        <p>
          <textarea
            onChange={this.onChange}
            rows="10"
            name="proof"
            className="form-control"
          />
        </p>
        <p>Expected leaf hash:</p>
        <p>
          <input
            onChange={this.onChange}
            rows="10"
            name="leafData"
            className="form-control"
          />
        </p>
        <p>Expected merkle root:</p>
        <p>
          <input
            onChange={this.onChange}
            rows="10"
            name="merkleRoot"
            className="form-control"
          />
        </p>
        <p>
          <button
            onClick={this.onClickVerify}
            className="btn btn-primary"
          >
            Verify
          </button>
        </p>
        {this.renderResult()}
      </div>
    )
  }
}
