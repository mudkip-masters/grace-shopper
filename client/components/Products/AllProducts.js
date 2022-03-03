import React from "react";
import { setProducts } from "../../store/products";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    return (
      <div>
        {this.props.products === undefined || this.props.products === []
          ? "No food"
          : this.props.products.map((product) => {
              return (
                <div key={product.id}>
                  <p>
                    <Link to={`/products/${product.id}`}>
                      Food Name:
                      {product.name}
                    </Link>
                    &nbsp;&nbsp;&nbsp;
                  </p>
                  <p>
                    <img src={product.imageURL} />
                  </p>
                  <p>
                    <u>Food description: </u>
                    {product.description}
                  </p>
                  <p>
                    <u>Food Price: </u> {product.price}
                  </p>
                  <p>
                    <u>Product calories: </u>
                    {product.calories}
                  </p>
                </div>
              );
            })}
      </div>
    );
  }
}

const mapState = (state) => {
  //console.log("mapStateProps", state);
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
