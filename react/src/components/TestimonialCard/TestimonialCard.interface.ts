import { ITestimonial } from "../../helpers/Api.interface"

export interface ITestimonialClick extends ITestimonial {
    clicker: (page: number) => void
}