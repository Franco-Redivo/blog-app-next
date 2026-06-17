"use client"

import { useNotification } from "./NotificationContext";

export default function Notification() {
    const { message, type } = useNotification()

    if(!message) return null;

    const style : React.CSSProperties = {
        backgroundColor: type === "success" ? "#16a34a" : "#dc2626",
    }

    return <div className="p-4 mb-4 rounded text-white" style={style}>
        {message}
    </div>
}