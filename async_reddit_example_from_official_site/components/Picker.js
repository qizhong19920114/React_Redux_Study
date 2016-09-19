import React, {Component, PropTypes} from 'react'

export default class Picker extends Component {

  render(){
    //create properties for the component. 
    const {value,onChange,options} = this.props 
    // In the select, the first onChange is the select tag event handler
    // In the select, the second onChange is the prop function passed in from props
    // 
    // use map function to populate the list 
    // option is a default html tag, value is a default attr, key is a new added attr
    // 
    // notice that e.target.value is not the same as the value attribute; The value attribute 
    // is coming from the state field in the store, teh e.target.value is coming from the selecting event. but
    // the value of the selected field is not updated until the data flow from action -> reducer -> store -> provider -> container
    return (
        <span>
          <h1>{value}</h1>

          <select onChange={e=> onChange(e.target.value)} value = {value}>
            {options.map(option => 
                <option value={option} key={option}>
                  {option}
                </option>)
            }
          </select>
        </span>
      )
  }
}

Picker.PropTypes = {
  options: PropTypes.arrayOf(
      PropTypes.string.isRequired
    ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}