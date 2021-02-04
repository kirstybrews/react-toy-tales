import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

const URL = 'http://localhost:3000/toys/'


class App extends React.Component{

  state = {
    display: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount() {
    fetch(URL)
      .then(res => res.json())
      .then(toyArray => this.setState({toys: toyArray}))
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newToy = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    }

    const reqPackage = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(newToy)
    }

    fetch(URL, reqPackage)
      .then(res => res.json())
      .then(newToy => {
        this.setState({
          toys: [...this.state.toys, newToy]
        })
      })

    event.target.reset()
  }

  handleDelete = (toyObj) => {
    fetch(URL + toyObj.id, {method: "DELETE"})
      .then(res => res.json())
      .then(() => {
        this.setState({
          toys: this.state.toys.filter(toy => toy != toyObj)
        })
      })
      
  }

  increaseLikes = (toyObj) => {
    const updatedToy = {
      likes: toyObj.likes + 1
    }

    const reqPackage = {
      headers: {
        "Content-Type": "application/json"
      },
      method: "PATCH",
      body: JSON.stringify(updatedToy)
    }

    fetch(URL + toyObj.id, reqPackage)
      .then(res => res.json())
      .then(updatedToy => {
        this.setState({
          toys: this.state.toys.map(toy => toy.id === updatedToy.id ? updatedToy : toy)
        })
      })
  }

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm handleSubmit={this.handleSubmit}/>
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer toysArray={this.state.toys} handleDelete={this.handleDelete} increaseLikes={this.increaseLikes}/>
      </>
    );
  }

}

export default App;
