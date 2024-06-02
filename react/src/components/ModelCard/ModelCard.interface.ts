import { APITypes } from "../../helpers/Api.interface"
export type IModelCard = Pick<APITypes, 'pk' | 'avatar' | 'name' | 'surname' | 'gender' | 'city' | 'price_hour' | 'price_day' | 'photographs'>
