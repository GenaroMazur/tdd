export class User {
    constructor(
        public readonly id: number,
        public name: string,
        public password: string
    ) { }

    public static hashPassword(password: string, _salt?: string): string{
        return password
    }

    public static comparePassword(_password: string, _hash: string): boolean {
        return false
    }
}