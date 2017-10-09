import React from 'react';
import ReactDOM from 'react-dom';

class Hello extends React.Component{
  render(){
    return(
      <div>
        <p>Hello World!</p>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello />,
  document.getElementById('root')
);
