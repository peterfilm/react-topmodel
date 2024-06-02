import cn from "classnames"
import styles from "./Error.module.scss";

interface IError {
    children: string
}
const Error = ({children}: IError ) => {
    return (
        <div className={cn(styles['error'])}>{children}</div>
    )
}

export default Error