import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  CreateDateColumn,
} from "typeorm";
import { TransactionType } from "../enums/transaction-type";
import { TransactionStatus } from "../enums/transaction-status";
import { IAuditableEntity } from "shared/domain/interfaces";

@Entity()
export class Transaction implements IAuditableEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Generated("uuid")
  @Column()
  number: string;

  @Column({ name: "source_id", nullable: true })
  sourceId: string;

  @Column({ name: "target_id", nullable: true })
  targetId: string;

  @Column()
  amount: number;

  @Column()
  type: TransactionType;

  @Column({ default: TransactionStatus.PENDING })
  status: TransactionStatus;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;
}
