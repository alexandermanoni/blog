import { useEffect, useState } from "react";

const Record = (props) => (
    <div className="rounded-lg backdrop-blur-md shadow-lg space-y-4">
        <div className="text-2xl font-bold text-white">
            {props.record.title}
        </div>
        <div className="text-md font-medium text-white">
            {props.record.text}
        </div>
        <div className="text-sm text-white">
            {props.record.time}
        </div>
    </div>
    /*
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
        <td className="p-4 align-middle [&amp;:has([role-checkbox])]:pr-0">
            {props.record.title}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.text}
        </td>
        <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            {props.record.time}
        </td>
    </tr>
    */
);

export default function RecordList() {
    const [records, setRecords] = useState([]);

    // fetch records from database
    useEffect(() => {
        async function getRecords() {
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
                    key={record._id}
                />
            );
        });
    }

    // display records (posts)
    return (
        <>
            <div className="overflow-hidden space-y-10">
                { recordList() }
            </div>
        </>
    );
}