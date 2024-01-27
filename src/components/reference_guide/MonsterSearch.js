import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, CircularProgress, Typography, Box, Container, Paper, Card, CardContent } from '@mui/material';

function MonsterSearch() {
    const [monsters, setMonsters] = useState([]);
    const [selectedMonster, setSelectedMonster] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/monsters")
            .then(response => response.json())
            .then(data => {
                setMonsters(data.results.map(monster => ({ ...monster, img: monster.img || null })));
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    const fetchMonsterDetails = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/monsters/${index}`)
            .then(response => response.json())
            .then(data => {
                setSelectedMonster(data);
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

    const renderMonsterData = (data) => {
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
                        {monsters.map((monster, index) => (
                            <ListItem button key={index} onClick={() => fetchMonsterDetails(monster.index)}>
                                {monster.img && (
                                    <ListItemAvatar>
                                        <Avatar alt={monster.name} src={monster.img} />
                                    </ListItemAvatar>
                                )}
                                <ListItemText primary={monster.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Paper elevation={3} sx={{ p: 2, minHeight: 500 }}>
                    {selectedMonster && (
                        <>
                            <Typography variant="h5" component="h2">{selectedMonster.name}</Typography>
                            {renderMonsterData(selectedMonster)}
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default MonsterSearch;
