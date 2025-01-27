import { User } from "./user.interface";

export interface UsersResponse {
    data: User[];
    hasMore: boolean;
}