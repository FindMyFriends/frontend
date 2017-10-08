import React from 'react';
import Header from './Header';

const App = ({ children }) => (
  <div>
    <Header />
    <div className="container-fluid text-center">
      <div className="row content">
        <div className="col-sm-10 col-sm-offset-1 text-left">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default App;
