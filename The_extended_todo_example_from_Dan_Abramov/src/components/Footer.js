import React from 'react';
import FilterLink from './FilterLink';

// This is not a smart component, but its child component "FilterLink" is a smart component; "FilterLink is actually just a wrapper for Link. 
// This component is used in the main App, which means that a component that is used in the main App doesn't have to be a smart component. 

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter="all">
      All
    </FilterLink>
    {", "}
    <FilterLink filter="active">
      Active
    </FilterLink>
    {", "}
    <FilterLink filter="completed">
      Completed
    </FilterLink>
  </p>
);

export default Footer;
