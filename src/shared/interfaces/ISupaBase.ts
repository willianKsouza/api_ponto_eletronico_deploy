
export interface IUploadAvatar {
  uploadFile(file: Express.Multer.File): any;
}

export interface IGetAvatarUrl {
  getUrl(fileName: string): Promise<{ publicUrl: string }>;
}

export interface IDeleteFile {
  deleteFileStorage(file: string): any
}
