import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/index.scss';
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './lib/stripe';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </BrowserRouter>,
);
