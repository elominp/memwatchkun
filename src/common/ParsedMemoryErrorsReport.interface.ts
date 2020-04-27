import { ExecutionError } from "../entity/ExecutionError.entity";
import { ExecutionErrorDetails } from "./ExecutionErrorDetails";
import { IParsedMemoryReport } from "./ParsedMemoryReport.interface";

export interface IParsedMemoryErrorsReport extends IParsedMemoryReport {
    executionErrors: ExecutionError[];
    executionErrorsDetails?: ExecutionErrorDetails;
};