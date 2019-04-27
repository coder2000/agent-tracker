import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  surname: string;

  @Column()
  emailAddress: string;

  @Column()
  googleToken: string;
}
