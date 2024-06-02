import styles from "./Select.module.scss";
import cn from "classnames"

import { ButtonHTMLAttributes, ReactNode } from "react";

export interface SelectProps extends ButtonHTMLAttributes<HTMLSelectElement> {
    children: ReactNode;
    appereance?: 'big' | 'small'
}

const Select = ({children, className, appereance = 'small', ...props}: SelectProps) => {
    return <select className={cn(styles['button'], className, {
        [styles['small']]: appereance === 'small',
        [styles['big']]: appereance === 'big'
    })} {...props}>{children}</select>
}

export default Select