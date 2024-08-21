import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Record = (props) => (
    <div className="flex flex-col rounded-lg bg-white shadow-md space-y-3 p-6 m-1 w-1/2">
        <div className="text-2xl font-semibold text-black">
            {props.record.posttitle}
        </div>
        <div className="text-md font-small text-black text-justify">
            {props.record.postbody}
        </div>
        <div className="text-sm text-black">
            {props.record.postdate}
        </div>
        <div className="basis-1/2">
            {/*[note]: this probably isn't the best way to get the postid (should it come from the parent) */}
            <NavLink className="px-6 py-1 
                rounded-md border-solid border border-yellow-300 
                text-black font-sans font-semibold
                bg-gradient-to-b from-yellow-300 from-20% via-yellow-200 via-50% to-yellow-300 to-80%
                active:bg-gradient-to-r active:from-yellow-400 active:from-10% active:via-yellow-300 active:via-50% active:to-yellow-400 active:to-90%" 
                to={`/view/${props.record.postid}`}>
                Comments
            </NavLink>
        </div>
    </div>
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // scrolling
    // https://buaiscia.github.io/blog/tips/handle-scroll-event-react

    // fetch records from database
    // [note]: useEffect is used for external stuff like fetching
    useEffect(() => {
        async function getRecords() {
            // [note]: in server/server.js express is told to use records from 
            // server/routes/record.js when in the /record directory, that's
            // why we fetch from /record but the express code in record.js
            // is just the root (/)
            const response = await fetch(`http://localhost:5050/record/`);

            if (!response.ok) {
                const message = `An error occurred: ${response.statusText}`;
                console.error(message);
                return;
            }

            const records = await response.json();
            setRecords(records);
        }

        getRecords();
        return;
    }, [records.length]);

    // map records to table
    function recordList() {
        return records.map((record) => {
            return (
                <Record
                    record={record}
                    key={record.postid}
                />
            );
        });
    }

    // display records (posts)
    return (
        <>
            <div className="flex overflow-visible space-y-10 items-center flex-col">
                { recordList() }
            </div>
        </>
    );
}