import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication
} from '@nestjs/platform-fastify'
import { AppModule } from './modules/app/app.module';
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { parseValgrindXmlFromFile } from "./parsers/xml/valgrind.parser";
import { IParsedMemoryErrorsReport } from "./common/ParsedMemoryErrorsReport.interface";
import { saveParsedReport } from "./persistence/saveParsedReport";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  createConnection().then(async (connection: Connection) => {
    parseValgrindXmlFromFile('foo.xml').then(async (report: IParsedMemoryErrorsReport) => {
        saveParsedReport(connection, report);
    });
  }).catch(error => console.log(error));
  await app.listen(3000);
}
bootstrap();
