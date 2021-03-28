import React from 'react';
import anime from '../../../node_modules/animejs/lib/anime.es.js';
import Logo from './Logo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: 0,
      rows: 0,
      total: 1,
      timesClicked: -5,
      smallClick: 0,
    };
    this.handleStagger = this.handleStagger.bind(this);
    this.getGridSize = this.getGridSize.bind(this);
    this.handleSmallDemos = this.handleSmallDemos.bind(this);
  }

  handleStagger(e) {
    const { columns, rows, timesClicked } = this.state;
    if (timesClicked === 2) {
      document.body.style.backgroundColor = 'black';
    }
    if (timesClicked > 2) {
      const el = e.target.id;
      anime({
        targets: '.grid-item',
        backgroundColor:
          timesClicked <= 16
            ? '#' + Math.floor(Math.random() * 16777215).toString(16)
            : '#FFF',
        scale:
          timesClicked > 4 && timesClicked <= 10
            ? [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1.1, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 1.1,
        rotate:
          timesClicked > 6 && timesClicked <= 12
            ? [
                { value: 360, easing: 'easeOutSine', duration: 500 },
                { value: -360, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 0,
        translateX:
          timesClicked > 8 && timesClicked <= 14
            ? [
                { value: 360, easing: 'easeOutSine', duration: 500 },
                { value: 0, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 0,
        opacity: timesClicked === 18 ? { value: 0, duration: 500 } : 1,
        delay: anime.stagger(50, { grid: [columns, rows], from: el }),
      });
      if (timesClicked === 20) {
        anime({
          target: '#thatsAll',
          bakcgroundColor: '#000',
        });
      }
    }
    if (timesClicked === 1) {
      setTimeout(this.handleStagger, 1000)
    }

    this.setState({
      timesClicked: timesClicked > 20 ? 3 : timesClicked + 1,
    });
  }

  handleSmallDemos(e) {
    if(e) {
      e.preventDefault();
    }
    const { smallClick, timesClicked } = this.state;
    switch (smallClick) {
      case 0:
        anime({
          targets: '#red',
          backgroundColor: '#F00',
          scale: 50,
          translateY: '-1px',
          duration: 2000,
          easing:
        });
        break;
      case 1:
        anime({
          targets: '#red',
          translateX: 5,
        });
        break;
      case 2:
        anime({
          targets: '#red',
          translateX: 0,
        });
        break;
      case 3:
        anime({
          targets: '#red',
          scale: 5,
        });
        break;
      case 4:
        anime({
          targets: '#red',
          scale: 50,
        });
        break;
      case 5:
        anime({
          targets: '#red',
          translateX: 3,
          rotate: '1turn',
          backgroundColor: '#FFF',
          borderRadius: ['0%', '65%'],
          easing: 'easeInOutQuad',
        });
        break;
      case 6:
        setTimeout(this.handleSmallDemos, 2000);
        anime({
          targets: '#red',
          scale: [50, 3000],
          translateX: 0,
          translateY: 0,
          duration: 5000,
        });
        break;
      case 7:
        document.body.style.backgroundColor = 'white';
        setTimeout(this.handleStagger, 1);
        setTimeout(this.handleStagger, 1);
        break;
      default:
        break;
    }

    this.setState({
      smallClick: smallClick + 1,
    });
  }

  getGridSize() {
    const columns = Math.floor(document.body.clientWidth / 50);
    const rows = Math.floor(document.body.clientHeight / 50);

    this.setState({ columns, rows, total: rows * columns });
    anime({
      targets: '.grid-item',
      backgroundColor: '#fff',
      duration: 0,
      easing: 'linear',
    });
  }

  componentDidMount() {
    this.getGridSize();
    window.addEventListener('resize', this.getGridSize);
  }

  render() {
    const { total, columns, rows, timesClicked } = this.state;

    return (
      <div>
        {timesClicked < 3 ? (
          timesClicked === -5 ? (
              <video autoPlay muted onClick={this.handleStagger}>
                <source src="anime.mp4" type="video/mp4" />
              </video>
          ) : timesClicked === -4 ? (
            <div id="pres"  onClick={this.handleStagger}>
              <div id="pageOne">
                <h1>What is Anime.js?</h1>
                <p>JavaScript animation library</p>
                <p>Animates CSS properties, DOM elements, and SVGs</p>
                <p>Extremely light weight and efficient</p>
              </div>
            </div>
          ) : timesClicked === -3 ? (
            <div id="pres"  onClick={this.handleStagger}>
              <div id="pageTwo">
                <h1>Why use Anime.js?</h1>
                <p>Much simpler to write than css animations</p>
                <p>Allows you to write your animations directly in javascript</p>
                <p>Built in additional functionality (I'll show some of this shortly)</p>
              </div>
            </div>
          ) : timesClicked === -2 ? (
            <div id="pres"  onClick={this.handleStagger}>
              <div id="pageTwo">
                <h1>Live Coding!</h1>
              </div>
            </div>
          ) : timesClicked === -1 ? (
            <div id="pageThree">
              <div id="red" />
              <form onSubmit={this.handleSmallDemos}>
                <textarea id="liveCoding" />
                <input id="runcode" type="submit" value="Run Code"/>
              </form>
            </div>
          ) : timesClicked === 1 ? (
            <div id="pres"  onClick={this.handleStagger}>
              <div id="pageFour">
                <h1>Other Fun Things</h1>
                <p>Grid</p>
                <p>Stagger</p>
                <p>Promise/Callback Support</p>
                <p>Clean docs with great examples</p>
              </div>
            </div>
          ) : null
        ) : (
          <div id="grid">
            {[...Array(total)].map((x, i) => (
              <div className="grid-item" id={i} onClick={this.handleStagger} />
            ))}

            {timesClicked === 19 ? <div id="thatsAll">THAT'S ALL!</div> : null}
            {timesClicked === 20 ? (
              <div id="survey">Look in chat for a form!</div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
