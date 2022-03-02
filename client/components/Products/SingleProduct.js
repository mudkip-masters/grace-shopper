import React from 'react';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../../store/SingleProduct';
import { connect } from 'react-redux';

class SingleProduct extends React.Component {
  constructor({ id, title, image, price, user, authenticated }) {
    super(id, title, image, price, user, authenticated);
  }

  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.id);
  }

  render() {
    console.log('hello..', this.props.products);
    return (
      <div>
        <Link to={`/products/ProductsDetails/${this.props.match.params.id}`}>
          <section>
            <img className="product-image" src={image} alt="test" />
          </section>
        </Link>
        <section>
          <h3>{title}</h3>
          <p>USD ${price}</p>
          {user && authenticated && (
            <button onClick={handleAddCart} className="add-button">
              Add to Cart
            </button>
          )}
        </section>
      </div>
    );
  }
}

const mapState = (state) => {
  console.log('state in maps', state.products);
  return {
    products: state.products,
  };
};
const mapDispatch = (dispatch) => {
  return {
    fetchProduct: (id) => dispatch(fetchProduct(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleProduct);
