import { IDataMark } from "./IDataMark";
import { ITimesheet } from "./ITimeSheet";

export interface ITimeSheetUpdateRepository {
  update(
    id: string,
    param: Partial<ITimesheet>
  ): Promise<ITimesheet | null>;
}

export interface IFindOneTimeSheetRepository {
  findOne(id: string): Promise<ITimesheet | null>;
}

export interface ICreateTimeSheetRepository {
  create(data: Omit<ITimesheet, "time_sheet_id">): Promise<ITimesheet | null>;
}
