import React , {Component} from 'react'

class Welcome extends Component {

  render() {
    return (
      <div className="header">
          <h2 className="header_sec">{ this.props.title }</h2>
          <p className="header_description">Please select the characters from below</p>
      </div>
    );
  }
}
export default Welcome;
