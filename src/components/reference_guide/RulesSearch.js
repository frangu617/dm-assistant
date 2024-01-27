import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, CircularProgress, Typography, Box, Container, Paper } from '@mui/material';

function RulesSearch() {
    const [rules, setRules] = useState([]);
    const [selectedRule, setSelectedRule] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/rule-sections")
            .then(response => response.json())
            .then(data => {
                setRules(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    const fetchRuleDetails = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/rule-sections/${index}`, {
            method: 'GET',
            headers: new Headers({ "Accept": "application/json" }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                setSelectedRule(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    };

    const renderRuleData = (data) => {
        if (!data || !data.desc) return null;

        // Splitting the content using '##' as the delimiter
        const sections = data.desc.split('##').map((section, index) => {
            // Remove leading/trailing whitespace and check if section is not empty
            const trimmedSection = section.trim();
            if (trimmedSection) {
                return (
                    <Typography key={index} variant="body1" paragraph>
                        {trimmedSection}
                    </Typography>
                );
            }
            return null;
        });

        return <>{sections}</>;
    };

    return (
        <Container sx={{ display: 'flex', my: 4 }}>
            <Box sx={{ width: '30%', mr: 2 }}>
                <Paper elevation={3} sx={{ maxHeight: 500, overflow: 'auto' }}>
                    <List>
                        {isLoading && <CircularProgress />}
                        {error && <Typography color="error">{error}</Typography>}
                        {rules.map((rule, index) => (
                            <ListItem button key={index} onClick={() => fetchRuleDetails(rule.index)}>
                                <ListItemText primary={rule.name} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Box>
            <Box sx={{ width: '70%' }}>
                <Paper elevation={3} sx={{ p: 2, minHeight: 500 }}>
                    {selectedRule && (
                        <>
                            <Typography variant="h5" component="h2">{selectedRule.name}</Typography>
                            {renderRuleData(selectedRule)}
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default RulesSearch;
