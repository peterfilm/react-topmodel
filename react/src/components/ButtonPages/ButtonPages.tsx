import styles from "./ButtonPages.module.scss";
import cn from "classnames"

import { ButtonHTMLAttributes, ReactNode } from "react";

export interface IButtonPages extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    appereance?: 'prev' | 'active' | 'next' | 'link'
}

const ButtonPages = ({children, className, appereance = 'link', ...props}: IButtonPages) => {
    return <button className={cn(styles['button'], className, {
        [styles['prev']]: appereance === 'prev',
        [styles['active']]: appereance === 'active',
        [styles['next']]: appereance === 'next',
        [styles['link']]: appereance === 'link',
    })} {...props}>{children}</button>
}

export default ButtonPages