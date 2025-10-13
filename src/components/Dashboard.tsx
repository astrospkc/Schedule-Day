
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { PlusCircle, Clock, Edit, Trash2 } from "lucide-react";
import axios from "axios";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type Task = {
    title: string,
    start_date: Date,
    end_date: Date,
    recurrence: string,
    customDays?: string[]
}

export default function DashboardPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [taskTitle, setTaskTitle] = useState("");
    const [time, setTime] = useState("12:00");
    const [endTime, setEndTime] = useState("12:00")
    const [recurrence, setRecurrence] = useState("one-time");
    const [customDays, setCustomDays] = useState<string[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>("upcoming");
    const [pendingTask, setPendingTask] = useState<Task[]>([])
    const [completedTask, setCompletedTask] = useState<Task[]>([])
    const [upcomingTask, setUpcomingTask] = useState<Task[]>([])
    const [pendingLoader, setPendingLoader] = useState<boolean>(false)
    const [completedLoader, setCompletedLoader] = useState<boolean>(false)
    const [upcomingLoader, setUpcomingLoader] = useState<boolean>(false)
    const [tagTasksList, setTagTasksList] = useState<Task[]>([])
    const queryClient = useQueryClient()
    const toggleDay = (day: string) => {
        setCustomDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };
    // tasks
    const { data, error } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/gettasks`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
    })

    if (error) {
        console.log("error while fetching tasks: ", error)
    }

    useEffect(() => {
        if (data) {
            setTasks(data.data)
        }
    }, [data])

    const addTaskMutation = useMutation({
        mutationFn: async (data: Task) => {
            return await axios.post("/task/createtask", data, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            })
        }
    })

    const addTask = async () => {
        console.log("selected date", selectedDate)
        if (selectedDate && taskTitle.trim() !== "") {
            const [hours, minutes] = time.split(":").map(Number);
            const newDate = new Date(selectedDate);
            newDate.setHours(hours, minutes);

            const [endHours, endMinutes] = endTime.split(":").map(Number);
            const newEndDate = new Date(selectedDate);
            newEndDate.setHours(endHours, endMinutes);
            console.log("task: ", tasks)
            const data = {
                title: taskTitle,
                start_date: newDate,
                end_date: newEndDate,
                recurrence,
                customDays
            }
            addTaskMutation.mutate(data)
            setTaskTitle("");
            setCustomDays([]);
            setRecurrence("none");
        }
    };

    const pendingTaskFilter = async () => {
        setPendingLoader(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/pendingTasks`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        const data = res.data
        setPendingTask(data)
        console.log("pending tasks", data)
        setPendingLoader(false)
    }

    const completedTaskFilter = async () => {
        setCompletedLoader(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/completedTasks`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        const data = res.data
        setCompletedTask(data)
        console.log("completed tasks", data)
        setCompletedLoader(false)
    }

    const upcomingTaskFilter = async () => {
        setUpcomingLoader(true)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/task/upcomingTasks`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        const data = res.data
        setUpcomingTask(data)
        console.log("upcoming tasks", data)
        setUpcomingLoader(false)
    }

    const handleSelectedTag = (tag: string) => {
        if (tag === "upcoming") {
            upcomingTaskFilter()
        } else if (tag === "completed") {
            completedTaskFilter()
        } else if (tag === "pending") {
            pendingTaskFilter()
        }
        setSelectedTag(tag);
    }




    console.log("tasks: ", tasks, "upcoming taks ", upcomingTask, "completed tasks", completedTask, "pending tasks", pendingTask, "tag tasks", tagTasksList)

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
                    <div className="flex flex-row gap-4">
                        {/* upcoming , completed, pending task */}
                        <h2
                            onClick={() => handleSelectedTag("upcoming")}
                            className={`p-2 rounded-xl text-sm cursor-pointer transition-colors ${selectedTag === "upcoming"
                                ? "bg-violet-900"
                                : "bg-violet-900/20 hover:bg-violet-900/40"
                                }`}
                        >
                            Upcoming Tasks
                        </h2>
                        <h2
                            onClick={() => handleSelectedTag("completed")}
                            className={`p-2 rounded-xl text-sm cursor-pointer transition-colors ${selectedTag === "completed"
                                ? "bg-violet-900"
                                : "bg-violet-900/20 hover:bg-violet-900/40"
                                }`}
                        >
                            Completed Tasks
                        </h2>
                        <h2
                            onClick={() => handleSelectedTag("pending")}
                            className={`p-2 rounded-xl text-sm cursor-pointer transition-colors ${selectedTag === "pending"
                                ? "bg-violet-900"
                                : "bg-violet-900/20 hover:bg-violet-900/40"
                                }`}
                        >
                            Pending Tasks
                        </h2>
                    </div>
                    {
                        selectedTag === "upcoming" ? (
                            upcomingTask.length === 0 ?
                                <p className="text-gray-400">No tasks scheduled yet.</p>
                                : (
                                    <>

                                        {ShowList(upcomingTask)}
                                    </>
                                )
                        ) : selectedTag === "completed" ? (
                            completedTask.length === 0 ?
                                <p className="text-gray-400">No tasks scheduled yet.</p>
                                : (
                                    <>

                                        {ShowList(completedTask)}

                                    </>

                                )
                        ) : (
                            pendingTask.length === 0 ?
                                <p className="text-gray-400">No tasks scheduled yet.</p>
                                : (
                                    ShowList(pendingTask)
                                )
                        )
                    }


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
                        <label htmlFor="endTime">Start Time</label>
                        <input
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full px-4 py-2 rounded-xl bg-black/60 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <label htmlFor="endTime">End Time</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
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
                            <option value="one-time">One-time</option>
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
                        className="mt-4 w-full flex items-center cursor-pointer hover:scale-95 justify-center gap-2 bg-purple-600 hover:bg-purple-700 transition rounded-xl py-2 font-medium"
                    >
                        <PlusCircle size={18} /> Add Task
                    </button>
                </div>
            </div>
        </div>
    );
}


