import { useState } from 'react';
import {
  CardElement,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import './paymantForm.scss';
import { formatPrice } from '../../utils/formatPrice';
import { request } from '../../services/request';
export function PaymentForm({ user, amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handlePay = async () => {
    setIsSuccess(false);
    if (!stripe || !elements) return;
    if (!name || !email) {
      alert('Заполните имя и email');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Создаём intent на сервере
      const { clientSecret } = await request('/booking/Payment', {
        method: 'POST',
        body: {
          name,
          email,
          amount: (amount / 2) * 100,
        },
      });

      console.log(clientSecret);

      // 2. Подтверждаем платёж
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (result.error) {
        setIsSuccess(false);
        alert(result.error.message);
      } else {
        setIsSuccess(true);
        alert('Оплата прошла успешно 🎉');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-card">
      <div className="card-fields">
        <span style={{ fontWeight: 'bold' }}>Данные карты</span>
        <CardNumberElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#000',
                letterSpacing: '0.5px',
                fontFamily: 'Arial, sans-serif',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#fa755a',
              },
            },
          }}
        />
        <div className="card-fields__add-data">
          <CardExpiryElement
            className="card-fields__card-date"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000',
                  letterSpacing: '0.5px',
                  fontFamily: 'Arial, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
          <CardCvcElement
            className="card-fields__card-cvc"
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#000',
                  letterSpacing: '0.5px',
                  fontFamily: 'Arial, sans-serif',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#fa755a',
                },
              },
            }}
          />
        </div>

        <div className="paymant-card__amount">
          <p>
            К оплате{' '}
            <span className="payment-card__price">{formatPrice(amount / 2)}</span>
          </p>
        </div>
      </div>

      <div className="payment-card__user-data">
        <label htmlFor="userName" className="payment__label">
          Имя
        </label>
        <input
          id="userName"
          className="payment-card__input"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="userEmail" className="payment__label">
          Почта
        </label>
        <input
          id="userEmail"
          className="payment-card__input"
          placeholder="Введите почту"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handlePay}
          disabled={!stripe || isLoading || isSuccess}
          className={`payment-card__button ${isSuccess ? 'payment-card__button--success' : ''}`}
        >
          {!isSuccess ? (isLoading ? 'Оплата...' : 'Оплатить') : 'Оплачено'}
        </button>
      </div>
    </div>
  );
}
