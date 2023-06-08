import { Document } from "mongoose"

export type TDoc<T> = Document & T;