import React, { useState } from 'react';

const YouTubeSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);

    const handleSearch = () => {
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY; // Ensure this is set in your .env file
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&key=${apiKey}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items) {
                    setSearchResults(data.items); // Store the search results in state
                } else {
                    setSearchResults([]); // Set to an empty array if no items are found
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setSearchResults([]); // Set to an empty array in case of an error
            });
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for music"
            />
            <button onClick={handleSearch}>Search</button>

            {/* Display Search Results */}
            {searchResults && searchResults.map((item, index) => (
                <div key={index}>
                    <h3>{item.snippet.title}</h3>
                    {/* You can add more details or an embedded player here */}
                </div>
            ))}
        </div>
    );
};

export default YouTubeSearch;
