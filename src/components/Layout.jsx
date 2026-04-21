import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, IconButton, 
  Avatar, Button, Tooltip, Chip, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info';

const drawerWidth = 280;

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'CI/CD Pipelines', icon: <PlayCircleFilledWhiteIcon />, path: '/' },
    { text: 'Unit Tests (JUnit)', icon: <BugReportIcon />, path: '/tests' },
    { text: 'Automated Deploy', icon: <CloudUploadIcon />, path: '/deploy' },
  ];

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ p: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: '#ffffff', color: '#0d1117', fontWeight: 900, width: 44, height: 44 }}>
          <GitHubIcon />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900, color: 'white', lineHeight: 1.2 }}>
            Auto<span style={{ color: '#2ea043' }}>Ops</span>
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">
            Exp 3.2 Dashboard
          </Typography>
        </Box>
      </Box>
      
      <List sx={{ px: 2, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => { navigate(item.path); setMobileOpen(false); }}
                sx={{
                  borderRadius: '6px',
                  py: 1.5,
                  bgcolor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
                  color: isActive ? 'white' : 'text.secondary',
                  borderLeft: isActive ? '4px solid #f78166' : '4px solid transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ fontWeight: isActive ? 700 : 500 }} 
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      
      <Box p={3}>
        <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
          Main Branch: <span style={{color: '#3fb950'}}>Passing</span>
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, sm: 4 }, py: 1 }}>
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="700" sx={{ display: { xs: 'none', sm: 'block' }, mr: 3 }}>
              {menuItems.find(i => i.path === location.pathname)?.text || 'Workflow'}
            </Typography>
            <Button 
              variant="outlined" 
              color="secondary" 
              size="small" 
              startIcon={<InfoIcon />} 
              onClick={() => setInfoOpen(true)}
              sx={{ display: { xs: 'none', sm: 'flex' }, borderColor: '#30363d' }}
            >
              Experiment Info
            </Button>
            <Tooltip title="Experiment Info" sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <IconButton color="secondary" onClick={() => setInfoOpen(true)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <Tooltip title="Build Status">
              <Chip 
                label={`Status: Passing`} 
                color="success" 
                variant="outlined" 
                size="small" 
                sx={{ fontWeight: 'bold' }} 
              />
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', sm: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', sm: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth } }} open>
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 3, sm: 6 }, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
        <Outlet />
      </Box>

      {/* Info Dialog */}
      <Dialog open={infoOpen} onClose={() => setInfoOpen(false)} maxWidth="md" fullWidth PaperProps={{ sx: { bgcolor: '#0d1117', border: '1px solid #30363d', borderRadius: 3 } }}>
        <DialogTitle sx={{ color: 'white', borderBottom: '1px solid #30363d', pb: 2, display: 'flex', alignItems: 'center', gap: 1.5, fontSize: '1.4rem' }}>
          <InfoIcon fontSize="large" color="info" /> Experiment 3.2: CI/CD & Automated Testing
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <Typography variant="body1" color="text.primary" paragraph>
            This application simulates a continuous integration and continuous deployment (CI/CD) workflow typical of modern software engineering.
          </Typography>

          <Box mt={3}>
            <Typography variant="h6" color="primary.light" gutterBottom>1. CI/CD Pipelines (GitHub Actions)</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The <strong>Pipelines</strong> tab demonstrates how automated workflows are triggered on a <code>git push</code>. It provides a visual representation of a GitHub Actions YAML file compiling code, running tests, and preparing artifacts.
            </Typography>

            <Typography variant="h6" color="info.main" gutterBottom>2. Unit Testing (JUnit & Mockito)</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The <strong>Unit Tests</strong> tab displays simulated automated testing execution. It shows mocked services (via Mockito) testing isolated Spring Boot components without requiring an actual database connection, achieving high code coverage efficiently.
            </Typography>

            <Typography variant="h6" color="secondary.main" gutterBottom>3. Automated Deployments (Jenkins / GH Deploy)</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The <strong>Automated Deploy</strong> tab illustrates the final stage. Upon successful builds and tests, the application simulates pushing a Docker image to a registry and deploying it directly to a server or Kubernetes cluster using automated webhooks.
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, borderTop: '1px solid #30363d' }}>
          <Button onClick={() => setInfoOpen(false)} variant="contained" color="secondary" sx={{ px: 4 }}>
            Explore Dashboard
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
