import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import BandRole from "../helpers/BandRole";
import { truncateSync } from "fs";

@Entity()
export class JamSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: "enum",
    enum: BandRole,
    array: true,
    nullable: true,
  })
  bandRoleParticipants: BandRole[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (host) => host.jamSessions)
  host: User;
}
