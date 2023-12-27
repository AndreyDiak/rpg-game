import { Database } from '../supabase/types';

export type DBUser = Database['public']['Tables']['users']['Row'];

export type User = {
	id: number;
	email: string;
	name: string;
	cardsIDs: number[] | null;
	createdAt: Date;
	updatedAt: Date;
	profileImgUrl: string | null;
};
