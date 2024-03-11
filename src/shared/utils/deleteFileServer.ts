import { apiError } from "../../shared/middlewares/AppError";
import fs from "fs";

function deleteFileServer(path: string) {
  fs.unlink(path, (error) => {
    if (error) {
      throw new apiError(error.message, 400);
    }
  });
}
export { deleteFileServer };
