import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toysArray.map(toy => <ToyCard toyInfo={toy} handleDelete={props.handleDelete}/>)}
    </div>
  );
}

export default ToyContainer;
