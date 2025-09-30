// import { DatePicker, TimePicker } from '@mui/x-date-pickers'


// const Dashboard = () => {
//     return (
//         <div>
//             <DatePicker className='bg-white' />
//             <TimePicker label="Basic time picker" className='bg-white' />

//         </div>
//     )
// }


import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { PlusCircle, Clock } from "lucide-react";

export default function DashboardPage() {
    const [tasks, setTasks] = useState<
        { title: string; date: Date; recurrence: string; customDays?: string[] }[]
    >([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [taskTitle, setTaskTitle] = useState("");
    const [time, setTime] = useState("12:00");
    const [recurrence, setRecurrence] = useState("none");
    const [customDays, setCustomDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setCustomDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const addTask = () => {
        if (selectedDate && taskTitle.trim() !== "") {
            const [hours, minutes] = time.split(":").map(Number);
            const newDate = new Date(selectedDate);
            newDate.setHours(hours, minutes);

            setTasks([...tasks, { title: taskTitle, date: newDate, recurrence, customDays }]);
            setTaskTitle("");
            setCustomDays([]);
            setRecurrence("none");
        }
    };

    return (
        <div
            className="min-h-screen text-white px-6 py-8"
            style={{
                background: "radial-gradient(circle at center, #1f1f3a, #0d0d0d)",
            }}
        >
            <h1 className="text-3xl font-bold text-center mb-8">
                Your Weekly Dashboard
            </h1>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Upcoming Tasks */}
                <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
                    {tasks.length === 0 ? (
                        <p className="text-gray-400">No tasks scheduled yet.</p>
                    ) : (
                        <ul className="space-y-3">
                            {tasks.map((task, i) => (
                                <li
                                    key={i}
                                    className="flex flex-col bg-black/40 p-3 rounded-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{task.title}</span>
                                        <span className="flex items-center gap-1 text-gray-300 text-sm">
                                            <Clock size={16} />
                                            {task.date.toDateString()}{" "}
                                            {task.date.toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Repeats:{" "}
                                        {task.recurrence === "custom"
                                            ? `On ${task.customDays?.join(", ")}`
                                            : task.recurrence}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Add Task */}
                <div className="bg-black/30 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

                    {/* Calendar */}
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-lg bg-black/40 text-white p-3"
                    />

                    {/* Task Input */}
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Enter task title..."
                            value={taskTitle}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-black/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Time Picker */}
                    <div className="mt-4">
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-black/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    {/* Recurrence Selector */}
                    <div className="mt-4">
                        <select
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-black/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="none">One-time</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="custom">Custom Days</option>
                        </select>
                    </div>

                    {/* Custom Days Selector */}
                    {recurrence === "custom" && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                <button
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`px-3 py-1 rounded-lg border ${customDays.includes(day)
                                        ? "bg-purple-600 border-purple-500"
                                        : "bg-black/60 border-gray-700"
                                        }`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Add Button */}
                    <button
                        onClick={addTask}
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition rounded-xl py-2 font-medium"
                    >
                        <PlusCircle size={18} /> Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}


