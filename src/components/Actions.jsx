import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CircleIcon from '@mui/icons-material/Circle';

const workflowSteps = [
  { id: 1, name: 'Set up JDK 17', status: 'success', time: '2s' },
  { id: 2, name: 'Build with Maven', status: 'success', time: '45s' },
  { id: 3, name: 'Run JUnit Tests', status: 'success', time: '12s' },
  { id: 4, name: 'Build Docker Image', status: 'success', time: '30s' },
];

const yamlContent = `name: Java CI with Maven
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: maven
    - name: Build with Maven
      run: mvn -B package --file pom.xml
    - name: Run Tests
      run: mvn test`;

export default function Actions() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          CI/CD Pipelines
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Automated workflows triggered on push to main branch.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(35, 134, 54, 0.4)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" color="white">ci.yml Workflow</Typography>
              <Chip label="main" color="secondary" variant="outlined" size="small" />
            </Box>
            <Paper sx={{ p: 3, bgcolor: '#010409', borderRadius: 2, overflowX: 'auto', border: '1px solid #30363d' }}>
              <pre style={{ margin: 0, color: '#e6edf3', fontSize: '0.85rem' }}>
                {yamlContent}
              </pre>
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ p: 4, height: '100%' }}>
             <Box display="flex" alignItems="center" gap={2} mb={3}>
               {progress < 100 ? <PendingIcon color="warning" /> : <CheckCircleIcon color="success" />}
               <Typography variant="h5" color="white">Job Status</Typography>
             </Box>
             
             <Box mb={4}>
               <Box display="flex" justifyContent="space-between" mb={1}>
                 <Typography variant="body2" color="text.secondary">Progress</Typography>
                 <Typography variant="body2" color="white">{Math.round(progress)}%</Typography>
               </Box>
               <LinearProgress variant="determinate" value={progress} color={progress === 100 ? "success" : "warning"} sx={{ height: 8, borderRadius: 4, bgcolor: '#21262d' }} />
             </Box>

             <List>
               {workflowSteps.map((step) => (
                 <ListItem key={step.id} sx={{ px: 0, py: 1 }}>
                   <ListItemIcon sx={{ minWidth: 36 }}>
                     {progress > (step.id * 25) ? <CheckCircleIcon color="success" fontSize="small" /> : <CircleIcon sx={{ color: '#30363d' }} fontSize="small" />}
                   </ListItemIcon>
                   <ListItemText primary={step.name} primaryTypographyProps={{ color: progress > (step.id * 25) ? 'white' : 'text.secondary' }} />
                   {progress > (step.id * 25) && <Typography variant="caption" color="text.secondary">{step.time}</Typography>}
                 </ListItem>
               ))}
             </List>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
