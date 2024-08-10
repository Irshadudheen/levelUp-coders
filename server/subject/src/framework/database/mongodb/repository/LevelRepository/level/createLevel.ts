import { Ilevel } from "../../../../../../entities/level"
import levelModel from "../../../model/level"

export const createLevel= async (level:Ilevel,levelModels:typeof levelModel):Promise<Ilevel>=>{
    return await levelModels.create(level)
}