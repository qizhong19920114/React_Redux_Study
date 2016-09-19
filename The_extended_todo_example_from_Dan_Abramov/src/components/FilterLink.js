import React, { PropTypes }  from 'react';
import {Link} from 'react-router';


//Childern are the text (all,active,complete) passed down from the parent component Footer.js
const FilterLink = ({filter, children}) => (
		<Link 
			to = {filter === 'all' ? '' : filter}
			activeStyle = {{
				textDecoration: 'none',
				color: 'black',
			}}
		>
			{children}
		</Link>
			
	);


FilterLink.propTypes = {
  filter: PropTypes.oneOf(['all', 'completed', 'active']).isRequired,
  children: PropTypes.node.isRequired,
};

export default FilterLink;
			















// comment all this below because we are going to use the React Router; 

// import { connect } from 'react-redux';
// import { setVisibilityFilter } from '../actions';
// import Link from './Link';


// // this file is not even a component, it's just a wraper function that makes Link a smart component
// // This is important because we also pass in {children} to the Link component. and the {children} obviously refers to the "All" "Active" "Imcomplete" in the Footer.js
// // 
// const mapStateToProps = (state, ownProps) => ({
//   active: ownProps.filter === state.visibilityFilter,
// });

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   onClick() {
//     dispatch(setVisibilityFilter(ownProps.filter));
//   },
// });

// const FilterLink = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Link);

// export default FilterLink;
