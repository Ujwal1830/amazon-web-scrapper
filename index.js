import express, { json } from 'express';
import request from 'request-promise';

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = 'a0e4851140fe33b2c6ae45a3175b7317';
// const generateBaseUrl=()=> `http://api.scraperapi.com?a0e4851140fe33b2c6ae45a3175b7317&autoparse=true`;
const baseUrl = 'http://api.scraperapi.com?api_key=a0e4851140fe33b2c6ae45a3175b7317&autoparse=true'

app.use(json());

app.get('/', (req, res)=>{
    res.send('Welcome to Amazon Web Scraper API')
})

//Get Product Details
app.get('/products/:productId', async(req, res)=>{
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Product Review
app.get('/products/:productId/reviews', async(req, res)=>{
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}/`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Product Offers
app.get('/products/:productId/offers', async(req, res)=>{
    const { productId } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}/`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

//Get Search Results
app.get('/search/:searchQuery', async(req, res)=>{
    const { searchQuery } = req.params;
    const { api_key } = req.query;
    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`);
        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error);
    }
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})

module.exports = app;