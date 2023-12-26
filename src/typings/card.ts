import { Database } from '../supabase/types';

export type DBCard = Database['public']['Tables']['cards']['Row'];

export type Card = {
	id: number;
	characterId: number;
	count: number;
	createdAt: Date;
	level: number;
	prestige: number;
};
