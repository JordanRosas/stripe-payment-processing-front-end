import React, {useState} from 'react'
import logo from './logo.svg';
import './App.css';
import StripeCheckout from 'react-stripe-checkout'
function App() {
  const [product, setProduct] = useState({
    name:"Product Description",
    price: 10,
    productBy:"Company"
  })

  const makePayment = token => {
    const body = {
      token,
      product
    }
    const headers = {
      "Content-Type":"application/json"
    }

    return fetch("http://localhost:3001/payment", {
      method:"POST",
      headers,
      body: JSON.stringify(body)
    })
    .then(res => {
      console.log('RESPONSE',res)
      const {status} = res
      console.log("STATUS", status)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >

        </a>
        <StripeCheckout 
          stripeKey="pk_test_"
          token={makePayment}
          name="Buy Product"
          amount={product.price *  100}>
            <button className="btn-large pink">Buy X for ${product.price}</button>
          </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
