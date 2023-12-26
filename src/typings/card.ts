import { Database } from '../supabase/types';

export type DBCard = Database['public']['Tables']['cards']['Row'];
