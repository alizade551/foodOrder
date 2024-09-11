type InputProps = {
  label: string;
  id: string;
  error?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className='control'>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
      {error && <p className='error-message'>{error}</p>}
    </div>
  );
}

export default Input;
