import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress, Typography, Box, Container, Paper, Card, CardContent } from '@mui/material';

function RaceSearch() {
    const [races, setRaces] = useState([]);
    const [selectedRace, setSelectedRace] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/races")
            .then(response => response.json())
            .then(data => {
                setRaces(data.results.map(race => ({ ...race, img: race.img || null })));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    const fetchRaceDetails = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/races/${index}`)
            .then(response => response.json())
            .then(data => {
                setSelectedRace(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    };

    const formatValue = (value, level = 0) => {
        if (Array.isArray(value)) {
            return value.map((item, index) => (
                <Box key={index} sx={{ pl: level * 2 }}>
                    {formatValue(item, level + 1)}
                </Box>
            ));
        } else if (typeof value === 'object' && value !== null) {
            return (
                <Card variant="outlined" sx={{ mb: 2, ml: level * 2 }}>
                    <CardContent>
                        {Object.entries(value).map(([key, val], i) => (
                            <Typography key={i} variant="body2" component="div">
                                <strong>{key}:</strong> {formatValue(val, level + 1)}
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            );
        } else {
            return value.toString();
        }
    };

    const renderRaceData = (data) => {
        if (!data) return null;

        return Object.entries(data).map(([key, value], i) => (
            <Typography key={i} variant="body2" component="div" sx={{ mt: 1 }}>
                <strong>{key}:</strong> {formatValue(value)}
            </Typography>
        ));
    };

    return (
        <Container sx={{ display: 'flex', my: 4 }}>
            <Box sx={{ width: '30%', mr: 2 }}>
                <Paper elevation={3} sx={{ maxHeight: 500, overflow: 'auto' }}>
                    <List>
                        {isLoading && <CircularProgress />}
                        {error && <Typography color="error">{error}</Typography>}
                        {races.map((race, index) => (
                            <ListItem button key={index} onClick={() => fetchRaceDetails(race.index)}>
                                {race.img && (
                                    <ListItemAvatar>
                                        <Avatar alt={race.name} src={race.img} />
                                    </ListItemAvatar>
                                )}
                                <ListItemText primary={race.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Paper elevation={3} sx={{ p: 2, minHeight: 500 }}>
                    {selectedRace && (
                        <>
                            <Typography variant="h5" component="h2">{selectedRace.name}</Typography>
                            {renderRaceData(selectedRace)}
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default RaceSearch;
