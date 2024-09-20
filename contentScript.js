async function sendTextToGPT(text) {
    try {
        const tone = await getPreferredTone();
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {"role": "system", "content": `Improve this text with a ${tone} tone:`},
                    {"role": "user", "content": text}
                ]
            })
        });

        const data = await response.json();
        
        // Check if the response is structured correctly
        if (data.choices && data.choices.length > 0) {
            const improvedText = data.choices[0].message.content;
            displaySuggestion(improvedText);
        } else {
            console.error('Unexpected API response structure:', data);
            displaySuggestion('Sorry, something went wrong with the API response.');
        }
    } catch (error) {
        console.error('Error while calling GPT API:', error);
        displaySuggestion('Sorry, something went wrong. Please try again.');
    }
}
