// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ptrxkfaqqaxziwpfoxdr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnhrZmFxcWF4eml3cGZveGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MDc4MzYsImV4cCI6MjA2MjI4MzgzNn0.DwhqZTpTkfwzg9CK79Eqv_OqFNKH4iutLPa_2EhMS3k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);