import React, { useState, useEffect } from 'react';
import { Grid, Button, Checkbox, FormControlLabel, TextField, Card, CardContent, Tooltip } from '@mui/material';
import AbilityScores from './AbilityScore';
import Skills from './Skills';
import DnDClasses from '../reference_guide/DnDClasses';


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

        const characterData = {
            ...newCharacter,
            inventory: newCharacter.inventory.split(",").map(item => item.trim()), // Convert inventory string to array
        };

        // Send a POST request to the server to create a character
        fetch(`${process.env.REACT_APP_API_URL}/api/characters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
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
                <Card style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <h3>Character Details:</h3>

                        <Grid container spacing={2}>

                            <Grid item xs={6} sm={4} lg={2} >
                                <TextField
                                    fullWidth
                                    label="Name"
                                    variant="outlined"
                                    value={newCharacter.name}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, name: e.target.value })}
                                />
                            </Grid>
                            {/* Race */}
                            <Grid item xs={6} sm={4} lg={2} >
                                <Tooltip title={<span><DnDClasses prop={newCharacter.class} /> </span>}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Race"
                                        variant="outlined"
                                        value={newCharacter.race}
                                        onChange={(e) => setNewCharacter({ ...newCharacter, race: e.target.value })}
                                        SelectProps={{ native: true }}
                                    >
                                        <option value=""> </option>
                                        {races.map((race, index) => (
                                            <option key={index} value={race}>{race}</option>
                                        ))}
                                    </TextField>
                                </Tooltip>
                            </Grid>
                            {/* Class */}
                            <Grid item xs={6} sm={4} lg={2} >

                                <TextField
                                    fullWidth
                                    select
                                    label="Class"
                                    variant="outlined"
                                    value={newCharacter.class}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, class: e.target.value })}
                                    SelectProps={{ native: true }}
                                >
                                    <option value=""></option>
                                    {classes.map((charClass, index) => (
                                        <option key={index} value={charClass}>
                                            {charClass}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            {/* Alignment */}
                            <Grid item xs={6} sm={4} lg={2} >

                                <TextField
                                    fullWidth
                                    select
                                    label="Alignment"
                                    variant="outlined"
                                    SelectProps={{ native: true }}
                                    value={newCharacter.alignment}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, alignment: e.target.value })}
                                >
                                    <option value=""></option>
                                    {alignments.map((alignment, index) => (
                                        <option key={index} value={alignment}>
                                            {alignment}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                            {/* Background */}
                            <Grid item xs={6} sm={4} lg={2} >

                                <TextField
                                    fullWidth
                                    select
                                    label="Background"
                                    variant="outlined"
                                    SelectProps={{ native: true }}
                                    value={newCharacter.background}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, background: e.target.value })}
                                >
                                    <option value=""></option>
                                    {backgrounds.map((bg, index) => (
                                        <option key={index} value={bg}>
                                            {bg}
                                        </option>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                {/* Abilities (Strength, Dexterity, etc.) */}
                <Card style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Grid item xs={12}>
                            <h3>Abilities</h3>
                            <Grid container spacing={2}>
                                {Object.keys(newCharacter.abilities).map((ability, index) => (
                                    <Grid item xs={6} sm={4} md={2} key={index}>

                                        <Tooltip title={<span><AbilityScores ability={ability} /></span>} placement="top">
                                            <TextField
                                                fullWidth
                                                label={ability.charAt(0).toUpperCase() + ability.slice(1)} // Capitalize first letter
                                                type="number"
                                                variant="outlined"
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
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </CardContent>


                </Card>
                {/* Skills */}
                <Card style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <h3>Skills</h3>

                        <CardContent sx={{ p: 0 }}>
                            <Grid container spacing={2} justifyContent="center" alignContent={"center"}>
                                {skillsList.map((skill, index) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                        <Tooltip title={<span><Skills skill={skill} /></span>} placement="top">
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
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </CardContent>
                </Card>


                {/* Hit Points */}
                <Card style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Hit Points"
                                    type="number"
                                    variant="outlined"
                                    value={newCharacter.hitPoints}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, hitPoints: parseInt(e.target.value) })}
                                />
                            </Grid>

                            {/* Hit Dice */}
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Hit Dice"
                                    variant="outlined"
                                    value={newCharacter.hitDice}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, hitDice: e.target.value })}
                                />
                            </Grid>

                            {/* Inventory */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Inventory"
                                    variant="outlined"
                                    multiline
                                    rows={3}
                                    value={newCharacter.inventory}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, inventory: e.target.value })}
                                />
                            </Grid>
                            {/* Character Description */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Character Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    value={newCharacter.description}
                                    onChange={(e) => setNewCharacter({ ...newCharacter, description: e.target.value })}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Button variant="contained" type="submit">Add Character</Button>
            </form >
        </div >

    )
}