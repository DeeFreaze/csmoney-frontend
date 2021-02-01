export interface IUserProfile {
    id: number;
    steam_id: string;
    is_active: boolean;
    is_superuser: boolean;
    steam_user_name: string;
    steam_avatar_url: string;
    last_online: number;
}

export interface IUserProfileCreate {
    email: string;
    steam_user_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}

export interface IUserProfileUpdate {
    email?: string;
    steam_user_name?: string;
    password?: string;
    is_active?: boolean;
    is_superuser?: boolean;
}
