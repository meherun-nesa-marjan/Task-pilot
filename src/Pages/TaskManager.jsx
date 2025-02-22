import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useState } from 'react';

const TaskManager = () => {
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data } = await axios.get('http://localhost:5000/tasks');
            return data;
        },
    });

    // DELETE FUNCTION
    const handleDeleteTask = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/tasks/${id}`);
                    refetch();
                    Swal.fire("Deleted!", "Your task has been deleted.", "success");
                } catch (error) {
                    Swal.fire("Error!", "Failed to delete task.", "error");
                }
            }
        });
    };

    // OPEN UPDATE MODAL
    const openUpdateModal = (task) => {
        setSelectedTask(task);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description || '');
        document.getElementById("update_modal").showModal();
    };

    // HANDLE UPDATE SUBMIT
    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/tasks/${selectedTask._id}`, {
                title: updatedTitle,
                description: updatedDescription,
            });

            refetch();
            Swal.fire("Updated!", "Task updated successfully!", "success");
            document.getElementById("update_modal").close();
            setSelectedTask(null); // Reset state
        } catch (error) {
            Swal.fire("Error!", "Failed to update task.", "error");
        }
    };

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl font-bold mb-5">Task Manager</h1>

            {['To-Do', 'In Progress', 'Done'].map((category) => {
                const categoryTasks = tasks.filter((task) => task.category === category);
                return (
                    <div key={category} className="mb-6">
                        <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                        <ul className="space-y-4">
                            {categoryTasks.map((task) => (
                                <li key={task._id} className="p-4 bg-gray-100 rounded-lg shadow-md">
                                    <h3 className="font-medium text-xl">{task.title}</h3>
                                    {task.description && <p>{task.description}</p>}
                                    <span className="text-sm text-gray-500">{task.timestamp}</span>
                                    <div className="flex space-x-5 mt-2">
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-600"
                                        >
                                            Delete
                                        </button>
                                        <button
                                            onClick={() => openUpdateModal(task)}
                                            className="text-blue-600"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            })}

            {/* UPDATE MODAL */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-bold mb-4">Update Task</h2>
                    {selectedTask && (
                        <form onSubmit={handleUpdateTask}>
                            <label className="block mb-2">Title</label>
                            <input
                                type="text"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                                className="w-full p-2 border rounded mb-3"
                                required
                            />
                            <label className="block mb-2">Description</label>
                            <textarea
                                value={updatedDescription}
                                onChange={(e) => setUpdatedDescription(e.target.value)}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <div className="flex justify-end space-x-2">
                                <button type="submit" className="btn btn-primary">Update</button>
                                <button type="button" onClick={() => document.getElementById("update_modal").close()} className="btn">Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            </dialog>
        </div>
    );
};

export default TaskManager;
