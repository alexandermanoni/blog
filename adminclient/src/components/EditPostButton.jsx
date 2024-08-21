import { NavLink } from "react-router-dom";

export default function EditPostButton() {
    return (
        <div>
            <nav className="justify-end mb-6">
                <NavLink className="flex px-8 py-1 
                rounded-md border-solid border border-yellow-300 
                text-black font-sans font-semibold
                active:bg-gradient-to-r active:from-yellow-400 active:from-10% active:via-yellow-300 active:via-50% active:to-yellow-400 active:to-90%
                bg-gradient-to-b from-yellow-400 from10% via-yellow-300 via-50% to-yellow-400 to-90%
                " to="/create">
                    Edit Post
                </NavLink>
            </nav>
        </div>
    )
}