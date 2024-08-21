import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    title: "",
    body: "",
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

    try {
      // [note]: port is still 5050 for localhost NOT 5432, that's for the database server
      const response = await fetch("http://localhost:5050/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...form}),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("A problem ocurred: ", error);
    } finally {
      setForm({ title: "", body: "" });
      navigate("/");
    }
  }

  // display form that takes input from the user
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-lg font-semibold p-4">
        Create Post
      </h1>
      <form onSubmit={onSubmit} className="
          flex m-1 w-1/2 justify-end
          bg-gradient-to-r from-yellow-300 from-20% via-yellow-200 via-50% to-yellow-300 to-80%
          rounded-md overflow-visible p-0.5 space-y-2
          shadow-md
        ">
        <span className="flex flex-col w-full bg-white rounded p-2 space-y-2">
          <div className="grid max-w-2x1 grid-cols-1 gap-x-6 gap-y-8">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="
                  block text-sm font-medium leading-6 text-slate-900
                ">
                Title
              </label>
              <div className="mt-2">
              <div className="
                flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md
                ">
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="
                    block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6
                  "
                  placeholder="New Title"
                  value={form.title}
                  onChange={(e) => updateForm({ title: e.target.value })}
                  />
              </div>
            </div>
            <label
              htmlFor="body"
              className="
                block text-sm font-medium leading-6 text-slate-900
              ">
              Body
            </label>
            <div className="mt-2">
              <div className="
                flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md
                ">
                <input
                  type="text"
                  name="body"
                  id="body"
                  className="
                    block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6
                  "
                  placeholder="New Post Body"
                  value={form.body}
                  onChange={(e) => updateForm({ body: e.target.value })}
                  />
              </div>
            </div>                        
          </div>
        </div>
        <input 
          type="submit"
          value="Publish Post"
          className="
            rounded-md border-solid border border-yellow-300 
            text-black font-sans font-semibold
            bg-gradient-to-b from-yellow-300 from-20% via-yellow-200 via-50% to-yellow-300 to-80%
            active:bg-gradient-to-r active:from-yellow-400 active:from-10% active:via-yellow-300 active:via-50% active:to-yellow-400 active:to-90%
            px-6 py-1
          "/>
      </span>
    </form>
  </div>
  );
}