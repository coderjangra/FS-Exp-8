import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText, Chip, CircularProgress, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PendingIcon from '@mui/icons-material/Pending';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from 'axios';

const yamlContent = `name: Java CI with Maven
on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: ./backend
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
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRuns = async () => {
    try {
      // Fetch real GitHub Actions runs from the repository!
      const response = await axios.get('https://api.github.com/repos/coderjangra/FS-Exp-8/actions/runs');
      setRuns(response.data.workflow_runs.slice(0, 5)); // Get top 5 recent runs
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Repository FS-Exp-8 not found or no workflows run yet. Push your code to see live CI/CD runs!');
      } else {
        setError('Failed to fetch workflow runs from GitHub API. Rate limit exceeded or network error.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRuns();
    // Poll the GitHub API every 15 seconds to get live status updates
    const interval = setInterval(fetchRuns, 15000);
    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status, conclusion) => {
    if (status === 'in_progress' || status === 'queued') {
      return <AutorenewIcon color="warning" sx={{ animation: 'spin 2s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />;
    }
    if (conclusion === 'success') return <CheckCircleIcon color="success" />;
    if (conclusion === 'failure') return <ErrorIcon color="error" />;
    return <PendingIcon color="info" />;
  };

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Live CI/CD Pipelines
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fetching real-time workflow statuses directly from the GitHub API.
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
               <Typography variant="h5" color="white">Live Repository Status</Typography>
             </Box>
             
             {error && (
               <Alert severity="warning" sx={{ mb: 3, bgcolor: '#161b22', color: '#c9d1d9', border: '1px solid #d29922' }}>
                 {error}
               </Alert>
             )}

             {loading ? (
               <Box display="flex" justifyContent="center" p={4}>
                 <CircularProgress color="success" />
               </Box>
             ) : (
               <List>
                 {runs.length === 0 && !error && (
                   <Typography variant="body2" color="text.secondary">No workflow runs found yet.</Typography>
                 )}
                 {runs.map((run) => (
                   <ListItem key={run.id} sx={{ px: 0, py: 1.5, borderBottom: '1px solid rgba(240, 246, 252, 0.1)' }}>
                     <ListItemIcon sx={{ minWidth: 40 }}>
                       {getStatusIcon(run.status, run.conclusion)}
                     </ListItemIcon>
                     <ListItemText 
                        primary={run.display_title || run.head_commit?.message || 'Workflow Run'} 
                        secondary={`Branch: ${run.head_branch} • ${new Date(run.created_at).toLocaleString()}`}
                        primaryTypographyProps={{ color: 'white', fontWeight: 600, noWrap: true }} 
                        secondaryTypographyProps={{ color: 'text.secondary' }}
                     />
                     <Chip 
                        label={run.status === 'completed' ? run.conclusion : run.status} 
                        color={run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'error' : 'warning'}
                        size="small"
                        variant="outlined"
                        sx={{ ml: 2, textTransform: 'capitalize' }}
                     />
                   </ListItem>
                 ))}
               </List>
             )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
