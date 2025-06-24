import { useState } from 'react';
import './App.css'

function App() {
  
  const products = [
    { name: "Mela", price: 0.5 },
    { name: "Pane", price: 1.2 },
    { name: "Latte", price: 1.0 },
    { name: "Pasta", price: 0.7 },
  ];

  const [addedProducts, setAddedProducts] = useState([]);
  console.log(addedProducts);

  const updateProductQuantity = (name, quantity) => {
    setAddedProducts(curr => 
      curr.map(product => 
        product.name === name ? { ...product, quantity } : product
      )
    );
  }

  const addToCart = (product) => {
    const productInCart = addedProducts.find(p => p.name === product.name);
    if(productInCart) {
      updateProductQuantity(productInCart.name, productInCart.quantity + 1);
      return;
    }

    setAddedProducts(curr => [...curr, {
      ...product,
      quantity: 1
    }]);
  }

  const removeFromCart = (product) => {
   setAddedProducts(curr => curr.filter(p => p.name !== product.name));
  }

  return (
    <>
      <h1>Prodotti disponibili:</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <p>{product.name} - €{product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>Aggiungi al carrello!</button>
          </li>
        ))}
      </ul>
      {addedProducts.length > 0 && (
        <>
          <h2>Carrello:</h2>
          <ul>
            {addedProducts.map((product, index) => (
              <li key={index}>
                <p>{product.name} - €{product.price.toFixed(2)} x {product.quantity}</p>
                <button onClick={() => removeFromCart(product)}>Rimuovi dal carrello</button>
              </li>
            ))}
          </ul>
          <p>
            Totale: €{addedProducts.reduce((total, product) => total + (product.price * product.quantity), 0).toFixed(2)}
          </p>
        </>
      )}
    </>
  )
}

export default App
