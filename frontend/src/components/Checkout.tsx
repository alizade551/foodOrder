import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useProgress } from '../hooks/useProgress';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';

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

function Checkout() {
  const [form, setForm] = useState<FormState>({
    fullName: { value: '', isTouched: false, error: null },
    email: { value: '', isTouched: false, error: null },
    postalCode: { value: '', isTouched: false, error: null },
    street: { value: '', isTouched: false, error: null },
    city: { value: '', isTouched: false, error: null },
  });

  const { progress, hideCheckOut } = useProgress();
  const { items } = useCart();

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

    console.log(form);
  };

  const handleClose = () => {
    hideCheckOut();
  };

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
        <p className='modal-actions'>
          <Button textOnly={true} onClick={handleClose}>
            Close
          </Button>
          <Button textOnly={false} type='submit'>
            Submit Order
          </Button>
        </p>
      </form>
    </Modal>
  );
}

export default Checkout;
