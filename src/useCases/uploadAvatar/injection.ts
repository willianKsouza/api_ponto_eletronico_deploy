import { DeleteFileStorage, GetAvatarUrl, UploadFile } from "../../data/supaBase/supabaseStorage";
import { UploadAvatarService } from "./uploadAvatarService";
import { ControllerUploadAvatar } from "./controllerUploadAvatar";
import { FindByIdRepository, UpdateRepository } from "../../../prisma/repositories/userRepository";

const uploadFile = new UploadFile();
const getAvatarUrl = new GetAvatarUrl()
const findEmployeeById = new FindByIdRepository()
const UpdateEmployee = new UpdateRepository()
const deleteFileStorage = new DeleteFileStorage();

const avatarEmployeeService = new UploadAvatarService(
  findEmployeeById,
  uploadFile,
  getAvatarUrl,
  UpdateEmployee,
  deleteFileStorage
);
const controllerAvatarEmployee = new ControllerUploadAvatar(
  avatarEmployeeService
);

export { controllerAvatarEmployee };
