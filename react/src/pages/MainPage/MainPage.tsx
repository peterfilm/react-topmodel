import HeaderCover from "../../components/HeaderCover/HeaderCover";
import Search from "../../features/Search/Search";
import TopModels from "../../components/TopModels/TopModels";
import Benefits from "../../components/Benefits/Benefits";
import DigitsTab from "../../components/DigitsTab/DigitsTab";
import Testimonials from "../../components/Testimonials/Testimonials";
import Brands from "../../components/Brands/Brands";
import Slogan from "../../components/Slogan/Slogan";
import { Helmet } from 'react-helmet';


const MainPage = () => {
    return (
        <div>
            <Helmet>
            <meta
                name="description"
                content={`TOPMODEL - Find model for your project!`}
                />
            <title>TOPMODEL - Find model for your project!</title>
            </Helmet>
            <HeaderCover/>
            <Search/>
            <TopModels/>
            <Benefits/>
            <DigitsTab/>
            <Testimonials/>
            <Brands/>
            <Slogan/>
        </div>
    )
}

export default MainPage