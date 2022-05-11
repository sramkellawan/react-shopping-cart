import React, { Component } from "react";
import { connect } from "react-redux";
import { filterProducts, sortProducts } from "../actions/productActions";

class Filter extends Component {
  render() {
    return !this.props.filteredProducts ? (
      <div>Loading filters...</div>
    ) : (
      <div className="filter">
        <div className="filter-result">
          {" "}
          {this.props.filteredProducts.length} Products
        </div>

        <div className="filter-sort">
          Order{" "}
          <select
            value={this.props.sort}
            onChange={(e) =>
              this.props.sortProducts(
                this.props.filteredProducts,
                e.target.value
              )
            }
          >
            <option value="latest">Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </div>
 
        <div className="filter-size">
          Book Status{" "}
          <select
            value={this.props.size}
            onChange={(e) =>
              this.props.filterProducts(this.props.products, e.target.value)
            }
          >
            <option value="">ALL</option>
            <option value="AV">On Sale</option>
            <option value="NR">New Releases</option>
            <option value="CS">Coming Soon</option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    status: state.products.status,
    sort: state.products.sort,
    products: state.products.items,
    filteredProducts: state.products.filteredItems,
  }),
  {
    filterProducts,
    sortProducts,
  }
)(Filter);
