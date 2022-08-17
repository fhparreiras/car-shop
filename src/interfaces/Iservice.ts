interface IService<T> {
  create(body: T):Promise<T>,
  read():Promise<T[]>,
  readOne(_id:string):Promise<T | null>,
  update(_id: string, body: T): Promise<T | null>,
  delete(_id: string): Promise<T | null>,
}

export default IService;
