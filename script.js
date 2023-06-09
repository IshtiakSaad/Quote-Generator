const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQuotes = [];

// Show New Quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank.
    if(!quote.author){
        authorText.textContent = "Unknown";
    }else{
        authorText.textContent = quote.author;
    }

    // Check Quote Length to determine styling. 
    if(quote.text.length > 50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text; 
}

// Get Quotes from API
async function getQuotes() {
    const apiURL = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiURL);
        // This way,'response' will not be populated until it has a data fetched from the API
        apiQuotes = await response.json();
        newQuote()
    }catch(error){
        // Catch Error here. 
        getQuotes();
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();