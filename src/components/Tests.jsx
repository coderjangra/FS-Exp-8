import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, LinearProgress, Chip, CircularProgress, Alert } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import axios from 'axios';

export default function Tests() {
  const [testCode, setTestCode] = useState('// Fetching live code from GitHub...');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [latestRun, setLatestRun] = useState(null);

  const fetchRealData = async () => {
    try {
      setLoading(true);
      // 1. Fetch real source code from the main branch
      const codeRes = await axios.get('https://raw.githubusercontent.com/coderjangra/FS-Exp-8/main/backend/src/test/java/com/example/demo/UserServiceTest.java');
      setTestCode(codeRes.data);

      // 2. Fetch latest workflow run to see if tests passed
      const runRes = await axios.get('https://api.github.com/repos/coderjangra/FS-Exp-8/actions/runs');
      if (runRes.data.workflow_runs && runRes.data.workflow_runs.length > 0) {
        setLatestRun(runRes.data.workflow_runs[0]);
      }
      setError(null);
    } catch (err) {
      setError('Failed to fetch real data from GitHub. The repository might not be updated yet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealData();
  }, []);

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Live Unit Testing
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Fetching real JUnit & Mockito test source code from your GitHub repository.
        </Typography>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 4, bgcolor: '#161b22', color: '#c9d1d9', border: '1px solid #d29922' }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(88, 166, 255, 0.4)' }}>
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" color="secondary.main">UserServiceTest.java</Typography>
              <Chip label="Live from main branch" color="info" size="small" variant="outlined" />
            </Box>
            <Paper sx={{ p: 3, bgcolor: '#010409', borderRadius: 2, overflowX: 'auto', border: '1px solid #30363d', maxHeight: '500px' }}>
              {loading ? (
                <Box display="flex" justifyContent="center" p={4}><CircularProgress color="secondary" /></Box>
              ) : (
                <pre style={{ margin: 0, color: '#e6edf3', fontSize: '0.85rem' }}>
                  {testCode}
                </pre>
              )}
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <BugReportIcon color="success" fontSize="large" />
              <Typography variant="h5" color="white">Remote Test Results</Typography>
            </Box>

            {loading ? (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={2}>Querying GitHub Actions...</Typography>
                <LinearProgress color="info" />
              </Box>
            ) : !latestRun ? (
               <Typography variant="body2" color="text.secondary">No CI/CD runs found yet.</Typography>
            ) : (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} p={2} 
                     bgcolor={latestRun.conclusion === 'success' ? 'rgba(63, 185, 80, 0.1)' : 'rgba(248, 81, 73, 0.1)'} 
                     border={latestRun.conclusion === 'success' ? '1px solid rgba(63, 185, 80, 0.3)' : '1px solid rgba(248, 81, 73, 0.3)'} 
                     borderRadius={2}>
                  <Typography variant="h6" color={latestRun.conclusion === 'success' ? 'success.main' : 'error.main'}>
                    {latestRun.status === 'in_progress' ? 'RUNNING...' : latestRun.conclusion === 'success' ? 'PASSED' : 'FAILED'}
                  </Typography>
                  <Typography variant="h6" color="white">
                    commit: {latestRun.head_sha.substring(0, 7)}
                  </Typography>
                </Box>
                
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Mockito Coverage Configured</Typography>
                  <Chip label="True" color="success" size="small" />
                </Box>
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Last Execution Date</Typography>
                  <Typography variant="body2" color="white" fontWeight="bold">
                    {new Date(latestRun.updated_at).toLocaleString()}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Triggered By</Typography>
                  <Typography variant="body2" color="white" fontWeight="bold">
                    {latestRun.actor?.login || 'System'}
                  </Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
