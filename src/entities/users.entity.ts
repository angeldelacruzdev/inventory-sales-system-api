import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 191 })
  full_name: string;

  @Column({ unique: true, type: 'varchar', length: 191 })
  email: string;

  @Column({ type: 'varchar', length: 191 })
  password: string;

  @Column({ default: null })
  hashdRt: string | null;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_admin: boolean;

  @Column({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  @Column({ type: 'datetime' })
  updated_at: Date;
}
