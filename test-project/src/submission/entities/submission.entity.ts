import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('SubmissionItems')  // Name der Tabelle in der DB (SubmissionItems)
export class SubmissionItem {
  @PrimaryGeneratedColumn()
  Id: number;  // Primärschlüssel

  @Column()
  SubmissionId: number;

  @Column()
  FileId: number;

  @Column()
  ThumbnailId: number;

  @Column()
  Width: number;

  @Column()
  Height: number;

  @Column()
  ContentType: string;  // Nur das ContentType-Feld abrufen

  @Column()
  ContentLength: number;

  @Column()
  Rating: number;

  @Column()
  Orientation: string;

  @Column()
  CreatedById: number;

  @Column({ type: 'timestamp' })
  CreatedOn: Date;  // Nur das CreatedOn-Feld abrufen

  @Column()
  LastModifiedById: number;

  @Column({ type: 'timestamp', nullable: true })
  LastModifiedOn: Date;
}
