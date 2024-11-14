import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import "./MyTask.css";

const MyTask = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    projectName: '',
    taskName: '',
    fromDate: '',
    toDate: '',
    assignUser: '',
    duration: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value
    }));
  };

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask({ projectName: '', taskName: '', fromDate: '', toDate: '', assignUser: '', duration: '' });
    setOpen(false);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

  return (
    <Box className="task-container">
      <Box className='searchtask-container'>
        <Box className='serch-container'>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Box>
        <Box className='taskbtn-container'>
          <Button className='task-btn' onClick={handleClickOpen}>
            Add Task
          </Button>
        </Box>
      </Box>

      <Box className='task-list'>
        <table className="task-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Task Name</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Assign User</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.projectName}</td>
                <td>{task.taskName}</td>
                <td>{task.fromDate}</td>
                <td>{task.toDate}</td>
                <td>{task.assignUser}</td>
                <td>{task.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Name"
            name="projectName"
            value={newTask.projectName}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Task Name"
            name="taskName"
            value={newTask.taskName}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="From Date"
            name="fromDate"
            type="date"
            value={newTask.fromDate}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"

          />
          <TextField
            fullWidth
            label="To Date"
            name="toDate"
            type="date"
            value={newTask.toDate}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"

          />
          <TextField
            fullWidth
            label="Assign User"
            name="assignUser"
            value={newTask.assignUser}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Task Time Duration"
            name="duration"
            value={newTask.duration}
            onChange={handleInputChange}
            variant="outlined"
            margin="normal"
          />
        </DialogContent>
        <DialogActions className='action-btn'>
          <Button className='model-cancel' onClick={handleClose}>
            Cancel
          </Button>
          <Button className='model-task' onClick={handleAddTask} >
            Add Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyTask;
