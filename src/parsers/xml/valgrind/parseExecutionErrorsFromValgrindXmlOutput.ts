import { IValgrindReport } from "../../../logs/input/xml/valgrind/ValgrindReport.interface";
import { IValgrindReportError } from "../../../logs/input/xml/valgrind/ValgrindReportError.interface";
import { ExecutionError } from "../../../entity/ExecutionError.entity";
import { Trace } from "../../../entity/Trace.entity";
import { RegisterDump } from "../../../entity/RegisterDump.entity";
import { parseStackFramesFromValgrindXmlOutput } from "./parseStackFramesFromValgrindXmlOutput";

async function parseExecutionErrorFromValgrindXmlOutput(reportError: IValgrindReportError): Promise<ExecutionError> {
    const error: ExecutionError = new ExecutionError();

    error.toolId = reportError.unique;
    error.type = reportError.kind;
    error.trace = new Trace();
    error.reason = reportError.xwhat.text;
    error.trace.registers = new RegisterDump();
    error.trace.registers.instruction_pointer = reportError.stack.frame[0].ip;
    error.trace.stackFrames = await parseStackFramesFromValgrindXmlOutput(reportError.stack);
    return error;
}

export async function parseExecutionErrorsFromValgrindXmlOutput(report: IValgrindReport) : Promise<ExecutionError[] | undefined> {
    const parsingPromises: Promise<ExecutionError>[] = [];
    const errors: ExecutionError[] = [];

    report.error.forEach(async (reportError: IValgrindReportError) => {
        const parsingPromise: Promise<ExecutionError> = parseExecutionErrorFromValgrindXmlOutput(reportError);
        parsingPromises.push(parsingPromise);
        parsingPromise.then(error => errors.push(error));
        parsingPromise.catch(reason => console.log(reason));
    });
    await Promise.all(parsingPromises);
    return errors;
}