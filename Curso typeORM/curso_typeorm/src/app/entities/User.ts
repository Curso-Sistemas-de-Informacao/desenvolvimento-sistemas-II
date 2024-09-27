import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
  AfterLoad,
} from "typeorm";
import Address from "./Address";
import UserProject from "./UserProject";

//@Index("idx_name_email", ["name", "email"])
@Entity("users")
class User {
  @AfterLoad()
  printMessage() {
    console.log("Mensagem exibida após carregamento da entidade");
  }

  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { nullable: false, length: 100 })
  name: string;

  @Index("email-idx", { unique: true })
  @Column("varchar", { nullable: false, length: 100, unique: true })
  email: string;

  @Column("varchar", { nullable: false, length: 100 })
  password: string;

  @Column("date", { nullable: false })
  birth_date: Date;

  @Column("boolean", { nullable: false, default: true })
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Address, (address) => address.users, {
    eager: true,
  })
  address: Address[];

  @OneToMany(() => UserProject, (userProject) => userProject.users)
  userProjects: UserProject[];
}

export default User;
