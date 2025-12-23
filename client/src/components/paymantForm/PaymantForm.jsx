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
import toast from 'react-hot-toast';
import { useUserContext } from '../../context/userContext';

export function PaymentForm({ user, amount, handleCreateBooking }) {
  const stripe = useStripe();
  const elements = useElements();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const { updateBookings } = useUserContext();

  const handlePay = async () => {
    setIsSuccess(false);
    if (!stripe || !elements) {
      toast.error('Платежная система не загружена');
      return;
    }
    if (!name || !email) {
      toast.error('Заполните имя и email');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Сначала создаем бронирование
      let bookingResult;
      try {
        bookingResult = await handleCreateBooking();
        if (!bookingResult || !bookingResult.id) {
          throw new Error('Не удалось создать бронирование');
        }
        setBookingId(bookingResult.id);
        toast.success('Бронирование создано');
      } catch (bookingError) {
        console.error('Ошибка при создании бронирования:', bookingError);
        toast.error(
          'Не удалось создать бронирование. Проверьте данные и попробуйте снова',
        );
        return;
      }

      // 2. Создаём платежный intent на сервере с ID бронирования
      const { clientSecret } = await request('/booking/Payment', {
        method: 'POST',
        body: {
          name,
          email,
          amount: Math.round((amount / 2) * 100), // Округляем до копеек
          bookingId: bookingResult.id, // Передаем ID бронирования
        },
      });

      if (!clientSecret) {
        toast.error('Не удалось создать платеж. Обратитесь в поддержку');
        // Отменяем бронирование, если не удалось создать платеж
        await cancelBooking(bookingResult.id);
        return;
      }

      // 3. Подтверждаем платёж
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name,
            email,
          },
        },
      });

      if (paymentResult.error) {
        setIsSuccess(false);
        toast.error(paymentResult.error.message || 'Ошибка при оплате');
        // Отменяем бронирование при ошибке оплаты
        await cancelBooking(bookingResult.id);
      } else {
        setIsSuccess(true);

        try {
          // Подтверждаем оплату бронирования на сервере
          await confirmBookingPayment(bookingResult.id);
          toast.success('Оплата прошла успешно! Бронирование подтверждено 🎉');

          // Обновляем список бронирований
          await updateBookings();
        } catch (confirmError) {
          console.error('Ошибка при подтверждении оплаты:', confirmError);
          toast.error('Оплата прошла, но произошла ошибка. Обратитесь в поддержку');
        }
      }
    } catch (error) {
      console.error('Общая ошибка при обработке платежа:', error);
      toast.error('Произошла ошибка при обработке платежа. Попробуйте еще раз');
    } finally {
      setIsLoading(false);
    }
  };

  // Функция для отмены бронирования при ошибке оплаты
  const cancelBooking = async (id) => {
    try {
      await request(`/booking/${id}/cancel`, {
        method: 'POST',
      });
      console.log('Бронирование отменено из-за ошибки оплаты');
    } catch (error) {
      console.error('Ошибка при отмене бронирования:', error);
    }
  };

  // Функция для подтверждения оплаты бронирования
  const confirmBookingPayment = async (id) => {
    try {
      await request(`/booking/${id}/confirm-payment`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Ошибка при подтверждении оплаты бронирования:', error);
      throw error;
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
            <small
              style={{
                fontSize: '12px',
                color: '#666',
                display: 'block',
                marginTop: '5px',
              }}
            >
              (50% предоплата от общей суммы {formatPrice(amount)})
            </small>
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
          disabled={isSuccess}
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
          disabled={isSuccess}
        />

        <button
          onClick={handlePay}
          disabled={!stripe || isLoading || isSuccess}
          className={`payment-card__button ${isSuccess ? 'payment-card__button--success' : ''} ${!stripe ? 'payment-card__button--disabled' : ''}`}
        >
          {!stripe
            ? 'Загрузка...'
            : !isSuccess
              ? isLoading
                ? 'Обработка...'
                : 'Оплатить'
              : 'Оплачено ✅'}
        </button>

        {isSuccess && bookingId && (
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Номер бронирования: <strong>{bookingId}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
