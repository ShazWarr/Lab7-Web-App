const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Middlewere to parse JSON and urlencoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





let categories = ['successQuotes', 'perseveranceQuotes', 'happinessQuotes'];

let successQuotes = [
  {
    'quote': 'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'author': 'Winston S. Churchill'
  },
  {
    'quote': 'The way to get started is to quit talking and begin doing.',
    'author': 'Walt Disney'
  }
];

let perseveranceQuotes = [
  {
    'quote': 'It’s not that I’m so smart, it’s just that I stay with problems longer.',
    'author': 'Albert Einstein'
  },
  {
    'quote': 'Perseverance is failing 19 times and succeeding the 20th.',
    'author': 'Julie Andrews'
  }
];

let happinessQuotes = [
  {
    'quote': 'Happiness is not something ready made. It comes from your own actions.',
    'author': 'Dalai Lama'
  },
  {
    'quote': 'For every minute you are angry you lose sixty seconds of happiness.',
    'author': 'Ralph Waldo Emerson'
  }
];

// Get random quote from a category
function getRandomQuote(category) {
    switch (category) {
      case 'successQuotes':
        return successQuotes[Math.floor(Math.random() * successQuotes.length)];
      case 'perseveranceQuotes':
        return perseveranceQuotes[Math.floor(Math.random() * perseveranceQuotes.length)];
      case 'happinessQuotes':
        return happinessQuotes[Math.floor(Math.random() * happinessQuotes.length)];
      default:
        return null;
    }
  }
  
  // handler/route for a GET request to the path/endpoint "/quotebook/quote/" (Random quote from each category)
  app.get('/quotebook/quote/:category', (req, res) => {
    const category = req.params.category;
    let quote = null;
  
    // Check if the category is valid
    if (categories.includes(category)) {
      // Get random quote from the specefied category
      quote = getRandomQuote(category);
    } else {
      // Respond with error if category is not valid
      return res.status(400).json({ error: `No category listed for '${category}'` });
    }
  
    // Respond with the random quote as JSON
    res.json(quote);
  });



  // Handler/route for a POST request to the path/endpoint "/quotebook/quote/new" 
    app.post('/quotebook/quote/new', (req, res) => {
   
    // Extract parameters from the request body
    const { category, quote, author } = req.body;

    // Check for all paramters
    if (!category || !quote || !author || !categories.includes(category)) {
        // Respond with error if any required parameter is missing or category is invalid
        return res.status(400).json({ error: 'invalid or insufficient user input' });
    }

    // Add the new quote to the corresponding category array
    switch (category) {
        case 'successQuotes':
            successQuotes.push({ quote, author });
            break;
        case 'perseveranceQuotes':
            perseveranceQuotes.push({ quote, author });
            break;
        case 'happinessQuotes':
            happinessQuotes.push({ quote, author });
            break;
        default:
            
            return res.status(400).json({ error: 'invalid category' });
    }

    
    res.type('text').send('Success!');
});

  // Start the server
app.listen(port, () => {
    console.log(`Server is now listening on port ${port}`);
  });