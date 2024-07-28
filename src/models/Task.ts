export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public completed: boolean = false,
    public userId: string // Nuevo campo para identificar al usuario
  ) {}
}
