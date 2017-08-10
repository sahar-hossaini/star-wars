import  React , { Component } from 'react';
import Axios from 'axios';

class Homeworld extends Component {
  constructor(props) {
    super(props);
    this.homeDetails = {};
    this.state = {
      homeDetails : {}
    }
  }

  componentWillMount() {
    Axios.get(`${this.props.homeworldUrl}?format=json`)
    .then((response) => {
      this.setState({
        homeDetails : response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  render() {
    if (this.state.homeDetails.name){
    return (
        <span>{this.state.homeDetails.name}</span>
    );
  } else {
     return <span>
       Loading...
      </span>
  }
  }
}
export default Homeworld;
