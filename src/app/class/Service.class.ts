import { RepositoryClass } from "./Repository"

export abstract class ServiceClass<T extends object> {
    constructor(protected readonly repository: RepositoryClass<T>) { }

    public listDocs: () => Promise<T[]>

    public getDoc: (query: Partial<T>) => Promise<T | null>

    public delete: (query: Partial<T>) => Promise<T | null>

    public create: (newDoc: Omit<T, "id"> | T) => Promise<T>

    public update: (query: Partial<T>, newDoc: Omit<T, "id"> | T) => Promise<T | null>
}