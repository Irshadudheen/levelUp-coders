import { LevelController } from "../../../../controller/levelController";
import { SubjectController } from "../../../../controller/subjectController";
import { LevelUseCase } from "../../../../usecases/usecases/levelUseCase";
import { SubjectUseCase } from "../../../../usecases/usecases/subjectUseCase";
import levelModel from "../../../database/mongodb/model/level";
import subjectModel from "../../../database/mongodb/model/subject";
import { LevelRepository } from "../../../database/mongodb/repository/LevelRepository/levelRepository";
import { SubjectRepositroy } from "../../../database/mongodb/repository/subjectRepository/subjectRepository";
import cloudinary from "../../../service/cloudinary";

const subjectRepository = new SubjectRepositroy(subjectModel)
const subjectUseCase = new SubjectUseCase(subjectRepository,cloudinary)
const subjectController = new SubjectController(subjectUseCase)
const levelRepository = new LevelRepository(levelModel)
const levelUseCase = new LevelUseCase(levelRepository,cloudinary) 
const levelController= new LevelController(levelUseCase)

export {subjectController,levelController}