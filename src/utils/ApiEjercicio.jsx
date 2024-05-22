
export default async function ApiEjercicio(parteRecuperar) {
    const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${parteRecuperar}?limit=500`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '789db05d5cmsh450d6b87bf6b6aap1f6c59jsnf3348796f730',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Partes 
[
    "back",
    "cardio",
    "chest",
    "lower arms",
    "lower legs",
    "neck",
    "shoulders",
    "upper arms",
    "upper legs",
    "waist"
  ]