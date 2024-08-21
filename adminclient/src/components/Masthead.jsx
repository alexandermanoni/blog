import CreatePostButton from "./CreatePostButton";
import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";

export default function Masthead() {
  return (
    <div className="flex flex-row justify-end gap-x-2
    bg-gradient-to-b from-slate-300 to-slate-100 px-6 py-6">
      <DeletePostButton className="basis-1/2" />
      <EditPostButton className="basis-1/2" />
      <CreatePostButton className="basis-1/2" />
    </div>
  )
}