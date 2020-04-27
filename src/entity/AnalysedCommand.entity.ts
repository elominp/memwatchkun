import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    OneToMany
} from 'typeorm';
import { ExecutionError } from './ExecutionError.entity';

@Entity()
export class AnalysedCommand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index()
    pid: number;

    @Column()
    @Index()
    ppid: number;

    @Column()
    @Index()
    executable: string;

    @Column({ nullable: true })
    args: string;

    @Column({ nullable: true })
    @Index()
    executionDuration: number;

    @Column({ nullable: true })
    @Index()
    exitCode: number;

    @OneToMany(type => ExecutionError, error => error.analysedCommand, { nullable: true })
    executionErrors: ExecutionError[];
};