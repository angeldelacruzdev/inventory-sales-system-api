import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeUpdate,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';

import { Users } from './users.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ length: 191 })
  full_name: string;

  @Index()
  @Column({ nullable: true, length: 191 })
  email: string;

  @Index()
  @Column({ nullable: true, length: 30 })
  dni: string;

  @Index()
  @Column({ nullable: true, length: 191 })
  company: string;

  @Column({ nullable: true, type: 'text' })
  address1: string;

  @Column({ nullable: true, type: 'text' })
  address2: string;

  @Index()
  @Column({ nullable: true, length: 20 })
  phone1: string;

  @Column({ nullable: true, length: 20 })
  phone2: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'int', precision: 2, nullable: true })
  kind: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'userId' })
  user: Users;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @BeforeInsert()
  updateDateCreation() {
    this.createdAt = new Date();
  }

  @BeforeUpdate()
  updateDateUpdate() {
    this.updatedAt = new Date();
  }
}
