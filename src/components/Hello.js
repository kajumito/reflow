import React from 'react';

export default class Hello extends React.Component{
  render(){
    return(
      <div>
        <p>Hello World!</p>
        <button type="button" class="btn btn-primary">Primary</button>
        <button type="button" class="btn btn-info">Info</button>
      </div>
    );
  }
}
