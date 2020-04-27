import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class MemoryStats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    vmSize: number;

    @Column({ nullable: true })
    residentSize: number;

    @Column({ nullable: true })
    stackSize: number;

    @Column({ nullable: true })
    heapSize: number;
};