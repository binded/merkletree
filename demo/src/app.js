import ReactDOM from 'react-dom'
import React from 'react'

import GenerateTree from './GenerateTree'
import VerifyProof from './VerifyProof'

const App = () => (
  <div className="container">
    <h1>Merkletree.js</h1>
    <div>
      <p>
        Github: <a href="https://github.com/blockai/merkletree">blockai/merkletree</a>
      </p>
    </div>
    <div className="row">
      <div className="col-md-8">
        <GenerateTree />
      </div>
      <div className="col-md-4">
        <VerifyProof />
      </div>
    </div>
  </div>
)

ReactDOM.render(
  <App />,
  document.getElementById('app')
)
