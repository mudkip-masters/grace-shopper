import React from "react";
import { fetchProduct } from "../../store/SingleProduct";
import { connect } from "react-redux";

class SingleProduct extends React.Component {
  componentDidMount() {
    console.log(this.props, "this.props");
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    console.log(`this is the current product: ${this.props.product.name}`);
    // const product = this.props.products[this.props.match.params.id - 1];
    // console.log("component props", product);
    return (
      <div>
        <ul>
          <li>{this.props.product.name}</li>
          <li>{this.props.product.imageURL}</li>
          <li>{this.props.product.description}</li>
          <li>{this.props.product.price}</li>
          <li>{this.props.product.calories}</li>
        </ul>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log("mapStateProps", state);
  return {
    product: state.product,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
