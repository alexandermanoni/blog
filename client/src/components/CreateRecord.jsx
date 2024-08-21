import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
    const [form, setForm] = useState({
        title: "",
        text: "",
    });

    const navigate = useNavigate();

    function updateForm(value) {
        return setForm((prev) => {
            // [note]: the ... is the spread operator
            return { ...prev, ...value };
        });
    }

    // handle submission
    async function onSubmit(e) {
        e.preventDefault();

        // get date and time of post
        const now = new Date().toLocaleString();

        const newPost = { ...form, time: now };

        console.log(now);

        try {
            const response = await fetch(`http://localhost:5050/record`, {
                method: `${"POST"}`,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem occurred: ", error);
        } finally {
            setForm({ title: "", text: "", });
            navigate("/");
        }
    }

    // display form that takes input from the user
    return (
        <>
            <h1 className="text-lg font-semibold p-4">Create Post</h1>
            <form onSubmit={onSubmit}
                className="border overflow-hidden p-4"
                >
                <div className="grid max-w-2x1 grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Title
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter title here"
                                    value={form.title}
                                    onChange={(e) => updateForm({ title: e.target.value })}
                                />
                            </div>
                        </div>
                        <label
                            htmlFor="text"
                            className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Body
                            </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="text"
                                    id="text"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter post text here"
                                    value={form.text}
                                    onChange={(e) => updateForm({ text: e.target.value })}
                                />
                            </div>
                        </div>                        
                    </div>
                </div>
                <input 
                    type="submit"
                    value="Publish Post"
                    className="inline-flex items-center justify-center"
                />
            </form>
        </>
    );
}