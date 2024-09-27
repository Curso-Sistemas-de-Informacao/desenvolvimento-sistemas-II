import { Entity, ObjectId, ObjectIdColumn, Column } from "typeorm";

@Entity("profiles")
class Profile {
  @ObjectIdColumn()
  id: ObjectId;

  @Column("varchar", { length: 100 })
  about: string;

  @Column("varchar", { length: 100 })
  education: string;

  @Column("varchar", { length: 100 })
  career: string;
}

export default Profile;
