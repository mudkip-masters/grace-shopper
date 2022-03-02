import React from 'react';

const AllProducts = ({ user, authenticated }) => {
  const [products, setProduct] = useState([]);

  // const showProducts = async () => {
  //   const res = await GetProducts();
  //   setProducts(res);
  // };

  return (
    <div className="product">
      {products.length > 0 &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.background_image}
            price={product.price}
            user={user}
            authenticated={authenticated}
          />
        ))}
    </div>
  );
};
export default AllProducts;
