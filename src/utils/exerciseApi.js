const API_KEY = 'X+b9eXOWwgs4oAg+H9JW9Q==PtKsOMi3CXUpIK1i';
const API_URL = 'https://api.api-ninjas.com/v1/exercises';

export const fetchExercises = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const url = queryParams.toString() 
      ? `${API_URL}?${queryParams.toString()}`
      : API_URL;

    const response = await fetch(url, {
      headers: {
        'X-Api-Key': API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch exercises');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    return [];
  }
};

export const generateRandomWorkout = async (count = 5) => {
  const exercises = await fetchExercises();
  const shuffled = exercises.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};