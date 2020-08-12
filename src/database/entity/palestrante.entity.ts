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

@Entity({ name: "palestrantes" })
export class Palestrante extends BaseEntity {
  @PrimaryColumn("uuid")
  id: String;

  @Column()
  name: string;

  @Column()
  instagram: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
