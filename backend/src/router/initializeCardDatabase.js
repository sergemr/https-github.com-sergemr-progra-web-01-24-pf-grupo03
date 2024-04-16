const axios = require('axios');
const Product = require('../model/product.model');  // Assuming this is the correct path

async function initializeCardDatabase() {
  try {
    // Fetching a specific set from Scryfall
    const response = await axios.get('https://api.scryfall.com/cards/search?order=set&q=e%3Aeld+include%3Aextras&unique=prints');
    const cards = response.data.data; // Adjust according to actual response structure
    
    for (const card of cards) {
        console.log(card);  // Log the card data to see what's available
        await Product.create({
          name: card.name,
          mana_cost: card.mana_cost,
          type_line: card.type_line,
          oracle_text: card.oracle_text,
          image_uris: card.image_uris,
          set_name: card.set_name,
          rarity: card.rarity,
          oracle_id: card.oracle_id,  // Ensure this is correctly assigned
          set: card.set  // Ensure this is correctly assigned
        });
      }
    console.log('Cards have been saved to the database!');
  } catch (error) {
    console.error('Failed to download card data:', error);
  }
}

module.exports = {
    initializeCardDatabase
};