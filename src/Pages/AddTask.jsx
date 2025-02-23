import React, { useContext } from 'react';
import { useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from '../Providers/AuthProvider';
const AddTask = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("To-Do");
     const { user } = useContext(AuthContext);


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (title.trim() === "" || title.length > 50) {
        Swal.fire({
          icon: "error",
          title: "Invalid Title",
          text: "Title is required and must be a maximum of 50 characters.",
        });
        return;
      }
    
      if (description.length > 200) {
        Swal.fire({
          icon: "error",
          title: "Description Too Long",
          text: "Description must be a maximum of 200 characters.",
        });
        return;
      }
    
      const newTask = {
        title,
        description,
        category,
        timestamp: new Date().toLocaleString(),
        name: user?.displayName,
        email:user?.email,



      };
    
      try {
        const response = await fetch("https://task-app-server-ashen.vercel.app/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
    
        if (!response.ok) {
          throw new Error("Failed to add task");
        }
    
        const data = await response.json();
        console.log("Task added:", data);
    
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Task Added!",
          text: "Your task has been successfully added.",
          timer: 2000, // Auto close after 2 seconds
          showConfirmButton: false,
        });
    
        // Reset form
        setTitle("");
        setDescription("");
        setCategory("To-Do");
    
      } catch (error) {
        console.error("Error adding task:", error);
        
        // Show error alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add task. Please try again!",
        });
      }
    };
    
    return (
      <div className="max-w-lg mx-auto my-10 p-6 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Add New Task
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
              Title (Max 50 chars)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              className="input input-bordered w-full"
              required
            />
          </div>
  
          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Description (Max 200 chars)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
              className="textarea textarea-bordered w-full"
            />
          </div>
  
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="To-Do">To-Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
  
          {/* Submit Button */}
          <button type="submit" className="py-3 dark:text-white rounded border-2 w-full">
            Add Task
          </button>
        </form>
      </div>
    );
};

export default AddTask;