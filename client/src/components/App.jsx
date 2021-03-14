import React from 'react';
import anime from '../../../node_modules/animejs/lib/anime.es.js'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  handleBarClick (e) {
    anime({
      targets: '#leftBar',
      translateY: [0, 150],
      width: ['100%', '1000%'],
      backgroundColor: ['rgb(169, 169, 169)', '#FFF'],
      direction: 'alternate',
      easing: 'easeInOutSine',
      duration: 500
    })
    anime({
      targets: '#rightBar',
      height: ['98%', '15%'],
      duration: 500,
      direction: 'alternate',
      easing: 'easeInOutSine',
    })
  }


  render() {
    return (
      <div id="container">
        <div id="leftBar" className="sideBar" onClick={this.handleBarClick}></div>
        <div id="rightBar" className="sideBar" onClick={this.handleBarClick}></div>
      </div>
    )
  }
}

export default App