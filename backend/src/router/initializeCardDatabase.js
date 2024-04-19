const axios = require('axios');
const Product = require('../model/product.model');  // Assuming this is the correct path

async function initializeCardDatabase() {
  try {
    // Check if any products already exist
    const existingProducts = await Product.findAndCountAll();
    if (existingProducts.count > 0) {
      console.log('Products already initialized.');
      return;  // Exit if there are already products in the database
    }

    // Fetching a specific set from Scryfall
    const response = await axios.get('https://api.scryfall.com/cards/search?order=set&q=e%3Aeld+include%3Aextras&unique=prints');
    const cards = response.data.data; // Adjust according to actual response structure
    
    for (const card of cards) {
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
    console.error('Failed to initialize card database:', error);
  }
}

module.exports = {
  initializeCardDatabase
};
