import React, { useState, useEffect } from 'react';
import { Grid, FormControl, FormLabel, Checkbox, FormControlLabel } from '@mui/material';


export default function CharacterCreator() {

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
        inventory: '',
        description: '',
    });
    // Define arrays for races, classes, alignments, backgrounds, and skills
    const races = ['Dwarf', 'Elf', 'Halfling', 'Human', 'Dragonborn', 'Gnome', 'Half-Elf', 'Half-Orc', 'Tiefling'];
    const classes = ['Barbarian', 'Bard', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'];
    const alignments = ['Lawful Good', 'Neutral Good', 'Chaotic Good', 'Lawful Neutral', 'True Neutral', 'Chaotic Neutral', 'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'];
    const backgrounds = ['Acolyte', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Criminal', 'Entertainer', 'Hermit', 'Outlander'];
    const skillsList = ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'];

    const getInitialCharacterState = () => ({
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
        inventory: '',
        description: '',
    });

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/api/characters`)
            .then((response) => {
                console.log('Response:', response);
                return response.json();
            })
            .then((data) => {
                console.log('Data:', data);
                setCharacters(data);
            })
            .catch((error) => console.error('Error fetching characters:', error));
    }, []);


    const handleCharacterSubmit = (e) => {
        e.preventDefault();

        // Send a POST request to the server to create a character
        fetch('/api/characters', {
            method: 'POST',
            action: "/characters",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCharacter),
        })
            .then((response) => response.json())
            .then((data) => {
                setCharacters([...characters, data]);
                setNewCharacter(getInitialCharacterState());
            })
            .catch((error) => console.error('Error creating character:', error));
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
                <Grid container spacing={2}>
                    {Object.keys(newCharacter.abilities).map((ability, index) => (
                        <Grid item xs={6} sm={4} lg={2} key={index}>
                            <FormControl>

                                <FormLabel>{ability}: </FormLabel>
                                <input
                                    type="number"
                                    value={newCharacter.abilities[ability]}
                                    onChange={(e) =>
                                        setNewCharacter({
                                            ...newCharacter,
                                            abilities: {
                                                ...newCharacter.abilities,
                                                [ability]: parseInt(e.target.value),
                                            },
                                        })
                                    }
                                />
                            </FormControl>
                        </Grid>
                    ))}
                </Grid>
                {/* Skills */}
                <h3>Skills</h3>
                <Grid container spacing={2}>
                    {skillsList.map((skill, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <FormControlLabel
                                control={
                                    <Checkbox
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
                                }
                                label={skill}
                            />
                        </Grid>
                    ))}
                </Grid>



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
            </form >
        </div >

    )
}