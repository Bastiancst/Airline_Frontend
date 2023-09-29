import { CrudResponse } from "./crud-response";

export interface ResponseModel {
    success: boolean;
    message: string;
    errors: string;
    result: CrudResponse["result"][]; 
  }