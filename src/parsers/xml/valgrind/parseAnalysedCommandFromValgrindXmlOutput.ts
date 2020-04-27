import { IValgrindReport } from "../../../logs/input/xml/valgrind/ValgrindReport.interface";
import { AnalysedCommand } from "../../../entity/AnalysedCommand.entity";

export async function parseAnalysedCommandFromValgrindXmlOutput(report : IValgrindReport) : Promise<AnalysedCommand> {
    const cmd : AnalysedCommand = new AnalysedCommand();

    cmd.pid = report.pid;
    cmd.ppid = report.ppid;
    cmd.executable = report.args.argv.exe;
    cmd.exitCode = 0;
    cmd.executionDuration = 0;
    if (report.args.argv.arg) {
        cmd.args = '';
        report.args.argv.arg.forEach((arg : string) => {
            cmd.args = (cmd.args.length > 0) ? `${cmd.args} ${arg}` : arg;
        });
    }
    return cmd;
}