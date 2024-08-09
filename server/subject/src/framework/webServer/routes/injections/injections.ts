import { SubjectController } from "../../../../controller/subjectController";
import { SubjectUseCase } from "../../../../usecases/usecases/subjectUseCase";
import subjectModel from "../../../database/mongodb/model/subject";
import { SubjectRepositroy } from "../../../database/mongodb/repository/subjectRepository/subjectRepository";
import cloudinary from "../../../service/cloudinary";

const subjectRepository = new SubjectRepositroy(subjectModel)
const subjectUseCase = new SubjectUseCase(subjectRepository,cloudinary)
const subjectController = new SubjectController(subjectUseCase)

export {subjectController}