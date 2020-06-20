import bcrypt from "bcrypt";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "admins" })
export class Admins extends BaseEntity {
  @PrimaryColumn("uuid")
  id: String;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  can_answer: boolean;

  @Column({ default: false })
  can_users: boolean;

  @Column({ default: false })
  can_reply: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }

  @BeforeInsert()
  async setPassword() {
    const password_hash = await bcrypt.hash(this.password, 10);
    this.password = password_hash;
  }
}
