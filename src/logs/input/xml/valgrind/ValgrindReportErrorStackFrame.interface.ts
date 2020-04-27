export interface IValgrindReportErrorStackFrame {
    ip: number;
    obj: string;
    fn: string;
    dir: string;
    file: string;
    line: number;
};