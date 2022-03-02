import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Transistion from "react-transition-group/Transition";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false
  }

  showModal = () => {
    this.setState({ modalIsOpen: true })
  }
  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <br />
        <button className="Button" onClick={() =>
          this.setState(prevState => ({ showBlock: !prevState.showBlock }))}>Toggle</button>
        {/* {this.state.showBlock ?  : null} */}
        <Transistion
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
        >
          {state => (<div style={{
            backgroundColor: "red",
            width: "100px",
            height: "100px",
            margin: "auto",
            transition: 'opacity 1s ease-out',
            // opacity: state === 'entering' ? 1 : 0,
            opacity: state === 'exiting' ? 0 : 1
          }}></div>)}

        </Transistion>
        <br />
        <br />
        <Transistion
          in={this.state.modalIsOpen}
          timeout={300}
          mountOnEnter
          unmountOnExit
        >
          {state => (<Modal
            show={state}
            closed={this.closeModal}
          />)}
        </Transistion>
        {this.state.modalIsOpen ? <Backdrop show /> : null}
        <button className="Button" onClick={this.showModal}>Open Modal</button>
        <h3>Animating Lists</h3>
        <List />
      </div >
    );
  }
}

export default App;
