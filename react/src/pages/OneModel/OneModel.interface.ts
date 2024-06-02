import { APITypes } from "../../helpers/Api.interface"

export type IModelDetail = Omit<APITypes, 'birthday' | 'email'>