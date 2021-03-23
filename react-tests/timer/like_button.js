'use strict';

const e = React.createElement;

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: Date.now()
    }
  }

  render() {
    return e(
      'div',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}

const domContainer = document.querySelector('#timer_container');
ReactDOM.render(e(LikeButton), domContainer);