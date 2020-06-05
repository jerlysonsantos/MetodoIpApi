import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 } from 'uuid'
import { User } from './user.entity'

@Entity({ name: 'settings' })
export class Settings extends BaseEntity {
  @PrimaryColumn('uuid')
  id: String

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column({ unique: true })
  live_url: string

  @Column({ default: true })
  block_anwser: boolean

  @Column({ default: 0 })
  putzz: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  addId() {
    this.id = v4()
  }
}
