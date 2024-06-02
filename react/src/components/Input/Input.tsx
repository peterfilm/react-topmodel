import styles from "./Input.module.scss";
import cn from "classnames"

import { InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    appereance?: 'big' | 'bigError' | 'small'
}

const Input = ({className, appereance = 'big', ...props}: InputProps) => {
    return <input className={cn(styles['button'], className, {
        [styles['big']]: appereance === 'big',
        [styles['bigError']]: appereance === 'bigError',
        [styles['small']]: appereance === 'small'
    })} {...props}/>
}

export default Input