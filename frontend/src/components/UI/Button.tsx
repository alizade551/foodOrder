type ButtonProps = {
  children: React.ReactNode;
  textOnly: boolean;
  className?: string;
};

function Button({ children, textOnly, className, ...props }: ButtonProps) {
  let cssClasses: string = textOnly ? 'text-button' : 'button';
  if (className) {
    cssClasses += ' ' + className;
  }
  return (
    <button className={cssClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
