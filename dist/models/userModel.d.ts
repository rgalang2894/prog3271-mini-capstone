export interface UserRecord {
    id: number;
    name: string;
    email: string;
    password_hash: string;
}
export declare const findAllUsers: () => Promise<any>;
export declare const findUserByEmail: (email: string) => Promise<UserRecord | undefined>;
export declare const findByUsername: (username: string) => Promise<UserRecord | undefined>;
export declare const createUser: (name: string, email: string, password: string) => Promise<{
    id: any;
    name: string;
    email: string;
}>;
export declare const verifyUserPassword: (email: string, password: string) => Promise<{
    id: number;
    name: string;
    email: string;
} | null>;
//# sourceMappingURL=userModel.d.ts.map