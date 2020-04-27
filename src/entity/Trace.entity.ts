import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { RegisterDump } from './RegisterDump.entity';
import { StackFrame } from './StackFrame.entity';

@Entity()
export class Trace {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => RegisterDump, { nullable: true })
    @JoinColumn()
    registers: RegisterDump;

    @OneToMany(type => StackFrame, frame => frame.trace, { nullable: true })
    stackFrames: StackFrame[];

    @Column({ nullable: true })
    coredump: string
};