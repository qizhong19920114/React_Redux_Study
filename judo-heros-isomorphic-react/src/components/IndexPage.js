// src/components/IndexPage.js
import React from 'react';
import AthletePreview from './AthletePreview';
import athletes from '../data/athletes';

class IndexPage extends React.Component {

  //we need to pass all the information about the current athlete as props using the JSX spread operator ({...object}).	
  //it' like a lazy way of doing name = {atheleteData.name} country = {atheleteData.country}
  render() {
  	console.log("in the IndexPage!!")
    return (
      <div className="home">
        <div className="athletes-selector">
          {athletes.map(athleteData => <AthletePreview key={athleteData.id} {...athleteData} />)}
        </div>
      </div>
    );
  }
}

export default IndexPage; 