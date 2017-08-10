import  React , { Component } from 'react';

import Films from './Films';
import Species from './Species';
import Vehicles from './Vehicles';
import Starships from './Starships';
import Homeworld from './Homeworld'

class Characters extends Component {
  constructor(props) {
    super(props);
    this.rows = this.props.characters
    this.renderRow = this.renderRow.bind(this);
    this.renderFilms = this.renderFilms.bind(this);
    this.renderSpecies = this.renderSpecies.bind(this);
    this.renderVehicles = this.renderVehicles.bind(this);
    this.renderStarships = this.renderStarships.bind(this);
    this.state = {
      totalVote: 25
    }
  }

  renderFilms(item,key) {
      return (
        <Films index={key} filmUrl={item} />
      );
  }
  renderSpecies(item,key){
    return(
        <Species index={key} speciesUrl={item} />
    );
  }
  renderStarships(item,key){
    return(
      <Starships index={key} starshipsUrl={item} />
    )
  }
  renderVehicles(item,key){
    return(
      <Vehicles index={key} vehiclesUrl={item} />
    )
  }
  handleComSubmit(key) {
     // I need to post comments data along with the key to API. I looked at the API documentation and could not find anything to handel this.
     // As result I create this part only for demonstration. Nothing will be saved and all the comments will be lost after refresh. 
     this.rows.results[key].comments  += '\n' + this.refs['nameC' + key].value + '\n' +  this.refs['comments' + key].value + '\n ';
     this.refs['comments' + key].value = '';
     this.refs['nameC' + key].value = '';

     this.forceUpdate();
  }
  setNewNumber(key,e) {
    // The same as comments I needed to post voting data to API. 
    // And again nothing will be saved here and all the votes will be lost after refresh. 
    this.state.totalVote += 1;
     if(e.target.className == "up") {
       this.rows.results[key].vote = this.rows.results[key].vote  + 1;
     } else {
        this.rows.results[key].vote  = this.rows.results[key].vote  - 1;
     }
     this.forceUpdate();
     // sorting result based on number of votes.
     this.rows.results.sort(this.GetSortOrder("vote"));
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
  // As the api provided all data in the first load I did not use http://swapi.co/api/people/:id/ to load the details. To me, it would give the users a faster experience.
  renderRow(key) {
    let char = this.rows.results[key];
    return (
      <div key={key} className="container">
        <a href={"#popup" + (key + 1) } className="btn">
        <span style={{backgroundImage: `url(/images/Star_Wars.png)`}} className="image">
        </span>
          <p>{char.name}</p>
          <p><Homeworld homeworldUrl={char.homeworld}/> </p>
        </a>
        <div className="vote roundrect">
          <div onClick={this.setNewNumber.bind(this, key)} className="up" ref="up"></div>
          <div onClick={this.setNewNumber.bind(this, key)} className="down" ref="down"></div>
          <div className="count">{char.vote}/{this.state.totalVote}</div>
        </div>
        <div id={"popup" + (key + 1) } className="overlay">
          <div className={'popup'}>
          <a className="close" href="#">&times;</a>
              <div className="content">
                <p><label>Name:</label> {char.name}</p>
                <p><label>Height:</label> {char.height}</p>
                <p><label>Mass:</label> {char.mass}</p>
                <p><label>Hair color:</label> {char.hair_color}</p>
                <p><label>Skin color:</label> {char.skin_color}</p>
                <p><label>Eye color:</label> {char.eye_color}</p>
                <p><label>Birth year:</label> {char.birth_year}</p>
                <p><label>Gender:</label> {char.gender}</p>
                <div><label>Homeworld:</label><Homeworld homeworldUrl={char.homeworld}/></div>
                <div style={char.films ? {display:'block'}:{display:'none'}}><label>Films:</label><ul className="child_list">{char.films.map(this.renderFilms)}</ul></div>
                <div style={char.species.length != 0 ? {display:'block'}:{display:'none'}}><label>Species:</label><ul className="child_list">{char.species.map(this.renderSpecies)}</ul></div>
                <div style={char.vehicles.length != 0 ? {display:'block'}:{display:'none'}}><label>Vehicles:</label><ul className="child_list">{char.vehicles.map(this.renderVehicles)}</ul></div>
                <div style={char.starships.length != 0 ? {display:'block'}:{display:'none'}}><label>Starships:</label><ul className="child_list">{char.starships.map(this.renderStarships)}</ul></div>
                <div className="comment">
                  <h2>Add your comments</h2>
                  <form>
                     <h3 className="commentAuthor">
                        From:<input type="text" name={"nameC" + (key) }  placeholder="Please enter your name" ref={"nameC" + key }  />
                     </h3>
                     <textarea name={"comments" + (key) } placeholder="Comments" ref={"comments" + key }/>
                     <input type="button" value="Submit"   className="submit"  onClick={this.handleComSubmit.bind(this, key)} />
                     <p className="comment_txt">{char.comments}</p>
                  </form>
                 </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="row-char">
        {Object.keys(this.rows.results).map(this.renderRow)}
      </div>
    );
  }
}
export default Characters;
