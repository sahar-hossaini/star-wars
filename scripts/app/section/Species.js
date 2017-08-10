import  React , { Component } from 'react';
import Axios from 'axios';

class Species extends Component{
  constructor(props){
      super(props);
      this.state = {
        speciesDetails : {}
      }
  }
  componentWillMount(){
    Axios.get(`${this.props.speciesUrl}?format=json`)
    .then((response) =>{
      this.setState({
        speciesDetails : response.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render(){
    return(
      <span className="child_list">
      {this.state.speciesDetails.name}
      </span>
    )
  }
}
export default Species;
