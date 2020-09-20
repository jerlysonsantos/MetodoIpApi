import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: String;
    name: string;
    phone: string;
    rate: number;
    email: string;
    password: string;
    token: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    addId(): void;
    setPassword(): Promise<void>;
}
