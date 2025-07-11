
'use server';

import { getAllTables } from '@/lib/db';

export async function getDatabaseTables() {
  try {
    const data = getAllTables();
    return { success: true, data };
  } catch (error) {
    console.error("Error fetching database tables:", error);
    if (error instanceof Error) {
        return { success: false, error: error.message };
    }
    return { success: false, error: 'An unknown error occurred while fetching database data.' };
  }
}
