import React from 'react';

//displays a heading for each category
class ProductCategoryRow extends React.Component {
  render() {
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

//displays a row for each product
class ProductRow extends React.Component {
  render() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: 'red'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

//displays and filters the data collection based on user input
class ProductTable extends React.Component {
  render() {
    var rows = [];
    var lastCategory = null;
    
    //interesting they use an array here instead of a map but I guess the purpose is later on to filter and process the array data
    this.props.products.forEach(function(product) {
      //indexOf is a way to check if the name contains the text; 
      //the second condition here is to make sure not displaying the item when product is out of stock and inStockOnly option is checked
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      //this is kind of a lazy way of displaying catogery and and display item.
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      // set this so we can use the if statement above to check if the catogery changed. if changed, we need to display teh product category first. 
      lastCategory = product.category; 
    }.bind(this));
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

// we still need to add the component handle to handle the change 
// add a constructor because we need to write event handler
class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  //I'm sure the onUserInput is passed in from the upper level component, just like how we don't use state for the search bar but we use props because the other component is sharing the same prop.
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  }
  // ref is what you can get the value from the user
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." value={this.props.filterText} ref="filterTextInput" onChange={this.handleChange}/>
        <p>
          <input type="checkbox" checked={this.props.inStockOnly} ref="inStockOnlyInput" onChange={this.handleChange}/>
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

export default class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    //these two cannot be calculated or passed from props so they needs to be states
    this.state = {
      filterText: '',
      inStockOnly: false
    };
    //I guess, this is necessary because we want to use this in the handleUserInput function. 
    // or we may not to do this if we use the arrow function in the render..
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  handleUserInput(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
        />
      </div>
    );
  }
}


 
