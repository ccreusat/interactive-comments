import { useState } from "react";

export const useDateTime = (createdAt:any) => {
    
    const getFullDate = () => {
        let year = new Date(createdAt).getFullYear();
        let month = new Date(createdAt).getMonth() < 10 ? "0" + (new Date(createdAt).getMonth() +1) : new Date(createdAt).getMonth() + 1;
        let date = new Date(createdAt).getDate() < 10 ? "0" + (new Date(createdAt).getDate()) : new Date(createdAt).getDate() ;
        return `${year}-${month}-${date}`;
    }

    const [dateTime] = useState(getFullDate());

    return [dateTime];
}