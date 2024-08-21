import { NavLink } from "react-router-dom";

export default function DeletePostButton() {
    return (
        <div>
            <nav className="justify-end mb-6">
                <NavLink className="flex px-8 py-1 
                rounded-md border-solid border border-yellow-300 
                text-black font-sans font-semibold
                bg-gradient-to-b from-yellow-300 from-20% via-yellow-200 via-50% to-yellow-300 to-80%
                active:bg-gradient-to-r active:from-yellow-400 active:from-10% active:via-yellow-300 active:via-50% active:to-yellow-400 active:to-90%
                " to="/create">
                    Delete Post
                </NavLink>
            </nav>
        </div>
    )
}