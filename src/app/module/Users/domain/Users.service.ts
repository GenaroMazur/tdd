import { RepositoryClass } from "../../../class/Repository"
import { ServiceClass } from "../../../class/Service.class"
import { User } from "./User"

export class UserService extends ServiceClass<User> {
    constructor(userRepository: RepositoryClass<User>) {
        super(userRepository)
    }

    public listDocs = async () => {
        return await this.repository.find()
    }

    public getDoc = async (query: Partial<User>) => {
        return this.repository.findOne(query)
    }

    public delete = async (query: Partial<User>) => {
        return this.repository.deleteOne(query)
    }

    public update: (query: Partial<User>, newDoc: User | Omit<User, "id">) => Promise<User | null> = async (query, updated) => {
        if (updated.password) updated.password = User.hashPassword(updated.password)

        return this.repository.updateOne(query, updated)
    }

    public create: (newDoc: User | Omit<User, "id">) => Promise<User> = async (newDoc) => {

        newDoc.password = User.hashPassword(newDoc.password)

        return this.repository.createOne(newDoc)
    }
}