import cn from "classnames"
import styles from "./Search.module.scss";
import Button from "../../components/Button/Button";
import Select from "../../components/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../../store'
import { useNavigate, useLocation } from "react-router-dom";
import { changeGender, changeHair, changeHeight, changePricePerDay, changePricePerHour, searchModels } from "./search-slice";
import { AppDispatch } from "../../store";
import { useEffect } from "react";

const Search = () => {
        const dispatch = useDispatch<AppDispatch>()
        const search = useSelector((state: RootState) => state.search);
        const location = useLocation();
        const navigate = useNavigate()

        useEffect(() => {
                const queryParams = new URLSearchParams(location.search);
                dispatch(changeGender(queryParams.get('gender') || ''));
                dispatch(changeHeight(queryParams.get('height') || ''));
                dispatch(changeHair(queryParams.get('hair') || ''));
                dispatch(changePricePerHour(queryParams.get('price_per_hour') || ''));
                dispatch(changePricePerDay(queryParams.get('price_per_day') || ''));
                dispatch(searchModels(location.search));
            }, [location.search, dispatch]);


        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                dispatch(searchModels(''))
                const queryParams = new URLSearchParams({
                'gender': search.gender,
                'height': search.height,
                'hair': search.hair,
                'price_per_hour': search.price_hour,
                'price_per_day': search.price_day
                });
                let queryString = queryParams.toString().replace(/(?:\&|^)[^\&]*?\=(?=\&|$)/g, '');
                if (queryString.startsWith('&')) {
                        queryString = queryString.slice(1)
                }
                navigate(`/models/?${queryString}`)
              };

    return (
        <form onSubmit={handleSubmit}>
        <div className={cn(styles['search'])}>
            <div className={cn(styles['name'])}>Search a model</div>
            <Select value={search.gender} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => dispatch(changeGender(e.target.value))} name='gender'>
                        <option value="">Gender</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                </Select>
                <Select value={search.height} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => dispatch(changeHeight(e.target.value))}  name='height'>
                        <option value="">Height</option>
                        <option value="150-159">150 - 159</option>
                        <option value="160-169">160 - 169</option>
                        <option value="170-179">170 - 179</option>
                        <option value="180-189">180 - 189</option>
                        <option value="190-199">190 - 199</option>
                </Select>
                <Select value={search.hair} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => dispatch(changeHair(e.target.value))} name='hair'>
                        <option value="">Hair</option>
                        <option value="Brunette">Brunette</option>
                        <option value="Blonde">Blonde</option>
                        <option value="Red hair">Red hair</option>
                        <option value="Black hair">Black hair</option>
                        <option value="Brown hair">Brown hair</option>
                        <option value="Auburn hair">Auburn hair</option>
                        <option value="Gray hair">Gray hair</option>
                        <option value="White hair">White hair</option>
                </Select>
                <Select value={search.price_hour} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => dispatch(changePricePerHour(e.target.value))} name='price_hour'>
                        <option value="">Price per hour</option>
                        <option value="300-399">300 - 399</option>
                        <option value="400-499">400 - 499</option>
                        <option value="500-599">500 - 599</option>
                        <option value="600-699">600 - 699</option>
                        <option value="700-799">700 - 799</option>
                        <option value="800-899">800 - 899</option>
                        <option value="900-999">900 - 999</option>
                </Select>
                <Select value={search.price_day} onChange={(e:React.ChangeEvent<HTMLSelectElement>) => dispatch(changePricePerDay(e.target.value))} name='price_day'>
                        <option value="">Price per day</option>
                        <option value="3000-3999">3000 - 3999</option>
                        <option value="4000-4999">4000 - 4999</option>
                        <option value="5000-5999">5000 - 5999</option>
                        <option value="6000-6999">6000 - 6999</option>
                        <option value="7000-7999">7000 - 7999</option>
                </Select>
                <Button>Search</Button>
        </div>
       </form>
    )
}

export default Search