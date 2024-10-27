export const handleResponseParsing = (response) => {
    try {
        const cleanedResponse = response
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '');    
  
      const parsedResponse = JSON.parse(cleanedResponse);
      return parsedResponse
    } catch (error) {
      return "Error parsing the response.";
    }
  }; 

  
  export async function fetchCoordinates(target) {
    try {
        // Construct the Nominatim API URL
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(target)}&format=json`);
  
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        // Parse the response data
        const data = await response.json();
  
        // Check if any results were returned
        if (data.length > 0) {
            const { lat, lon } = data[0]; // Get the first result's latitude and longitude
            console.log(`Coordinates for ${target}: Latitude ${lat}, Longitude ${lon}`);
            return { latitude: lat, longitude: lon }; // Return the coordinates
        } else {
            console.log(`No results found for ${target}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        return null;
    }
  }
  
  
  
  