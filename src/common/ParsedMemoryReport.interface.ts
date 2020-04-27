import { IParsedReport } from "./ParsedReport.interface";
import { MemoryStats } from "../entity/MemoryStats.entity";

export interface IParsedMemoryReport extends IParsedReport {
    memoryStats?: MemoryStats[];
};