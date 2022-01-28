export interface IStaff{
      id: string,
      dui: string, //This is the ID
      name: string,
      lastName: string,
      type: string,
      department: string,
      position: string,
      salary: number,
}

export interface IStaffResolved{
      staff?: IStaff,
      message?: any;
      
}