import { LevelController } from "../../../../controller/levelController";
import { SubjectController } from "../../../../controller/subjectController";
import { LevelUseCase } from "../../../../usecases/usecases/levelUseCase";
import { SubjectUseCase } from "../../../../usecases/usecases/subjectUseCase";
import levelModel from "../../../database/mongodb/model/level";
import quizModel from "../../../database/mongodb/model/quiz";
import subjectModel from "../../../database/mongodb/model/subject";
import videoModel from "../../../database/mongodb/model/video";
import { LevelRepository } from "../../../database/mongodb/repository/LevelRepository/levelRepository";
import { QuizRepository } from "../../../database/mongodb/repository/quizRepository/quizRepository";
import { SubjectRepositroy } from "../../../database/mongodb/repository/subjectRepository/subjectRepository";
import { VideoRepository } from "../../../database/mongodb/repository/videoRepository";
import cloudinary from "../../../service/cloudinary";

const subjectRepository = new SubjectRepositroy(subjectModel)
const subjectUseCase = new SubjectUseCase(subjectRepository,cloudinary)
const subjectController = new SubjectController(subjectUseCase)
const levelRepository = new LevelRepository(levelModel)

const videoRepository = new VideoRepository(videoModel)
const quizRepository = new QuizRepository(quizModel)
const levelUseCase = new LevelUseCase(levelRepository,cloudinary,videoRepository,quizRepository) 
const levelController= new LevelController(levelUseCase)

export {subjectController,levelController}