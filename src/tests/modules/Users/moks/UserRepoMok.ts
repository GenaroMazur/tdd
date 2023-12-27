import { User } from "../../../../app/module/Users/domain/User";
import { RepositoryClass } from "../../../../app/class/Repository";
import usersCollection from "../usersCollection";

export class UserRepoMock implements RepositoryClass<User> {
    private readonly users: Readonly<User[]>

    constructor() {
        this.users = usersCollection
    }

    findById(id: number): Promise<User | null> {
        return Promise.resolve(this.users.find(u => u.id === id) ?? null);
    }

    find(query: Partial<User> = {}): Promise<User[]> {
        const queryIterable = Object.entries(query)

        const users = this.users.filter(u => {
            return queryIterable.every(([k, v]) => Object(u)[k] === v)
        })

        return Promise.resolve(users);
    }

    findOne(query: Partial<User> = {}): Promise<User | null> {
        return Promise.resolve(this.users.find(u => {
            return Object.entries(query).every(([k, v]) => Object(u)[k] === v)
        }) ?? null);
    }

    createOne(user: { id?: number, name: string, password: string }): Promise<User> {
        return Promise.resolve(new User(
            user.id || this.users.length,
            user.name,
            User.hashPassword(user.password)
        ));
    }

    async updateOne(query: Partial<User>, update: Omit<Partial<User>, "id">): Promise<User | null> {
        let user = await this.findOne(query)
        if (!user) return null
        Object.assign(user, update)


        return user;
    }

    async deleteOne(query: Partial<User>): Promise<User | null> {
        const user = await this.findOne(query)

        return user;
    }

    insertMany(user: User[]): Promise<User[]> {
        return Promise.resolve(user);
    }

    updateMany(update: Omit<Partial<User>, "id">): Promise<User[]>;
    updateMany(query: Partial<User> | Omit<Partial<User>, "id">, update: Omit<Partial<User>, "id">): Promise<User[]>;
    async updateMany(query: Partial<User> | Omit<Partial<User>, "id">, update?: Omit<Partial<User>, "id">): Promise<User[]> {
        let users = this.users
        if (update) {
            users = await this.find(query)
        }
        users.map(u => {
            Object.assign(u, update)
            return u
        })

        return new Array<User>(users as any)
    }

    async deleteMany(query: Partial<User>): Promise<User[]> {
        const users = await this.find(query)

        return users
    }
}