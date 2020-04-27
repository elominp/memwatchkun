import { IValgrindReportPreamble } from './ValgrindReportPreamble.interface';
import { IValgrindReportArgs } from './ValgrindReportArgs.interface';
import { IValgrindReportStatus } from './ValgrindReportStatus.interface';
import { IValgrindReportError } from './ValgrindReportError.interface';

export interface IValgrindReport {
    preamble: IValgrindReportPreamble;
    pid: number;
    ppid: number;
    tool: string;
    args: IValgrindReportArgs;
    status: IValgrindReportStatus[];
    error: IValgrindReportError[];
};