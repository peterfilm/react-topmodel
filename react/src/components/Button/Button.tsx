import styles from "./Button.module.scss";
import cn from "classnames"

import { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    appereance?: 'big' | 'bigError' | 'small' | 'main' | 'smallWhite' | 'smallBeige' | 'blackMiddle' | 'middleWhite'
}

const Button = ({children, className, appereance = 'small', ...props}: ButtonProps) => {
    return <button className={cn(styles['button'], className, {
        [styles['small']]: appereance === 'small',
        [styles['smallWhite']]: appereance === 'smallWhite',
        [styles['smallBeige']]: appereance === 'smallBeige',
        [styles['big']]: appereance === 'big',
        [styles['bigError']]: appereance === 'bigError',
        [styles['blackMiddle']]: appereance === 'blackMiddle',
        [styles['middleWhite']]: appereance === 'middleWhite',
        [styles['main']]: appereance === 'main',
    })} {...props}>{children}</button>
}

export default Button