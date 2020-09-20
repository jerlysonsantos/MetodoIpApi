import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export declare class Question extends BaseEntity {
    id: String;
    user: User;
    tema: string;
    dateTime: string;
    text: string;
    resposta: string;
    selected: boolean;
    selectedToPablo: boolean;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    addId(): void;
}
