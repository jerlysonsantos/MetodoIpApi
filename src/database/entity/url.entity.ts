import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { v4 } from "uuid";

@Entity({ name: "url" })
export class Url extends BaseEntity {
  @PrimaryColumn("uuid")
  id: String;

  @Column()
  url: string;

  @BeforeInsert()
  addId() {
    this.id = v4();
  }
}
