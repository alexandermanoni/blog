import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Comment({ parentCommentID }) {
  const { postid } = useParams();
    const [form, setForm] = useState({
      commentername: "",
      commentbody: "",
    });
  const [isRevealed, setIsRevealed] = useState(false);

  const handleClick = () => {
    setIsRevealed(!isRevealed);
    console.debug(parentCommentID);
  };

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
            const response = await fetch(`http://localhost:5050/record/comments/${postid}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...form, parentID: parentCommentID }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem ocurred: ", error);
        } finally {
            setForm({ commentername: "", commentbody: "" });
            navigate(`/view/${postid}`);
        }
    }

    const RevealedContent = (
      <>
      <h1 className="text-lg font-semibold p-4">Reply to Comment</h1>
            <form onSubmit={onSubmit}
                className="border overflow-hidden p-4"
                >
                <div className="grid max-w-2x1 grid-cols-1 gap-x-6 gap-y-8">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="commentername"
                        className="block text-sm font-medium leading-6 text-slate-900"
                      >
                        Name
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <input
                            type="text"
                            name="commentername"
                            id="name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Commenter Name"
                            value={form.commentername}
                            onChange={(e) => updateForm({ commentername: e.target.value })}
                          />
                        </div>
                      </div>
                        <label
                            htmlFor="commentbody"
                            className="block text-sm font-medium leading-6 text-slate-900"
                            >
                                Body
                            </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="text"
                                    name="commentbody"
                                    id="commentbody"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="New Comment Body"
                                    value={form.commentbody}
                                    onChange={(e) => updateForm({ commentbody: e.target.value })}
                                />
                            </div>
                        </div>                        
                    </div>
                </div>
                <input 
                    type="submit"
                    value="Publish Comment"
                    className="inline-flex items-center justify-center"
                />
            </form>
      </>
    );

    // [note]: fix the indentation for the divs and stuff
    // display form that takes input from the user
    return (
        <>
          <div>
            <button onClick={handleClick}>Reply</button>
            {isRevealed && RevealedContent}
          </div>
            
        </>
    );
}