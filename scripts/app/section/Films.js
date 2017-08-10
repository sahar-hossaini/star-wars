import  React , { Component } from 'react';
import Axios from 'axios';

class Films extends Component {
  constructor(props) {
    super(props);
    this.filmDetails = {};
    this.state = {
      filmDetails : {}
    }
  }

  componentWillMount() {
    Axios.get(`${this.props.filmUrl}?format=json`)
    .then((response) => {
      this.setState({
        filmDetails : response.data
      });
    })
  }
  render() {
    return (
      <li>
        {this.state.filmDetails.title}
      </li>
    );
  }
}
export default Films;
