import { IValgrindReportErrorWhat } from './ValgrindReportErrorWhat.interface';
import { IValgrindReportErrorStack } from './ValgrindReportErrorStack.interface';

export interface IValgrindReportError {
    unique: string;
    tid: number;
    kind: string;
    xwhat: IValgrindReportErrorWhat;
    stack: IValgrindReportErrorStack;
};