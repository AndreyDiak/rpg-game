import { Database } from '../supabase/types';
import { Character, DBCharacter } from './character';

export type DBCard = Database['public']['Tables']['cards']['Row'];

export type PCard = Omit<DBCard, 'character_id'> & {
	character: DBCharacter;
};

export type Card = {
	id: number;
	ownerID: number;
	character: Character;
	count: number;
	createdAt: Date;
	level: number;
	prestige: number;
};
