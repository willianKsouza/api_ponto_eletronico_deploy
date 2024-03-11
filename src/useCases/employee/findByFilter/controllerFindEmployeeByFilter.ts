import { Request, Response } from "express";
import { FindEmployeeByFilterService } from "./findEmployeeByFilterService";


export class ControllerFindEmployeeByFilter {
    constructor(private findEmployeeByFilter: FindEmployeeByFilterService) { }
    async findAll(req: Request, res: Response) {
        const {
            name_employee,
            function_employee,
            workload_employee,
            email,
            createdAt
        } = req.body;
        try {
            const employee = await this.findEmployeeByFilter.execute({
                name_employee,
                function_employee,
                workload_employee,
                email,
                createdAt
            });
            return res.status(200).json({ employee });
        } catch (error) {
            return res.status(error.statusCode).json({ data: error.message });
        }
    }
}