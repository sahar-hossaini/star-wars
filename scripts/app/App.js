import React , {Component} from 'react';
import Axios from 'axios';

import Header from './section/Header';
import Welcome from './section/Welcome';
import Characters from './section/Characters';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters : {},
      dataSearch :'',
      dataPage :''
    }
    this.loadData = this.loadData.bind(this);
    this.GetSortOrder = this.GetSortOrder.bind(this);
  }
  loadData(){
  let url = "http://swapi.co/api/people/?format=json";
  if (this.state.dataPage != '')
      {
          url = this.state.dataPage + '&format=json';
          this.state.dataPage = '';
      }
  if (this.state.dataSearch != '')
          url = url + '&search=' + this.state.dataSearch
    Axios.get(url)
    .then((response) => {
            response.data.results.forEach(function(item) {
                 Object.defineProperties(item,{
                    'comments': {
                      value: '',
                      writable: true
                    },
                    'vote': {
                      value: 0,
                      writable: true
                    }
               });
            });
            // As I API did not let me to save anything, this part will update result objectwith some sample data for demo purposes
            if (response.data.results){
             try {
                     response.data.results[1].vote = 3;
                     response.data.results[2].vote = 7;
                     response.data.results[5].vote = 15;
                 }
             catch(err) {}
           }
           if (response.data.results)
              response.data.results.sort(this.GetSortOrder("vote"));

            this.setState({
              characters : response.data
            });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  componentWillMount() {
    this.loadData();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({characters : {}});
    this.state.dataSearch =  this.refs.name.value;
    this.loadData();
  }
  handleNext(e){
    e.preventDefault();
    this.setState({characters : {}});
    this.state.dataPage =  this.state.characters.next;
    this.loadData();
  }
  handlePrevious(e){
    e.preventDefault();
    this.setState({characters : {}});
    this.state.dataPage =  this.state.characters.previous;
    this.loadData();
  }
  GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
  }

  render() {
    if (this.state.characters.results){
      return (
          <div>
              <Header />
              <Welcome title="Star Wars Characters" />
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="search_box">
                  <input type="text" name="name" placeholder="Search by name here" ref="name" />
                  <input type="submit" value="Submit" className="submit"/>
                </div>
              </form>
              <Characters characters={this.state.characters} />
              <button ref="previous" style={this.state.characters.previous ?{display:''}:{display:'none'}}  onClick={this.handlePrevious.bind(this)} className="paging prev_btn"><span></span>Previous page</button>
              <button ref="next" style={this.state.characters.next ?{display:''}:{display:'none'}}  onClick={this.handleNext.bind(this)} value=""  className="paging next_btn">Next page<span></span></button>
          </div>
        );
      }else {
         return <div>
           <Header />
           <Welcome title="Star Wars Characters" />
           <div className="loader">Loading...</div>
          </div>
      }
  }
}
