import cn from "classnames"
import styles from "./OneModel.module.scss";
import ModelHeader from "../../components/ModelHeader/ModelHeader";
import ModelPortfolio from "../../components/ModelPortfolio/ModelPortfolio";
import PastClients from "../../components/PastClients/PastClients";
import AnotherModels from "../../components/AnotherModels/AnotherModels";
import { useLoaderData, Await } from "react-router-dom"
import { Suspense } from "react"
import { IModelDetail } from "./OneModel.interface";
import Loading from "../../components/Loading/Loading";
import { Helmet } from 'react-helmet';

const OneModel = () => {
    const data = useLoaderData() as {data: IModelDetail}
    return (
        <div className={cn(styles['model'])}>
             <Suspense fallback={<Loading/>}>
            <Await resolve={data.data} >
            {({data}: {data: IModelDetail}) => (
                    <>
                        <Helmet>
                        <meta
                            name="description"
                            content={`${data.name} ${data.surname[0]}. - TOP MODEL`}
                            />
                        <title>{data.name} {data.surname[0]}. - TOP MODEL</title>
                        </Helmet>
                        <ModelHeader {...data}/>
                        <ModelPortfolio {...data} />
                        <PastClients {...data}/>
                        <AnotherModels/>
                    </>
                )}
        </Await>
        </Suspense>
        </div>
    )
}

export default OneModel