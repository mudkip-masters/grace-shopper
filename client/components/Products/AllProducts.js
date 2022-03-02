import React from 'react';
import { setProducts } from '../../store/products';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';

class AllProducts extends React.Component {
  constructor({ user, authenticated }) {
    super({ user, authenticated });
  }
  // const [products, setProduct] = useState([]);

  // const showProducts = async () => {
  //   const res = await GetProducts();
  //   setProducts(res);
  // };

  componentDidMount() {
    this.props.setProducts();
  }

  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div className="product">
        {products.length > 0 &&
          products.map((product) => (
            <SingleProduct
              key={product.id}
              id={product.id}
              title={product.name}
              image={product.imageURL}
              price={product.price}
              // user={user}
              // authenticated={authenticated}
            />
          ))}
      </div>
    );
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
