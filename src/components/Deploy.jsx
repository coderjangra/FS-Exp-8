import React, { useState } from 'react';
import { Box, Card, Typography, Grid, Paper, Button, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import StorageIcon from '@mui/icons-material/Storage';

export default function Deploy() {
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 2500);
  };

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Automated Deployments
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Push to container registry and deploy to Kubernetes.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%', borderColor: deployed ? 'rgba(63, 185, 80, 0.4)' : 'rgba(240, 246, 252, 0.1)' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <CloudUploadIcon color={deployed ? "success" : "info"} fontSize="large" />
              <Typography variant="h5" color="white">Deployment Action</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" mb={4}>
              Upon successful completion of the CI pipeline (building and testing), a webhook triggers the CD process. The Docker image is pushed to a registry (e.g. Docker Hub, ECR) and Kubernetes deployments are updated with the new image tag.
            </Typography>
            
            <Button 
              variant="contained" 
              color={deployed ? "success" : "primary"} 
              size="large" 
              fullWidth
              onClick={handleDeploy}
              disabled={deploying || deployed}
            >
              {deploying ? <CircularProgress size={24} color="inherit" /> : deployed ? 'Deployment Successful' : 'Trigger Manual Deploy'}
            </Button>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={3}>
              <StorageIcon color="secondary" fontSize="large" />
              <Typography variant="h5" color="white">Production Environment</Typography>
            </Box>
            
            <Paper sx={{ p: 3, bgcolor: '#010409', borderRadius: 2, border: '1px solid #30363d' }}>
              <Box mb={2} display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Cluster Status</Typography>
                <Typography variant="body2" color={deployed ? "success.main" : "white"}>{deployed ? "Updating..." : "Stable"}</Typography>
              </Box>
              <Box mb={2} display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Active Image Tag</Typography>
                <Typography variant="body2" color="white" fontFamily="monospace">{deployed ? "v1.2.4-stable" : "v1.2.3-stable"}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">Last Deployment</Typography>
                <Typography variant="body2" color="white">{deployed ? "Just now" : "2 days ago"}</Typography>
              </Box>
            </Paper>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
