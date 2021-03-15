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
      timesClicked: 0,
    };
    this.handleStagger = this.handleStagger.bind(this);
    this.getGridSize = this.getGridSize.bind(this);
  }

  handleStagger(i) {
    const { columns, rows, timesClicked } = this.state;
    const el = i.target.id;
    if (timesClicked > 0) {
      anime({
        targets: '.grid-item',
        backgroundColor:
          timesClicked <= 14
            ? '#' + Math.floor(Math.random() * 16777215).toString(16)
            : '#FFF',
        scale:
          timesClicked > 2 && timesClicked <= 8
            ? [
                { value: 0.1, easing: 'easeOutSine', duration: 500 },
                { value: 1.1, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 1.1,
        rotate:
          timesClicked > 4 && timesClicked <= 10
            ? [
                { value: 360, easing: 'easeOutSine', duration: 500 },
                { value: -360, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 0,
        translateX:
          timesClicked > 6 && timesClicked <= 12
            ? [
                { value: 360, easing: 'easeOutSine', duration: 500 },
                { value: 0, easing: 'easeInOutQuad', duration: 1200 },
              ]
            : 0,
        opacity: timesClicked === 18 ? { value: 0, duration: 500 } : 1,
        delay: anime.stagger(50, { grid: [columns, rows], from: el }),
      });
      if (timesClicked === 18) {
        anime({
          target: '#thatsAll',
          bakcgroundColor: '#000',
        });
      }
    }

    this.setState({
      timesClicked: timesClicked > 19 ? 0 : timesClicked + 1,
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
    console.log([columns, rows], total);
    return (
      <div>
        {timesClicked === 0 ? (
          <video autoPlay muted onClick={this.handleStagger}>
            <source src="anime.mp4" type="video/mp4" />
          </video>
        ) : (
          <div id="grid">
            {[...Array(total)].map((x, i) => (
              <div className="grid-item" id={i} onClick={this.handleStagger} />
            ))}
            {timesClicked === 19 ? <div id="thatsAll">THAT'S ALL!</div> : null}
            {timesClicked === 20 ? (
              <div id="survey">Now I will send out your forms!</div>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

export default App;
