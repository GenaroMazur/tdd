import { ServiceClass } from "../../../app/class/Service.class";
import { User } from "../../../app/module/Users/domain/User";
import { UserService } from "../../../app/module/Users/domain/Users.service"
import { UserRepoMock } from "./moks/UserRepoMok";
import usersCollection from "./usersCollection";

describe("User Services", () => {
    let userService: UserService

    beforeEach(() => {
        userService = new UserService(new UserRepoMock())
    })

    it("child of Service class", () => {
        expect(userService).toBeInstanceOf(ServiceClass)
        expect(Object(userService)["repository"]).toBeInstanceOf(UserRepoMock)
    })

    it("list of users", async () => {
        let userList: User[]

        userList = await userService.listDocs()

        expect(JSON.stringify(userList)).toBe(JSON.stringify(usersCollection))
    })

    it.each(
        [
            { query: { name: "genaro" }, exist: true },
            { query: { id: 3 }, exist: true },
            { query: { name: "JUAN" }, exist: false }
        ]
    )("find one user: %s", async (caseUse) => {
        let user: User | null

        user = await userService.getDoc(caseUse.query)

        if (caseUse.exist) {
            expect(user).not.toBeNull()
            expect(usersCollection).toContain(user)
        } else {
            expect(user).toBeNull()
        }

    })

    it.each([
        { query: { name: "genaro" }, exist: true },
        { query: { id: 3 }, exist: true },
        { query: { name: "JUAN" }, exist: false }
    ])("delete one User %s", async (caseUse) => {
        let user: User | null

        user = await userService.delete(caseUse.query)

        if (caseUse.exist) {
            expect(user).not.toBeNull()
            expect(usersCollection).toContain(user)
        } else {
            expect(user).toBeNull()
        }
    })
})