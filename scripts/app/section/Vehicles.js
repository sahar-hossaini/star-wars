import  React , { Component } from 'react';
import Axios from 'axios';

class Vehicles extends Component{
  constructor(props){
      super(props);
      this.state = {
        vehiclesDetails : {}
      }
  }
  componentWillMount(){
    Axios.get(`${this.props.vehiclesUrl}?format=json`)
    .then((response) =>{
      this.setState({
        vehiclesDetails : response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <span className="child_list">
        {this.state.vehiclesDetails.name}
      </span>
    )
  }
}
export default Vehicles;
