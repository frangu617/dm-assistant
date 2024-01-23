const express = require('express');
const router = express.Router();
const {
    createCharacter,
    getAllCharacters,
    getCharacterById,
    updateCharacterById,
    deleteCharacterById
} = require('../controllers/characterController'); // Adjust the path as necessary

// Define routes
router.post('/', createCharacter);
router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);
router.put('/:id', updateCharacterById);
router.delete('/:id', deleteCharacterById);

module.exports = router;
