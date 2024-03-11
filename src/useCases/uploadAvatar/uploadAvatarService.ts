
import {
  IFindByIdRepository,
  IUpdateRepository,
} from "../../shared/interfaces/IEmployeeRepository";
import {
  IDeleteFile,
  IGetAvatarUrl,
  IUploadAvatar,
} from "../../shared/interfaces/ISupaBase";
import { deleteFileServer } from "../../shared/utils/deleteFileServer";
export class UploadAvatarService {
  constructor(
    private findEmployeeById: IFindByIdRepository,
    private saveCloudStorage: IUploadAvatar,
    private getAvatarUrl: IGetAvatarUrl,
    private UpdateEmployee: IUpdateRepository,
    private DeleteFileStorage: IDeleteFile
  ) {}
  async execute(id: string, objFile: Express.Multer.File) {
    
    const employee = await this.findEmployeeById.findById(id);
    if (employee && employee.avatar_file_name) {
      const saveCloud = await this.saveCloudStorage.uploadFile(objFile);
      const getUrl = await this.getAvatarUrl.getUrl(objFile.filename);

      const deletedFile = await this.DeleteFileStorage.deleteFileStorage(
        employee.avatar_file_name
      );
      await this.UpdateEmployee.update(id, {
        avatar_employee: getUrl.publicUrl,
        avatar_file_name: objFile.filename,
        avatar_path: objFile.path,
      });

      deleteFileServer(objFile.path);
      return {
        saveCloud: saveCloud,
        getUrl: getUrl,
        deletedFile: deletedFile,
      };
    }
    const saveCloud = await this.saveCloudStorage.uploadFile(objFile);
    const getUrl = await this.getAvatarUrl.getUrl(objFile.filename);

    await this.UpdateEmployee.update(id, {
      avatar_employee: getUrl.publicUrl,
      avatar_file_name: objFile.filename,
      avatar_path: objFile.path,
    });
    deleteFileServer(objFile.path);
    return {
      saveCloud: saveCloud,
      getUrl: getUrl,
    };
  }
}

