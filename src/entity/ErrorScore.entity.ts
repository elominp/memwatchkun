import {
    Column,
    Entity,
    PrimaryColumn,
    Index
} from 'typeorm';

@Entity()
export class ErrorScore {
    @PrimaryColumn()
    id: number;

    @PrimaryColumn()
    @Index()
    errorType: string;

    @Column()
    score: number;
};