import { API_BASE_URL } from '@/app/lib/config';

export async function getSaveALifeData(shareCode: string = 'random') {
  try {
    const response = await fetch(`${API_BASE_URL}/web/save_a_life?shareCode=${encodeURIComponent(shareCode)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    const data = await response.json();
    return data.patientsList || [];

  } catch (error) {
    console.error('Fetch error:', error);
    console.log("couldn't fetch data")
    return [];
  }
}