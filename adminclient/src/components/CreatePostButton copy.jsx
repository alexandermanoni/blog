import { NavLink } from "react-router-dom";

export default function CreatePostButton() {
    return (
        <div>
            <nav className="flex justify-end mb-6">
                <NavLink className="flex px-8 py-1 
                rounded-md border-solid border border-blue-500 
                text-white font-sans font-semibold
                bg-gradient-to-b from-blue-400 to-blue-500
                active:bg-gradient-to-b active:from-blue-500 active:to-blue-600
                " to="/create">
                    Create Post
                </NavLink>
            </nav>
        </div>
    )
}