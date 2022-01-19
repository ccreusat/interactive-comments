type ButtonProps = {
  text: string;
  buttonClass: string;
  onClick: () => void;
};

export const Button = ({ text, buttonClass, onClick }: ButtonProps) => {
  return (
    <button className={`button ${buttonClass}`} onClick={onClick}>
      {text}
    </button>
  );
};
