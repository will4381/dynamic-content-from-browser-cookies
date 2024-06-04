const express = require('express');
const cookieParser = require('cookie-parser');
const Groq = require('groq-sdk');

const app = express();
app.use(cookieParser());

const groq = new Groq({
  apiKey: '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',
});

// Endpoint to set cookies
app.get('/set-cookies', (req, res) => {
  // Set different cookies for testing
  res.cookie('userID', '12345');
  res.cookie('favoriteColor', 'blue');
  res.cookie('preferredLanguage', 'en');
  res.cookie('location', 'New York');
  res.cookie('lastVisited', '2023-06-02');
  res.send('Cookies set successfully!');
});

// Main page
app.get('/', async (req, res) => {
  const startTime = Date.now();

  const userID = req.cookies.userID;
  const favoriteColor = req.cookies.favoriteColor;
  const preferredLanguage = req.cookies.preferredLanguage;
  const location = req.cookies.location;
  const lastVisited = req.cookies.lastVisited;

  // Create a prompt based on the cookie data
  const prompt = `Generate a short personalized headline and description ONLY, for the user with the following information:
  User ID: ${userID}
  Favorite Color: ${favoriteColor}
  Preferred Language: ${preferredLanguage}
  Location: ${location}
  Last Visited: ${lastVisited}`;

  try {
    // Generate personalized content using Groq chat completions API
    const completion = await groq.chat.completions.create({
      model: 'llama3-8b-8192',
      messages: [
        { role: 'user', content: prompt },
      ],
    });

    const generatedContent = completion.choices[0].message.content.trim();

    // Create HTML template with personalized content and speed information
    const html = `
      <html>
        <head>
          <title>Personalized Page</title>
        </head>
        <body>
          <h1>Personalized Content</h1>
          <p>${generatedContent}</p>
          <hr>
          <h2>Speed Information</h2>
          <p>Latency: ${Date.now() - startTime} ms</p>
          <p>Generated at: ${new Date().toISOString()}</p>
          <p>Groq Model: llama3-8b-8192</p>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error generating personalized content:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});