import { NavLink } from "react-router-dom";

export default function CreatePostButton() {
    return (
        <div>
            <nav className="flex justify-between item-center mb-6">
                <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none 
                    focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 
                    h9 rounded-md px-3" to="/create">
                    New Post
                </NavLink>
            </nav>
        </div>
    )
}