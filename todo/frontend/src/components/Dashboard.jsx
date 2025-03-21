import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Formik, Field, Form, ErrorMessage } from 'formik';

const Dashboard = () => {
    const [allTasks, setAllTasks] = useState([]);

    const handleSubmit = async (values) => {
        try {
            const newTaskObj = { taskID: "", title: values.title, dueDate: values.dueDate, status: "Incomplete", isDeleted: false, email: Cookies.get("myaddress") };
            console.log(newTaskObj);
            const response = await axios.post('http://192.168.1.101:5000/users/newTasks', newTaskObj);
            console.log('Task Created:', response.data);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const actionClicked = async (event, task) => {
        const action = event.target.getAttribute('data-action');
        if (action === "Complete") {
            try {
                task.status = "Complete";
                const response = await axios.put('http://localhost:5000/users/updateTaskStatus', {
                    taskID: task.taskID,
                    status: "Complete",
                    email: Cookies.get("myaddress"),
                });
                console.log('Task Status Updated:', response.data);
                fetchTasks();
            } catch (error) {
                console.error('Error updating task status:', error);
            }
        } else if (action === "Delete") {
            try {
                task.status = "Complete";  // Assuming you want to mark the task as complete before deleting
                const response = await axios.put('http://localhost:5000/users/deleteTask', {
                    taskID: task.taskID,
                    isDeleted: true,
                    email: Cookies.get("myaddress"),
                });
                console.log('Task deleted', response.data);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const fetchTasks = async () => {
        try {
            const response = await axios.post('http://localhost:5000/users/tasks', { email: Cookies.get("myaddress") });
            const sortedTasks = response.data.allTasks
                .filter(task => !task.isDeleted)
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
            setAllTasks(sortedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const isDueSoon = (dueDate) => {
        const currentDate = new Date();
        const due = new Date(dueDate);
        const timeDiff = due - currentDate;
        const daysLeft = timeDiff / (1000 * 3600 * 24);
        return daysLeft <= 7 && daysLeft > 0;
    };

    useEffect(() => {
        fetchTasks();
        const interval = setInterval(() => {
            const flashingElements = document.querySelectorAll('.flashing');
            flashingElements.forEach(element => {
                element.classList.toggle('hidden');
            });
        }, 1000);

        return () => clearInterval(interval);  // Clean up interval on component unmount
    }, []);

    return (
        <div className='text-center my-10'>
            <h1 className='capitalize text-4xl font-semibold my-10'>
                Welcome to your personal task manager
            </h1>
            <div className='flex gap-10 mx-10 lg:mx-36'>
                <div className="w-1/3 mx-auto p-4 bg-white shadow-lg rounded-md">
                    <h2 className="text-2xl font-semibold text-center mb-4">Create New Task</h2>
                    <Formik
                        initialValues={{
                            title: '',
                            dueDate: '',
                        }}
                        validate={(values) => {
                            const errors = {};
                            if (!values.title) errors.title = 'Title is required';
                            if (!values.dueDate) errors.dueDate = 'Due date is required';
                            return errors;
                        }}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                        Title
                                    </label>
                                    <Field
                                        id="title"
                                        name="title"
                                        type="text"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                                        Due Date
                                    </label>
                                    <Field
                                        id="dueDate"
                                        name="dueDate"
                                        type="date"
                                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                        name="dueDate"
                                        component="div"
                                        className="text-red-500 text-sm mt-1"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    {isSubmitting ? 'Creating...' : 'Create Task'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div className='w-2/3 mx-auto p-4 bg-white shadow-lg rounded-md'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTasks.map((task, index) => (
                                <tr key={index} className="border-b py-2">
                                    <td>{task.title}</td>
                                    <td>{task.dueDate}</td>
                                    <td className={`flashing ${isDueSoon(task.dueDate) && task.status === "Incomplete" ? '' : 'hidden'}`}>
                                        {task.status === "Incomplete" ? (
                                            <span className='text-red-500'>{task.status}</span>
                                        ) : (
                                            <span className='text-green-500'>{task.status}</span>
                                        )}
                                    </td>
                                    <td className='py-2 space-x-3 whitespace-nowrap'>
                                        <button
                                            className={`text-white px-4 py-1 rounded-md ml-2 ${task.status === "Complete" ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 cursor-pointer"}`}
                                            data-action="Complete"
                                            disabled={task.status === "Complete"}
                                            onClick={(event) => actionClickedd(event, task)}
                                        >
                                            Complete
                                        </button>
                                        <button
                                            className='cursor-pointer bg-red-500 text-white px-4 py-1 rounded-md'
                                            data-action="Delete"
                                            onClick={(event) => actionClicked(event, task)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
