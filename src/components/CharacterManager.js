import React, { useState } from 'react';

const CharacterManager = () => {
    // Define state variables to store character data
    const [characters, setCharacters] = useState([]);
    const [newCharacter, setNewCharacter] = useState({
        name: '',
        race: '',
        class: '',
        level: 1,
        alignment: '',
        background: '',
        abilities: {
            strength: 10,
            dexterity: 10,
            constitution: 10,
            intelligence: 10,
            wisdom: 10,
            charisma: 10,
        },
        skills: [],
        feats: [],
        hitPoints: 10,
        hitDice: '1d10',
        inventory: [],
        description: '',
    });

    // Define arrays for races, classes, alignments, backgrounds, and skills
    const races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
    const backgrounds = ['Acolyte', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Criminal', 'Entertainer', 'Hermit', 'Outlander'];
    const skillsList = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];

    // Function to handle character submission
    const handleCharacterSubmit = (e) => {
        e.preventDefault();

        // Add the new character to the characters array
        setCharacters([...characters, newCharacter]);

        // Clear the form fields
        setNewCharacter({
            name: '',
            race: '',
            class: '',
            level: 1,
            alignment: '',
            background: '',
            abilities: {
                strength: 10,
                dexterity: 10,
                constitution: 10,
                intelligence: 10,
                wisdom: 10,
                charisma: 10,
            },
            skills: [],
            feats: [],
            hitPoints: 10,
            hitDice: '1d10',
            inventory: [],
            description: '',
        });
    };

    return (
        <div>
            <h2>D&D Character Creator</h2>

            {/* Character Creation Form */}
            <form onSubmit={handleCharacterSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={newCharacter.name}
                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                />

                {/* Race */}
                <select
                    value={newCharacter.race}
                    onChange={(e) => setNewCharacter({ ...newCharacter, race: e.target.value })}
                >
                    <option value="">-- Select Race --</option>
                    {races.map((race, index) => (
                        <option key={index} value={race}>
                            {race}
                        </option>
                    ))}
                </select>

                {/* Class */}
                <select
                    value={newCharacter.class}
                    onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
                >
                    <option value="">-- Select Class --</option>
                    {classes.map((charClass, index) => (
                        <option key={index} value={charClass}>
                            {charClass}
                        </option>
                    ))}
                </select>

                {/* Alignment */}
                <select
                    value={newCharacter.alignment}
                    onChange={(e) => setNewCharacter({ ...newCharacter, alignment: e.target.value })}
                >
                    <option value="">-- Select Alignment --</option>
                    {alignments.map((alignment, index) => (
                        <option key={index} value={alignment}>
                            {alignment}
                        </option>
                    ))}
                </select>

                {/* Background */}
                <select
                    value={newCharacter.background}
                    onChange={(e) => setNewCharacter({ ...newCharacter, background: e.target.value })}
                >
                    <option value="">-- Select Background --</option>
                    {backgrounds.map((bg, index) => (
                        <option key={index} value={bg}>
                            {bg}
                        </option>
                    ))}
                </select>

                {/* Abilities (Strength, Dexterity, etc.) */}
                <h3>Abilities</h3>
                {Object.keys(newCharacter.abilities).map((ability, index) => (
                    <div key={index}>
                        <label>{ability}: </label>
                        <input
                            type="number"
                            value={newCharacter.abilities[ability]}
                            onChange={(e) => setNewCharacter({ ...newCharacter, abilities: { ...newCharacter.abilities, [ability]: parseInt(e.target.value) } })}
                        />
                    </div>
                ))}

                {/* Skills */}
                <h3>Skills</h3>
                {skillsList.map((skill, index) => (
                    <div key={index}>
                        <label>{skill}</label>
                        <input
                            type="checkbox"
                            checked={newCharacter.skills.includes(skill)}
                            onChange={(e) => {
                                const skills = [...newCharacter.skills];
                                if (e.target.checked) {
                                    skills.push(skill);
                                } else {
                                    const index = skills.indexOf(skill);
                                    if (index !== -1) {
                                        skills.splice(index, 1);
                                    }
                                }
                                setNewCharacter({ ...newCharacter, skills });
                            }}
                        />
                    </div>
                ))}

                {/* Hit Points */}
                <div>
                    <label>Hit Points: </label>
                    <input
                        type="number"
                        value={newCharacter.hitPoints}
                        onChange={(e) => setNewCharacter({ ...newCharacter, hitPoints: parseInt(e.target.value) })}
                    />
                </div>

                {/* Hit Dice */}
                <div>
                    <label>Hit Dice: </label>
                    <input
                        type="text"
                        value={newCharacter.hitDice}
                        onChange={(e) => setNewCharacter({ ...newCharacter, hitDice: e.target.value })}
                    />
                </div>

                {/* Inventory */}
                <div>
                    <label>Inventory: </label>
                    <textarea
                        value={newCharacter.inventory}
                        onChange={(e) => setNewCharacter({ ...newCharacter, inventory: e.target.value })}
                    />
                </div>

                {/* Character Description */}
                <div>
                    <label>Character Description: </label>
                    <textarea
                        value={newCharacter.description}
                        onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
                    />
                </div>

                <button type="submit">Add Character</button>
            </form>

            {/* Display Characters */}
            <div>
                <h3>Characters:</h3>
                <ul>
                    {characters.map((character, index) => (
                        <li key={index}>
                            {/* Display character details */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CharacterManager;
