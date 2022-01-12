import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import BandRole from "../helpers/BandRole";
import { JamSession } from "./JamSession";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  bandRole: BandRole;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => JamSession, (jamSession) => jamSession.host)
  jamSessions: JamSession[];
}
