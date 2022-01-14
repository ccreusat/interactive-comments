import clsx from "clsx";
import { ReactNode } from "react";

type AsProp<C extends React.ElementType> = {
  as?: C;
};

type PropsToOmit<C extends React.ElementType, P> = keyof (AsProp<C> & P);

type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {}
> = React.PropsWithChildren<Props & AsProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  buttonClass: string;
}

export const Button = <C extends React.ElementType = "button">({
  children,
  buttonClass,
  ...rest
}: PolymorphicComponentProp<C, ButtonProps>) => {
  const classNames = clsx(
    {
      button: true,
    },
    buttonClass
  );

  return (
    <button className={classNames} {...rest}>
      {children}
    </button>
  );
};
