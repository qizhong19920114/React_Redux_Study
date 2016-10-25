// src/components/AthletePage.js
// Hold on, I will go back and look at this page. 
import React from 'react';
import { Link } from 'react-router';
import NotFoundPage from './NotFoundPage';
import AthletesMenu from './AthletesMenu';
import Medal from './Medal';
import Flag from './Flag';
import athletes from '../data/athletes';

class AthletePage extends React.Component {
  render() {
    console.log("in the athlete page!!!")
    //get the id passed in by router 
    const id = this.props.params.id;
    //we filter under the criteria that we only get the athlete with matched id. If can't find any, then that means the id is invalid. 
    const athlete = athletes.filter((athlete) => athlete.id === id)[0];
    if (!athlete) {
      return <NotFoundPage/>;
    }
    //use string formatting to set the url for img for certain athlete; 
    // the header use style to set the background
    const headerStyle = { backgroundImage: `url(/img/${athlete.cover})` };

    return (
      <div className="athlete-full">
        <AthletesMenu/>
        <div className="athlete">
          <header style={headerStyle}/>
          <div className="picture-container">
            <img src={`/img/${athlete.image}`}/>
            <h2 className="name">{athlete.name}</h2>
          </div>
          <section className="description">
            Olympic medalist from <strong><Flag code={athlete.country} showName="true"/></strong>,
            born in {athlete.birth} (Find out more on <a href={athlete.link} target="_blank">Wikipedia</a>).
          </section>
          <section className="medals">
            <p>Winner of <strong>{athlete.medals.length}</strong> medals:</p>
            <ul>{
              athlete.medals.map((medal, i) => <Medal key={i} {...medal}/>)
            }</ul>
          </section>
        </div>
        <div className="navigateBack">
          <Link to="/">« Back to the index</Link>
        </div>
      </div>
    );
  }
}

export default AthletePage; 
