import React, { useState, useEffect } from 'react';
import { Box, Card, Typography, Grid, Paper, LinearProgress, Chip } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

const javaTestCode = `import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void testGetUserById() {
        // Arrange
        User mockUser = new User(1L, "admin", "admin@example.com");
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        // Act
        User result = userService.getUserById(1L);

        // Assert
        assertNotNull(result);
        assertEquals("admin", result.getUsername());
        verify(userRepository, times(1)).findById(1L);
    }
}`;

export default function Tests() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunning(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box>
      <Box mb={6}>
        <Typography variant="h2" color="white" gutterBottom>
          Automated Testing
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Writing Unit Tests with JUnit 5 & Mockito.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={7}>
          <Card sx={{ p: 4, height: '100%', borderColor: 'rgba(88, 166, 255, 0.3)' }}>
             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h5" color="secondary.main">UserServiceTest.java</Typography>
            </Box>
            <Paper sx={{ p: 3, bgcolor: '#010409', borderRadius: 2, overflowX: 'auto', border: '1px solid #30363d' }}>
              <pre style={{ margin: 0, color: '#e6edf3', fontSize: '0.85rem' }}>
                {javaTestCode}
              </pre>
            </Paper>
          </Card>
        </Grid>

        <Grid item xs={12} lg={5}>
          <Card sx={{ p: 4, height: '100%' }}>
            <Box display="flex" alignItems="center" gap={2} mb={4}>
              <BugReportIcon color="success" fontSize="large" />
              <Typography variant="h5" color="white">Test Results</Typography>
            </Box>

            {running ? (
              <Box>
                <Typography variant="body2" color="text.secondary" mb={2}>Running Tests...</Typography>
                <LinearProgress color="info" />
              </Box>
            ) : (
              <Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} p={2} bgcolor="rgba(63, 185, 80, 0.1)" border="1px solid rgba(63, 185, 80, 0.3)" borderRadius={2}>
                  <Typography variant="h6" color="success.main">PASSED</Typography>
                  <Typography variant="h6" color="white">42 / 42</Typography>
                </Box>
                
                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Coverage</Typography>
                  <Chip label="85%" color="success" size="small" />
                </Box>
                <LinearProgress variant="determinate" value={85} color="success" sx={{ height: 6, borderRadius: 3, bgcolor: '#21262d', mb: 3 }} />

                <Box mb={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">Execution Time</Typography>
                  <Typography variant="body2" color="white" fontWeight="bold">1.42s</Typography>
                </Box>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
