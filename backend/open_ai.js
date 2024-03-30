const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/engines/davinci/completions';
const { OPENAI_API_KEY } = require('./key');

async function generateText(prompt) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                prompt: prompt,
                max_tokens: 150, // Adjust based on your needs
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

module.exports = { generateText };