export const extractMessage = (response) => {
    try {
        const cleanedResponse = response
        .replace(/^```json\s*/, '')
        .replace(/\s*```$/, '');    
  
      const parsedResponse = JSON.parse(cleanedResponse);
      return parsedResponse?.message
    } catch (error) {
      return "Error parsing the response.";
    }
  }; 