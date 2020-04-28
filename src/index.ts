import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { parseValgrindXmlFromFile } from "./parsers/xml/valgrind.parser";
import { IParsedMemoryErrorsReport } from "./common/ParsedMemoryErrorsReport.interface";
import { saveParsedReport } from "./persistence/saveParsedReport";

createConnection().then(async (connection: Connection) => {
    parseValgrindXmlFromFile('foo.xml').then(async (report: IParsedMemoryErrorsReport) => {
        saveParsedReport(connection, report);
    });
}).catch(error => console.log(error));
