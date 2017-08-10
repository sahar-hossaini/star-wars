import  React , { Component } from 'react';
import Axios from 'axios';

class Starships extends Component{
  constructor(props){
      super(props);
      this.state = {
        starshipsDetails : {}
      }
  }
  componentWillMount(){
    Axios.get(`${this.props.starshipsUrl}?format=json`)
    .then((response) =>{
      this.setState({
        starshipsDetails : response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <span className="child_list">
        {this.state.starshipsDetails.name}
      </span>
    )
  }
}
export default Starships;
