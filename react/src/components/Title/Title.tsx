import styles from "./Title.module.scss";
import { ReactNode } from "react";
import cn from "classnames"


export interface TitleProps extends React.HTMLAttributes<HTMLDivElement>{
    children: ReactNode;
    appereance?: 'big' | 'bigwhite'
}

const Title = ({children, className, appereance = 'big', ...props}: TitleProps) => {
    return <h2 className={cn(styles['button'], styles['accent'], className, {
        [styles['bigwhite']]: appereance === 'bigwhite',
        [styles['big']]: appereance === 'big'
    })} {...props}>{children}</h2>;
};

export default Title