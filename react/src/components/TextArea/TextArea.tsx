import styles from "./TextArea.module.scss";
import cn from "classnames"

import { TextareaHTMLAttributes } from "react";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    appereance?: 'big' | 'bigError' | 'small'
}

const TextArea = ({ className, appereance = 'big', ...props}: TextAreaProps) => {
    return <textarea className={cn(styles['button'], className, {
        [styles['big']]: appereance === 'big',
        [styles['bigError']]: appereance === 'bigError',
        [styles['small']]: appereance === 'small'
    })} {...props} />
}

export default TextArea