const ShowList = (tasks: Task[]) => {
    const handleDeleteTask = async (task_id: number) => {
        const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/task/deletetask/${task_id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        const data = res.data
        console.log("deleted task", data)
    }

    const handleEditTask = async (id: number) => {
        console.log("edit task")
    }
    console.log("tasks: ", tasks, tasks.data)
    return (
        <>
            <div>
                <ul className="space-y-3 ">
                    {tasks.data.length > 0 && tasks.data.map((task, i) => {
                        console.log("task: ", task)
                        return (
                            (
                                <li
                                    key={i}
                                    className="flex flex-col bg-black/50 p-3 rounded-xl"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-2">
                                            <h1 className="text-lg font-semibold">{task.title.toUpperCase()}</h1>
                                            {/* <span>Recurrence type: {task.recurrence_day}</span> */}
                                        </div>

                                        <div>
                                            <div className="space-y-2">
                                                <div>
                                                    <span className="text-sm text-gray-400">Start Time</span>
                                                    <div className="flex items-center gap-1 text-gray-300 text-sm">
                                                        <Clock size={16} />
                                                        {task.start_date ? (
                                                            <>
                                                                {new Date(task.start_date).toDateString()}{' '}
                                                                {new Date(task.start_date).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </>
                                                        ) : 'N/A'}
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-400">Next Execution</span>
                                                    <div className="flex items-center gap-1 text-gray-300 text-sm">
                                                        <Clock size={16} />
                                                        {task.next_execution_time ? (
                                                            <>
                                                                {new Date(task.next_execution_time).toDateString()}{' '}
                                                                {new Date(task.next_execution_time).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </>
                                                        ) : 'N/A'}
                                                    </div>
                                                </div>

                                                <div>
                                                    <span className="text-sm text-gray-400">End Time</span>
                                                    <div className="flex items-center gap-1 text-gray-300 text-sm">
                                                        <Clock size={16} />
                                                        {task.end_date ? (
                                                            <>
                                                                {new Date(task.end_date).toDateString()}{' '}
                                                                {new Date(task.end_date).toLocaleTimeString([], {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </>
                                                        ) : 'N/A'}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Repeats:{" "}
                                        {task.recurrence_day === "custom"
                                            ? `On ${task.customDays?.join(", ")}`
                                            : task.recurrence_day}
                                    </div>
                                    <div className="flex flex-row gap-2 pt-4">
                                        <Edit onClick={() => handleEditTask(task.id)} size={16} className="hover:cursor-pointer  text-violet-400 hover:text-white hover:scale-105" />
                                        <Trash2 onClick={() => handleDeleteTask(task.id)} size={16} className="hover:cursor-pointer  text-white hover:text-violet-400 hover:scale-105" />
                                    </div>
                                </li>
                            ))
                    }
                    )
                    }
                </ul>
            </div>

        </>

    );
}


