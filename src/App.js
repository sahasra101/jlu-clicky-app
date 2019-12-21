import React, { Component } from "react";
import NavBar from "./components/NavBar";
import ImageCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import jluimages from "./jluimages.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    jluimages: jluimages,
    currentScore: 0,
    topScore: 0,
    navMiddleMessage: "Click An Image To Begin!",
    clicked: []
  };

  shuffle = array => {
    let i = array.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  shuffleImages = event => {
    let jluimages = this.shuffle(this.state.jluimages);
    let id = event.target.id;
    this.setState({ jluimages }, 
    this.checkScore(id));
  }
 
  setTopScore = () => {
    if (this.state.currentScore > this.state.topScore) {
      this.setState({topScore: this.state.currentScore});
    }
  }

  checkScore = clickedId => {
    let clickedArray = this.state.clicked;
    
    if (clickedArray.includes(clickedId)) {
        this.setState({
          currentScore: 0,
          clicked: [],
          navMiddleMessage: "Please try again!"
        })
      }
     else {
      this.state.clicked.push(clickedId);
      this.setState({
        navMiddleMessage: "You Guessed Correctly!!",
        clicked: this.state.clicked,
        currentScore: this.state.currentScore + 1
      }, function() {
      this.setTopScore();
      });
    }

    if (this.state.clicked.length === 12) {
      this.setState({
        navMiddleMessage: "Congrats You Win! Play again!",
        clicked: [],
        currentScore: 0,
        topScore: 12
      });
    }
  }

  // Map over this.state.jluimages and render a ImageCard component for each JSON object
  render() {
    return (
      <div>
        <NavBar
          currentScore={this.state.currentScore}
          topScore={this.state.topScore}
          navMiddleMessage={this.state.navMiddleMessage}
        />
        <Wrapper>
          <Title>Superfriends Image Game
        <br />
            <h5>Get 1 Point for Clicking Each Image Once</h5>
            <h5>Avoid Clicking Any Image Twice</h5>
          </Title>
          {this.state.jluimages.map(img => (
            <ImageCard
              shuffleImages={this.shuffleImages}
              id={img.id}
              key={img.id}
              name={img.name}
              image={img.image}
            />
          ))}
        </Wrapper>
        <footer class="footer"/>
      </div>
    );
  }
}

export default App;
