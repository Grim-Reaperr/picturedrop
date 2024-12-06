import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Prize')
export class CouponItem {

  @PrimaryGeneratedColumn()
  Id: string;

  @Column()
  Title: string;

  @Column({ type: 'text', nullable: true })
  descriptionEn: string;

  @Column()
  Url: string;

  @Column()
  ChallengeId: string;

  @Column()
  WorkspaceId: string;

  @Column()
  ImageId: string;

  @Column()
  CreatedById: string;

  @Column({ type: 'timestamp' })
  CreatedOn: Date;  // Nur das CreatedOn-Feld abrufen

  @Column()
  LastModifiedById: string;

  @UpdateDateColumn()
  LastModifiedOn: Date;

  @Column()
  DescriptionEn: string;

  @Column()
  TitleEn: string;
}
