import { apiError } from "../../../shared/middlewares/AppError";
import { IFindOneTimeSheetRepository } from "../../../shared/interfaces/ITimeSheetRepository";
export class FindEmployeeTimeSheetService {
  constructor(
    private findOneTimeSheetRepository: IFindOneTimeSheetRepository,
  ) {}

  async execute(time_sheet_id:string) {
    try {
      const employee = await this.findOneTimeSheetRepository.findOne(time_sheet_id)
   
      
      return employee;
    } catch (error) {
      throw new apiError("erro interno ao lista funcionarios", 500);
    }
  }
}
