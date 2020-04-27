import { IParsedMemoryErrorsReport } from "../../common/ParsedMemoryErrorsReport.interface";
import { parse } from 'fast-xml-parser';
import { IValgrindOutput } from "../../logs/input/xml/valgrind/ValgrindOutput.interface";
import { readFileSync } from 'fs';
import { parseAnalysedCommandFromValgrindXmlOutput } from "./valgrind/parseAnalysedCommandFromValgrindXmlOutput";
import { AnalysedCommand } from "../../entity/AnalysedCommand.entity";
import { ExecutionError } from "../../entity/ExecutionError.entity";
import { parseExecutionErrorsFromValgrindXmlOutput } from "./valgrind/parseExecutionErrorsFromValgrindXmlOutput";

export async function parseValgrindXml(report: IValgrindOutput): Promise<IParsedMemoryErrorsReport> {
    const parsedAnalysedCommandPromise: Promise<AnalysedCommand> = parseAnalysedCommandFromValgrindXmlOutput(report.valgrindoutput);
    const parsedExecutionErrorsPromise: Promise<ExecutionError[]> = parseExecutionErrorsFromValgrindXmlOutput(report.valgrindoutput);
    const result: IParsedMemoryErrorsReport = {
        analysedCommand: null,
        executionErrors: null
    };

    parsedAnalysedCommandPromise.then(analysedCommand => result.analysedCommand = analysedCommand);
    parsedExecutionErrorsPromise.then(executionErrors => result.executionErrors = executionErrors);
    parsedAnalysedCommandPromise.catch(reason => console.log(reason));
    parsedExecutionErrorsPromise.catch(reason => console.log(reason));
    await Promise.all([parsedAnalysedCommandPromise, parsedExecutionErrorsPromise]);
    return result;
}

export async function parseValgrindXmlFromMemory(raw: string): Promise<IParsedMemoryErrorsReport> {
    const report: IValgrindOutput = parse(raw);
    return parseValgrindXml(report);
}

export async function parseValgrindXmlFromFile(filepath: string): Promise<IParsedMemoryErrorsReport> {
    const xml: string = readFileSync(filepath).toString();
    return parseValgrindXmlFromMemory(xml);
}