import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { Trace } from './Trace.entity';

@Entity()
export class StackFrame {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Trace, trace => trace.stackFrames)
    @Index()
    trace: Trace;

    @Column()
    @Index()
    frameId: number;

    @Column({ nullable: true })
    directory: string;

    @Column({ nullable: true })
    objectFile: string;

    @Column({ nullable: true })
    sourceFile: string;

    @Column({ nullable: true })
    symbol: string;

    @Column({ nullable: true })
    line: number;

    @Column({ nullable: true })
    instructionPointer: number;
};