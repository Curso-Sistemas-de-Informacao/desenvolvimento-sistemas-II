interface IProject {
    id?: number;
    name: string;
    description: string;
    start_at: Date;
    end_at: Date;
    active: boolean;
  }
  
  export default IProject;