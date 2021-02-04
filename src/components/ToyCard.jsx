import React, { Component } from 'react';

class ToyCard extends Component {

  render() {
    return (
      <div className="card">
        <h2>{this.props.toyInfo.name}</h2>
        <img src={this.props.toyInfo.image} alt={this.props.toyInfo.name} className="toy-avatar" />
        <p>{this.props.toyInfo.likes} Likes </p>
        <button className="like-btn" onClick={() => this.props.increaseLikes(this.props.toyInfo)}>Like {'<3'}</button>
        <button className="del-btn" onClick={() => this.props.handleDelete(this.props.toyInfo)}>Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
