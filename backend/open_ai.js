const axios = require('axios');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const { OPENAI_API_KEY } = require("./key")

async function generateText(messages, model) {
    try {
        const response = await axios.post(
            OPENAI_API_URL,
            {
                model: model,
                messages: messages
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw error;
    }
}

module.exports = { generateText };
