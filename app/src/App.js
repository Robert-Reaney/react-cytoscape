import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hey Dylan! <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// // App.js
// import React from 'react';
// import './App.css';
// import CytoscapeComponent from './CytoscapeComponent';

// function App() {
//     return (
//         <div className="App">
//             <h1>Cytoscape in React</h1>
//             <CytoscapeComponent />
//         </div>
//     );
// }

// export default App;
