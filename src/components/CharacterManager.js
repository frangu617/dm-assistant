import React, { useState, useEffect } from 'react';

const CharacterManager = () => {
    const [characters, setCharacters] = useState([]);
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

    {/* Display Characters */ }

    return (
        <div>
            <h3>Characters:</h3>
            <ul>
                {characters.map((character, index) => (
                    <li key={index}>
                        Name: {character.name}, Class: {character.class}, Race: {character.race}
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>

        </div>

    )
};

export default CharacterManager;
