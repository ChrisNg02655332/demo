import { PropsWithChildren } from "react";
import { twMerge } from 'tailwind-merge'

type ButtonProps = {
  text?: string
  variant?: 'primary' | 'secondary'
  className?: string
}

const defaultClass = 'px-3.5 py-2 rounded-md font-medium'

const variants = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-dark'
}

export default function Button({ variant = 'primary', className, children }: PropsWithChildren<ButtonProps>) {
  return <button className={twMerge(defaultClass, variants[variant], className)}>{children}</button>
}
