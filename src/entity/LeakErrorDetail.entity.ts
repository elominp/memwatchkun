import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity()
export class LeakErrorDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    leakedBytes: number;

    @Column({ nullable: true })
    leakedBlocks: number;
};