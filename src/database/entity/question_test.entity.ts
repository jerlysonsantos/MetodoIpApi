import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 } from 'uuid'

@Entity({ name: 'question_test' })
export class QuestionTest extends BaseEntity {
  @PrimaryColumn('uuid')
  id: String

  // @ManyToOne(() => User, (user) => user.id)
  // @JoinColumn({ name: 'user_id' })
  // user: User

  @Column()
  nome: string

  @Column()
  whatsapp: string

  @Column()
  text: string

  @Column({ default: false })
  selected: boolean

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  addId() {
    this.id = v4()
  }
}
