import { APITypes } from "../../helpers/Api.interface"

export type IAnotherModel = Pick<APITypes, 'pk' | 'name' | 'surname' | 'avatar' | 'price_day' | 'price_hour' | 'city' | 'photographs'>