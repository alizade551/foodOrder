import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useProgress } from '../hooks/useProgress';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';
import useHttp from '../hooks/useHttp';
import Error from './Error';

type FormField = {
  value: string;
  isTouched: boolean;
  error: string | null;
};

type FormState = {
  fullName: FormField;
  email: FormField;
  postalCode: FormField;
  street: FormField;
  city: FormField;
};

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const formInitialState: FormState = {
  fullName: { value: '', isTouched: false, error: null },
  email: { value: '', isTouched: false, error: null },
  postalCode: { value: '', isTouched: false, error: null },
  street: { value: '', isTouched: false, error: null },
  city: { value: '', isTouched: false, error: null },
};

function Checkout() {
  const [form, setForm] = useState<FormState>(formInitialState);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const { progress, hideCheckOut } = useProgress();
  const { items, clearItems } = useCart();

  const cartTotal: number = items.reduce((acc, el) => acc + parseFloat(el.price) * el.quantity, 0);

  const validateField = (identifier: keyof FormState, value: string): string | null => {
    if (value.trim() === '') {
      return `${identifier.charAt(0).toUpperCase() + identifier.slice(1)} is required.`;
    }
    if (identifier === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }
    return null;
  };

  const handleChangeInput = (identifier: keyof FormState, value: string) => {
    setForm((prevState) => ({
      ...prevState,
      [identifier]: {
        value,
        isTouched: true,
        error: validateField(identifier, value),
      },
    }));
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const updatedForm = Object.keys(form).reduce((acc, key) => {
      const field = form[key as keyof FormState];
      return {
        ...acc,
        [key]: {
          ...field,
          isTouched: true,
          error: validateField(key as keyof FormState, field.value),
        },
      };
    }, {} as FormState);

    setForm(updatedForm);

    if (Object.values(updatedForm).some((field) => field.error !== null)) {
      return;
    }

    sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: form,
        },
      })
    );

    // fetch('http://localhost:3000/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     order: {
    //       items,
    //       customer: form,
    //     },
    //   }),
    // });
  };

  const handleClose = () => {
    hideCheckOut();
  };

  const handleFinish = () => {
    hideCheckOut();
    clearItems();
    clearData();
    setForm(formInitialState);
  };

  let actions = (
    <>
      <Button textOnly={true} onClick={handleClose}>
        Close
      </Button>
      <Button textOnly={false} type='submit'>
        Submit Order
      </Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data</span>;
  }

  if (data && !error) {
    console.log(data, error, progress);
    return (
      <Modal open={progress === 'CHECKOUT'} onClose={handleClose}>
        <h2>Success</h2>
        <p>Your order was submitted successfully</p>
        <p>We will get back to you with more details via email within the next few minutes</p>
        <p className='modal-actions'>
          <Button textOnly={false} onClick={handleFinish}>
            Okay
          </Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === 'CHECKOUT'} onClose={handleClose}>
      <form onSubmit={onSubmitHandler}>
        <h2>Checkout</h2>
        <p>Total amount: ${cartTotal.toFixed(2)}</p>

        <Input
          label='Full name'
          type='text'
          id='fullName'
          value={form.fullName.value}
          onChange={(e) => handleChangeInput('fullName', e.target.value)}
          error={form.fullName.isTouched ? form.fullName.error : null}
        />
        <Input
          label='E-mail address'
          type='email'
          id='email'
          value={form.email.value}
          onChange={(e) => handleChangeInput('email', e.target.value)}
          error={form.email.isTouched ? form.email.error : null}
        />
        <Input
          label='Street'
          type='text'
          id='street'
          value={form.street.value}
          onChange={(e) => handleChangeInput('street', e.target.value)}
          error={form.street.isTouched ? form.street.error : null}
        />
        <div className='control-row'>
          <Input
            label='Postal code'
            id='postalCode'
            type='text'
            value={form.postalCode.value}
            onChange={(e) => handleChangeInput('postalCode', e.target.value)}
            error={form.postalCode.isTouched ? form.postalCode.error : null}
          />
          <Input
            label='City'
            id='city'
            type='text'
            value={form.city.value}
            onChange={(e) => handleChangeInput('city', e.target.value)}
            error={form.city.isTouched ? form.city.error : null}
          />
        </div>

        {error && <Error title='Failed to submit order' message={error} />}

        <p className='modal-actions'>{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
