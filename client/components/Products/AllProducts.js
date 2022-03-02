import React from "react";
import { setProducts } from "../../store/products";
import { connect } from "react-redux";
import SingleProduct from "./SingleProduct";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.setProducts();
  }

  allProducts(products) {
    return (
      <div>
        {products.map((product) => {
          <SingleProduct key={product.id} product={product} />;
        })}
      </div>
    );
  }

  render() {
    const { products } = this.props;
    console.log(products);
    return <div>{this.allProducts(products)}</div>;
  }
}

const mapState = (state) => {
  return {
    products: state.products,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setProducts: () => dispatch(setProducts()),
  };
};

export default connect(mapState, mapDispatch)(AllProducts);
