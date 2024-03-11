import { Request, Response } from "express";
import { UploadAvatarService } from "./uploadAvatarService";

export class ControllerUploadAvatar {
  constructor(private uploadAvatar: UploadAvatarService) {}
  async uploadFile(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (req.file) {
        const employeeFile = await this.uploadAvatar.execute(id, req.file);
        return res.status(200).json({ data: employeeFile });
      }
        return null
    } catch (error) {
      return res.status(error.statusCode).json({ data: error.message });
    }
  }
}
