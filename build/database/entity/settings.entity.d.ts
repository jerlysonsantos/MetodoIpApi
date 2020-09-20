import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class Settings extends BaseEntity {
    id: String;
    user: User;
    live_url: string;
    block_anwser: boolean;
    putzz: number;
    created_at: Date;
    updated_at: Date;
    addId(): void;
}
