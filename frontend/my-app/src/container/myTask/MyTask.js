import React, { useEffect, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import "./MyTask.css";
import { DataService } from '../../config/DataService';
import { Api } from '../../config/Api';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const MyTask = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    projectName: editTask?.projectName ? editTask?.projectName : '',
    issueType: editTask?.issueType ? editTask?.issueType : '',
    shortSummary: editTask?.shortSummary ? editTask?.shortSummary : '',
    description: editTask?.description ? editTask?.description : '',
    priority: editTask?.priority ? editTask?.priority : '',
    assigneer: editTask?.assigneer ? editTask?.assigneer : '',
    reporter: editTask?.reporter ? editTask?.reporter : '',
    assignedDate: editTask?.assignedDate ? moment(editTask?.assignedDate).format('YYYY-MM-DD') : '',
    dueDate: editTask?.dueDate ? moment(editTask?.dueDate).format('YYYY-MM-DD') : '',

    taskDuration: editTask?.taskDuration ? editTask?.taskDuration : '',
  }
  const startSpace = /^(?!\s).*$/;
  const space = /^(?!.* {2}).*$/;
  const validationSchema = Yup.object({
    projectName: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Project name is required'),
    issueType: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Issue type is required'),
    shortSummary: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Short summary is required'),
    description: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Description is required'),
    priority: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Priority is required'),
    assigneer: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Assigneer is required'),
    reporter: Yup.string().matches(startSpace, 'No leading spaces allowed')
      .matches(space, 'No consecutive spaces allowed').required('Reporter is required'),
    assignedDate: Yup.string().required('Assigned Date is required'),
    dueDate: Yup.string().required('Due Date is required'),
    taskDuration: Yup.number().required('Task Duration is required'),
  });

  const handleClickOpen = (taskId = null) => {
    setOpen(true);
  };



  const handleClose = () => {
    setEditTask(null)
    setOpen(false);
  };

  const handleEditTask = (data) => {
    setEditTask(data)
    setOpen(true);
  }

  const handleOpenDelete = (taskId) => {
    setDeleteTaskId(taskId);
    setOpenDelete(true);
  };


  const handleCloseDelete = () => {
    setDeleteTaskId(null);
    setOpenDelete(false);
  };

  const fetchTaskData = async () => {
    const token = localStorage.getItem('userToken')
    try {
      const response = await DataService.get(Api.GET_ALL_TASK, {
        headers: {
          'auth': token,
        },
      });
      setTasks(response.data.data);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        console.log('Error fetching user data', error.response);
      } else {
        console.log('Unexpected error', error);
      }
    }
  };
  useEffect(() => {

    fetchTaskData();
  }, []);


  const handleFormSubmit = async (values) => {
    try {
      let data = { ...values }
      if (editTask) {
        data = { ...data, id: editTask?._id }
      }
      const endPoint = editTask ? Api.EDIT_TASK : Api.ADD_TASK;
      const token = localStorage.getItem('userToken')
      const response = await DataService.post(endPoint, data, { headers: { 'auth': token } })

      toast.success(response.data.message);
      fetchTaskData();
      handleClose()
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }

  };

  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem('userToken');
      const response = await DataService.post(
        Api.DELETE_TASK,
        { id: deleteTaskId },
        { headers: { auth: token } }
      );
      toast.success(response.data.message);
      fetchTaskData();
      handleCloseDelete();
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'An error occurred while deleting the task.'
      );
    }
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
              <th>Task Summary</th>
              <th>Assigned Date</th>
              <th>Due Date</th>
              <th>Assigneer</th>
              <th>Reporter</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks && tasks?.map((task, index) => (
              <tr key={task?._id}>
                <td>{task.projectName}</td>
                <td>{task.shortSummary}</td>
                <td>{moment(task.assignedDate).format('DD-MM-YYYY')}</td>
                <td>{moment(task.dueDate).format('DD-MM-YYYY')}</td>
                <td>{task.assigneer}</td>
                <td>{task.reporter}</td>
                <td>{task.taskDuration}</td>
                <td> <EditIcon className='edit' onClick={() => handleEditTask(task)} />
                  <DeleteIcon
                    className='delete'
                    onClick={() => handleOpenDelete(task._id)}
                  />

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editTask ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, values, touched, errors }) => (
              <Form>
                <TextField
                  fullWidth
                  label="Project Name"
                  name="projectName"
                  value={values.projectName}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.projectName && Boolean(errors.projectName)}
                  helperText={touched.projectName && errors.projectName}
                />
                <TextField
                  fullWidth
                  label="Issue Type"
                  name="issueType"
                  value={values.issueType}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.issueType && Boolean(errors.issueType)}
                  helperText={touched.issueType && errors.issueType}
                />
                <TextField
                  fullWidth
                  label="Short Summary"
                  name="shortSummary"
                  value={values.shortSummary}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.shortSummary && Boolean(errors.shortSummary)}
                  helperText={touched.shortSummary && errors.shortSummary}
                />
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  fullWidth
                  label="Priority"
                  name="priority"
                  value={values.priority}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.priority && Boolean(errors.priority)}
                  helperText={touched.priority && errors.priority}
                />
                <TextField
                  fullWidth
                  label="Assigneer"
                  name="assigneer"
                  value={values.assigneer}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.assigneer && Boolean(errors.assigneer)}
                  helperText={touched.assigneer && errors.assigneer}
                />
                <TextField
                  fullWidth
                  label="Reporter"
                  name="reporter"
                  value={values.reporter}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.reporter && Boolean(errors.reporter)}
                  helperText={touched.reporter && errors.reporter}
                />
                <TextField
                  fullWidth
                  label="Assigned Date"
                  name="assignedDate"
                  type="date"
                  value={values.assignedDate}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.assignedDate && Boolean(errors.assignedDate)}
                  helperText={touched.assignedDate && errors.assignedDate}
                />
                <TextField
                  fullWidth
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={values.dueDate}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.dueDate && Boolean(errors.dueDate)}
                  helperText={touched.dueDate && errors.dueDate}
                />
                <TextField
                  fullWidth
                  label="Task Duration"
                  name="taskDuration"
                  value={values.taskDuration}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  error={touched.taskDuration && Boolean(errors.taskDuration)}
                  helperText={touched.taskDuration && errors.taskDuration}
                />
                <DialogActions>
                  <Button onClick={handleClose} variant="outlined">Cancel</Button>
                  <Button type="submit" variant="outlined">{editTask ? "Update Task" : "Add Task"}</Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this task?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDeleteTask} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default MyTask;
