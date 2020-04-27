import { IValgrindReportErrorStackFrame } from "../../../logs/input/xml/valgrind/ValgrindReportErrorStackFrame.interface";
import { StackFrame } from "../../../entity/StackFrame.entity";
import { IValgrindReportErrorStack } from "../../../logs/input/xml/valgrind/ValgrindReportErrorStack.interface";

async function parseStackFrameFromValgrindXmlOutput(reportFrame: IValgrindReportErrorStackFrame): Promise<StackFrame> {
    const frame: StackFrame = new StackFrame();
    
    frame.instructionPointer = reportFrame.ip;
    frame.directory = reportFrame.dir;
    frame.objectFile = reportFrame.obj;
    frame.sourceFile = reportFrame.file;
    frame.symbol = reportFrame.fn;
    frame.line = reportFrame.line;
    return frame;
}

export async function parseStackFramesFromValgrindXmlOutput(reportStack: IValgrindReportErrorStack): Promise<StackFrame[]> {
    const parsingPromises: Promise<StackFrame>[] = [];
    const frames: StackFrame[] = [];
    var frameId: number = 1;

    reportStack.frame.forEach(async (reportFrame: IValgrindReportErrorStackFrame) => {
        const parsingPromise: Promise<StackFrame> = parseStackFrameFromValgrindXmlOutput(reportFrame);
        parsingPromises.push(parsingPromise);
        parsingPromise.then(frame => {
            frame.frameId = frameId;
            frameId++;
            frames.push(frame);
        });
        parsingPromise.catch(reason => console.log(reason));
    });
    await Promise.all(parsingPromises);
    return frames;
}