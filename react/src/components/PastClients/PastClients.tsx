import cn from "classnames"
import styles from "./PastClients.module.scss";
import Title from "../Title/Title";

interface PastClients {
    past_clients: string
}

const PastClients = ({past_clients}: PastClients) => {
    const clients = past_clients.split(', ')

    return (
        <div className={cn(styles['pastClients'])}>
            <Title appereance="bigwhite">Past Clients</Title>
            <div className={cn(styles['pastClients__wrapper'])}>
                {clients.map((client, i) => <div key={i} className={cn(styles['pastClients__client'])}>{client}</div>)}
            </div>

        </div>
    )
}

export default PastClients