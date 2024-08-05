import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Divider, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';

interface Task {
  id: number;
  title: string;
  description: string;
  persona: string;
  group: number;
  completed: boolean;
}

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [view, setView] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`/api/tasks?action=${view}`);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [view]);

  const completeTask = async (taskId: number) => {
    try {
      await axios.put(`/api/tasks?taskId=${taskId}&action=active`);
      setTasks(prevTasks => prevTasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`/api/tasks?taskId=${taskId}`);
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const getColumnTasks = (status: string) => tasks.filter(task => {
    if (status === 'to-do') return !task.completed;
    if (status === 'in-progress') return false; // No filtering for in-progress
    if (status === 'completed') return task.completed;
    return false;
  });

  const getColumnCount = (status: string) => {
    if (status === 'to-do') return getColumnTasks(status).length;
    if (status === 'in-progress') return tasks.filter(task => task.completed && task.group).length;
    if (status === 'completed') return getColumnTasks(status).length;
    return 0;
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Taskboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">To Do</Typography>
              <Chip label={`Tasks: ${getColumnCount('to-do')}`} color="primary" />
              {getColumnTasks('to-do').map((task) => (
                <Card key={task.id} variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => completeTask(task.id)} startIcon={<CheckCircleIcon />}>
                      Done
                    </Button>
                    <Button size="small" onClick={() => deleteTask(task.id)} startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Progress</Typography>
              <Chip label={`Tasks: ${getColumnCount('completed')}`} color="primary" />
              {getColumnTasks('completed').map((task) => (
                <Card key={task.id} variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => completeTask(task.id)} startIcon={<CheckCircleIcon />}>
                      Done
                    </Button>
                    <Button size="small" onClick={() => deleteTask(task.id)} startIcon={<DeleteIcon />}>
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Completed </Typography>
              <Chip label={`Tasks: ${getColumnCount('completed')}`} color="primary" />
              {getColumnTasks('in-progress').map((task) => (
                <Card key={task.id} variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2">{task.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
