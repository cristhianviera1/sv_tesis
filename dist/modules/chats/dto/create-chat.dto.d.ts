import { Message } from '../schema/chat.schema';
export default class CreateChatDto {
    _id: string;
    fromUser: string;
    toUser: string;
    message: Message;
    created_at: number;
    updated_at: number;
    deleted_at: number;
    constructor(fromUser: string, toUser: string, message: Message);
}
