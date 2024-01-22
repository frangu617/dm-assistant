const Character = require('./models/Character');

// Create a new character
const createCharacter = async (req, res) => {
    try {
        const character = new Character(req.body);
        await character.save();
        res.status(201).json(character);
    } catch (error) {
        res.status(400).json({ error: 'Could not create character' });
    }
};

module.exports = { createCharacter };
