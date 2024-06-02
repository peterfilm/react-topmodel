import { APITypes } from "../../helpers/Api.interface"


export type IModelHeader = Pick<APITypes, 'pk' | 'name' | 'surname' | 'avatar' | 'gender' | 
'city' | 'price_day' | 'price_hour' | 'height' | 'bust' | 'weist' | 'hips' | 'shoes' | 'hair' | 'eyes'>