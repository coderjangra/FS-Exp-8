import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, Button, CircularProgress, Alert, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import axios from 'axios';

export default function Deploy() {
  const [cdRuns, setCdRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCDRuns = async () => {
    try {
      // Fetch runs specifically for the manual CD pipeline
      const response = await axios.get('https://api.github.com/repos/coderjangra/FS-Exp-8/actions/workflows/cd.yml/runs');
      setCdRuns(response.data.workflow_runs.slice(0, 3));
      setError(null);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('The cd.yml workflow has not been found or run yet.');
      } else {
        setError('Failed to fetch CD workflow runs from GitHub API.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCDRuns();
    const interval = setInterval(fetchCDRuns, 10000); // Check every 10s for new deploys
    return () => clearInterval(interval);
  }, []);

  const latestDeploy = cdRuns.length > 0 ? cdRuns[0] : null;
  const isDeploying = latestDeploy?.status === 'in_progress' || latestDeploy?.status === 'queued';
  const isSuccess = latestDeploy?.conclusion === 'success';

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Live Automated Deployments
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Tracking real manual `workflow_dispatch` deployments via GitHub API.
        </Typography>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 4, bgcolor: '#161b22', color: '#c9d1d9', border: '1px solid #d29922' }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: isSuccess ? 'rgba(63, 185, 80, 0.4)' : isDeploying ? 'rgba(210, 153, 34, 0.4)' : 'rgba(240, 246, 252, 0.1)' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <CloudUploadIcon color={isSuccess ? "success" : isDeploying ? "warning" : "info"} fontSize="large" />
              <Typography variant="h5" color="white">Deployment Action (CD)</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={3} lineHeight={1.6}>
              This application has a physical <code>.github/workflows/cd.yml</code> file configured for manual dispatch. It simulates pushing a Docker image and updating Kubernetes manifests.
            </Typography>

            <Paper sx={{ p: 3, bgcolor: '#010409', borderRadius: 2, border: '1px solid #30363d', mb: 3 }}>
              <Typography variant="body2" color="text.primary" fontWeight="bold" mb={1}>How to trigger a real deployment:</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Go to the GitHub repository <strong>Actions</strong> tab, click on <strong>Continuous Deployment (Mock)</strong> on the left, and click <strong>Run workflow</strong>.
              </Typography>
              <Button 
                variant="outlined" 
                color="info" 
                fullWidth 
                href="https://github.com/coderjangra/FS-Exp-8/actions/workflows/cd.yml"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub Actions
              </Button>
            </Paper>
            
            {loading ? (
              <Box display="flex" justifyContent="center"><CircularProgress size={24} /></Box>
            ) : isDeploying ? (
              <Alert severity="warning" icon={<AutorenewIcon sx={{ animation: 'spin 2s linear infinite', '@keyframes spin': { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } } }} />}>
                Deployment currently in progress on GitHub...
              </Alert>
            ) : isSuccess ? (
              <Alert severity="success">Latest deployment was successful!</Alert>
            ) : latestDeploy ? (
              <Alert severity="error">Latest deployment failed or was cancelled.</Alert>
            ) : (
              <Alert severity="info">No deployments executed yet.</Alert>
            )}
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <StorageIcon color="secondary" fontSize="large" />
              <Typography variant="h5" color="white">Production Environment Logs</Typography>
            </Box>
            
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}><CircularProgress /></Box>
            ) : (
              <List>
                {cdRuns.length === 0 && <Typography variant="body2" color="text.secondary">Awaiting first deployment run...</Typography>}
                {cdRuns.map((run) => (
                  <ListItem key={run.id} sx={{ px: 0, py: 2, borderBottom: '1px solid rgba(240, 246, 252, 0.1)' }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {run.status === 'in_progress' ? <AutorenewIcon color="warning" /> : run.conclusion === 'success' ? <CheckCircleIcon color="success" /> : <ErrorIcon color="error" />}
                    </ListItemIcon>
                    <ListItemText 
                      primary={`Deploy to ${run.head_branch}`} 
                      secondary={new Date(run.created_at).toLocaleString()}
                      primaryTypographyProps={{ color: 'white', fontWeight: 600 }}
                      secondaryTypographyProps={{ color: 'text.secondary' }}
                    />
                    <Chip 
                      label={run.status === 'completed' ? run.conclusion : run.status} 
                      color={run.conclusion === 'success' ? 'success' : run.conclusion === 'failure' ? 'error' : 'warning'}
                      size="small"
                      variant="outlined"
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
