import { Database } from '../supabase/types';
import { DBCard } from './card';
import { DBCharacter } from './character';

export type DBUser = Database['public']['Tables']['users']['Row'];

export type UserCard = Omit<DBCard, 'character_id'> & { character: DBCharacter };

export type User = {
	id: number;
	email: string;
	name: string;
	cards: UserCard[];
	createdAt: Date;
	updatedAt: Date;
	profileImgUrl: string | null;
};
