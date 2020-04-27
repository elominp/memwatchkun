import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    Index,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { Trace } from './Trace.entity';
import { AnalysedCommand } from './AnalysedCommand.entity';

@Entity()
export class ExecutionError {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => AnalysedCommand, cmd => cmd.executionErrors)
    @Index()
    analysedCommand: number;

    @Column()
    @Index()
    toolId: string;

    @Column()
    @Index()
    type: string;

    @OneToOne(type => Trace, { nullable: true })
    @JoinColumn()
    @Index()
    trace: Trace;

    @Column({ nullable: true })
    @Index()
    reason: string;

    @Column({ nullable: true })
    detailId: number;
};