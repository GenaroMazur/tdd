export abstract class RepositoryClass<T extends object> {
    constructor() { }

    findById: (id: number) => Promise<T | null>

    find: (query?: Partial<T>) => Promise<T[]>

    findOne: (query?: Partial<T>) => Promise<T | null>

    createOne:{
        (user: Omit<T,"id">): Promise<T>,
        (user: T): Promise<T>
    }

    updateOne: (query: Partial<T>, update: Omit<Partial<T>, "id">) => Promise<T | null>

    deleteOne: (query: Partial<T>) => Promise<T | null>

    insertMany: (user: T[]) => Promise<T[]>

    updateMany: {
        (update: Omit<Partial<T>, "id">): Promise<T[]>,
        (query: Omit<Partial<T>, "id"> | Partial<T>, update: Omit<Partial<T>, "id">): Promise<T[]>
    }

    deleteMany: (query: Partial<T>) => Promise<T[]>
}