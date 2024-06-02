export type APITypes = {
    pk: number
    name: string
    surname: string
    city: string
    country: string
    price_hour: number
    price_day: number
    birthday: Date
    avatar: string
    is_active: boolean
    gender: GenderTypes
    height: number
    weight: number
    bust: number
    weist: number
    hips: number
    shoes: number
    hair: HairTypes
    eyes: EyesTypes
    size: number
    bio: string
    past_clients: string
    experience: number
    top_model: boolean
    agency: string
    email: string
    followers: number
    vk: string
    instagram: string
    facebook: string
    telegram: string
    photographs: IPhoto[] | []
}

export type ITestimonial = {
    id: number
    avatar: string
    text: string
    name: string
    position: string
}

export type HairTypes = 'Blonde' | 'Brunette' | 'Red hair' | 'Black hair' | 'Brown hair' | 'Auburn hair' | 'Gray hair' | 'White hair'
export type EyesTypes = 'Amber' | 'Blue' | 'Brown' | 'Gray' | 'Green' | 'Hazel' | 'Red'
export type GenderTypes = 'FEMALE' | 'MALE'


export type IPhoto = {
    small_img: string
    middle_img: string
    img: string
    is_published: boolean
    pk:number
}