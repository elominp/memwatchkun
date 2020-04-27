import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from 'typeorm';

@Entity()
export class RegisterDump {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    instruction_pointer: number;

    @Column({ nullable: true })
    stack_pointer: number;

    @Column({ nullable: true })
    base_pointer: number;

    @Column({ nullable: true })
    raw: string;
};