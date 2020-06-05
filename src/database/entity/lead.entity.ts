import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity({ name: 'lead' })
export class Lead extends BaseEntity {
  @PrimaryColumn('uuid')
  id: String

  @Column({ unique: true })
  email: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  addId() {
    this.id = v4()
  }
}
