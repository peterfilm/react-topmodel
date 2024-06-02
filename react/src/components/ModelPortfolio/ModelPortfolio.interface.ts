import { APITypes } from "../../helpers/Api.interface"

export type IPhotoGallery = Pick<APITypes, 'pk' | 'name' | 'surname' | 'photographs' | 'bio' | 'gender'>