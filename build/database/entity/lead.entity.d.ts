import { BaseEntity } from 'typeorm';
export declare class Lead extends BaseEntity {
    id: String;
    email: string;
    created_at: Date;
    updated_at: Date;
    addId(): void;
}
