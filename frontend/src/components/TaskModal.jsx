import  { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { Plus } from "lucide-react";
import { addTask } from "../api/taskApi";
import MainContext from "../context/MainContext";
import toast from "react-hot-toast";

const TaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [habit, setHabit] = useState("");
  const [completionTime, setCompletionTime] = useState("");

  const { setTasks } = useContext(MainContext);

  const handleAdd = async () => {
    if (!habit || !completionTime) return toast.error("Please fill all fields.");

    try {
      const newTask = await addTask({
        habit,
        completion_time: completionTime,
      });

      setTasks((prev) => [...prev, newTask]);
      toast.success("Habit added!");
      setIsOpen(false);
      setHabit("");
      setCompletionTime("");
    } catch (err) {
      toast.error("Failed to add habit.");
      console.error(err);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <Plus size={18} />
        Add Habit
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white rounded-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-xl font-bold mb-4">New Habit</Dialog.Title>

            <input
              type="text"
              placeholder="Habit name"
              value={habit}
              onChange={(e) => setHabit(e.target.value)}
              className="w-full mb-3 p-2 border rounded"
            />

            <input
              type="datetime-local"
              value={completionTime}
              onChange={(e) => setCompletionTime(e.target.value)}
              className="w-full mb-4 p-2 border rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default TaskModal;

// import  { useState } from "react";
// import { motion } from "framer-motion";
// import Modal from "react-modal";

// const TaskModal = ({ isOpen, onClose, onSubmit }) => {
//   const [task, setTask] = useState({
//     habit: "",
//     description: "",
//     completion_time: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(task);
//     setTask({ habit: "", description: "", completion_time: "" });
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="modal-content"
//       overlayClassName="modal-overlay"
//     >
//       <motion.div
//         initial={{ scale: 0.7, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white p-6 rounded-lg shadow-md"
//       >
//         <h2 className="text-xl font-bold mb-4">Add New Task</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Habit name"
//             value={task.habit}
//             onChange={(e) => setTask({ ...task, habit: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={task.description}
//             onChange={(e) => setTask({ ...task, description: e.target.value })}
//             className="w-full p-2 border rounded"
//           />
//           <input
//             type="datetime-local"
//             value={task.completion_time}
//             onChange={(e) => setTask({ ...task, completion_time: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//           <div className="flex justify-end gap-2">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
//               Add
//             </button>
//           </div>
//         </form>
//       </motion.div>
//     </Modal>
//   );
// };

// export default TaskModal;
