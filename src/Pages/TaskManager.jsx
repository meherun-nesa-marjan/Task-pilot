import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../Providers/AuthProvider';

const TaskManager = () => {
     const { user } = useContext(AuthContext);
     const { data: tasks = [], refetch } = useQuery({
         queryKey: ['tasks', user?.email],
         queryFn: async () => {
             const { data } = await axios.get(`https://task-app-server-ashen.vercel.app/tasks/${user?.email}`);
             return data;
         },
         
     });
     
    const [taskState, setTaskState] = useState({
        "To-Do": [],
        "In Progress": [],
        "Done": []
    });

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedDescription, setUpdatedDescription] = useState("");

    // Group tasks into categories whenever tasks change
    useEffect(() => {
        const groupedTasks = {
            "To-Do": tasks.filter(task => task.category === "To-Do"),
            "In Progress": tasks.filter(task => task.category === "In Progress"),
            "Done": tasks.filter(task => task.category === "Done"),
        };
        setTaskState(groupedTasks);
    }, [tasks]);

    // Handle drag-and-drop movement
    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const sourceCategory = source.droppableId;
        const destCategory = destination.droppableId;

        if (sourceCategory === destCategory && source.index === destination.index) return;

        // Get moved task correctly
        const movedTask = { ...taskState[sourceCategory][source.index] };

        // Update task category
        movedTask.category = destCategory;

        // Update local state
        const newTaskState = { ...taskState };
        newTaskState[sourceCategory].splice(source.index, 1);
        newTaskState[destCategory].splice(destination.index, 0, movedTask);
        setTaskState(newTaskState);

        // Send update request to backend
        try {
            await axios.put(`https://task-app-server-ashen.vercel.app/tasks/${movedTask._id}`, {
                category: movedTask.category,
                order: destination.index
            });
            await refetch();
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    };

    const openUpdateModal = (task) => {
        setSelectedTask(task);
        setUpdatedTitle(task.title);
        setUpdatedDescription(task.description || '');
        document.getElementById("update_modal").showModal();
    };

    const handleUpdateTask = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://task-app-server-ashen.vercel.app/tasks/${selectedTask._id}`, {
                title: updatedTitle,
                description: updatedDescription,
            });

            refetch();
            Swal.fire({
                icon: "success",
                title: "Task updated successfully! 🎉",
            });
            document.getElementById("update_modal").close();
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Failed to update task",
            });
        }
    };
    const handleDeleteTask = async (id) => {
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`https://task-app-server-ashen.vercel.app/tasks/${id}`);
                    refetch();
                    Swal.fire("Deleted!", "Task has been deleted.", "success");
                } catch (error) {
                    console.error("Failed to delete task:", error);
                    Swal.fire("Error", "Failed to delete task.", "error");
                }
            }
        });
    };

    return (
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl font-bold mb-5">Task Manager</h1>

            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.keys(taskState).map((category) => (
                    <Droppable droppableId={category} key={category}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className="mb-6 p-4 bg-gray-200 rounded-lg shadow-md">
                                <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                                <ul className="space-y-4">
                                    {taskState[category].map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <li
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="p-4 bg-white rounded-lg shadow-md"
                                                >
                                                    <p className="font-medium text-sm">User Name:{task.name}</p>
                                                    <h3 className="font-medium text-xl">{task.title}</h3>
                                                    {task.description && <p>{task.description}</p>}
                                                    <span className="text-sm text-gray-500">{task.timestamp}</span>
                                                    <div className="flex space-x-5">
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
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box">
                    <h2 className="text-xl font-bold mb-4">Update Task</h2>
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
                </div>
            </dialog>
        </div>
    );
};

export default TaskManager;
