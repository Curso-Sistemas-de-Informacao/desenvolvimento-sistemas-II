import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import User from "./Users";
  
  @Entity("posts")
  class Post {
    @PrimaryGeneratedColumn("increment")
    id: number;
  
    @Column("varchar", { length: 100 })
    title: string;
  
    @Column("varchar", { length: 255 })
    content: string;
  
    @Column("date")
    date_post: Date;
  
    @Column("int")
    id_user: number;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @ManyToOne(() => User, (user) => user.posts)
    @JoinColumn({ name: "id_user" })
    users: User;
  }
  
  export default Post;