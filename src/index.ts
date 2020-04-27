import "reflect-metadata";
import { createConnection, Connection, ConnectionManager } from "typeorm";
import { ExecutionError } from './entity/ExecutionError.entity';
import { parseValgrindXmlFromFile } from "./parsers/xml/valgrind.parser";
import { IParsedMemoryErrorsReport } from "./common/ParsedMemoryErrorsReport.interface";
import { IParsedReport } from "./common/ParsedReport.interface";
import { IParsedMemoryReport } from "./common/ParsedMemoryReport.interface";
import { AnalysedCommand } from "./entity/AnalysedCommand.entity";

function isParsedMemoryErrorsReport(object: any): object is IParsedMemoryErrorsReport {
    return 'executionErrors' in object;
}

function isParsedMemoryReport(object: any): object is IParsedMemoryReport {
    return 'memoryStats' in object;
}

async function savedParsedMemoryErrorFromReport(connection: Connection, error: ExecutionError) {
    await connection.manager.save(error.trace.registers).catch(err => {
        console.log(`Failed to save the registers in the error trace: ${err}`);
    });
    await connection.manager.save(error.trace.stackFrames).catch(err => {
        console.log(`Failed to save stack frames: ${err}`);
    });
    await connection.manager.save(error.trace).catch(err => {
        console.log(`Failed to save trace: ${err}`);
    });
    await connection.manager.save(error).catch(err => {
        console.log(`Failed to save the execution error: ${err}`);
    });
}

async function saveParsedMemoryErrorsReport(connection: Connection, report: IParsedMemoryErrorsReport) {
    const errorsSavePromises : Promise<any>[] = [];
    report.executionErrors.forEach((error: ExecutionError) => {
        errorsSavePromises.push(savedParsedMemoryErrorFromReport(connection, error));
    });
    await Promise.all(errorsSavePromises);
}

async function saveParsedMemoryReport(connection: Connection, report: IParsedMemoryReport) {
    if (report.memoryStats) {
        connection.manager.save(report.memoryStats);
    }
}

async function saveParsedReport(connection: Connection, report: IParsedReport) {
    if (isParsedMemoryErrorsReport(report)) {
        await saveParsedMemoryErrorsReport(connection, report);
    }
    if (isParsedMemoryReport(report)) {
        await saveParsedMemoryReport(connection, report);
    }
    connection.manager.save(report.analysedCommand).then((cmd: AnalysedCommand) => console.log(`Inserted new analyse with id ${cmd.id} in DB`)).catch(reason => console.log(reason));
}

createConnection().then(async connection => {
    parseValgrindXmlFromFile('foo.xml').then(async (report: IParsedMemoryErrorsReport) => {
        saveParsedReport(connection, report);
    });
}).catch(error => console.log(error));
