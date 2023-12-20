import React from 'react';
import Board from './components/Board'
import './App.css';
import RuleBook from './components/RuleBook';

const images = [
  require('./images/1.png'),
  require('./images/2.png'),
  require('./images/3.png'),
  require('./images/4.png'),
  require('./images/5.png'),
  require('./images/6.png'),
  require('./images/7.png'),
  require('./images/8.png'),
  require('./images/9.png'),
  require('./images/10.png'),
  require('./images/back.png'),
];

const App = () => {
  return (
    <div className="app">
      <div className="header">
        <h2>짝 맞추기 게임</h2>
      </div>

      <div className="content">
        <div className="sidebar sidebar-left">
          <div>
            <RuleBook/>
          </div>
        </div>

        <div className="main">
          <div>
              <Board images={images} />
          </div>
        </div>
      </div>

    </div>
  );
};

export default App;
