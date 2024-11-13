import axios from 'axios';
import { useCallback } from "react";

export default function usePatchPlayer() {
    const patchPlayer = useCallback(async (data, id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/player/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error on patching player :", error);
            throw error;
        }
    }, []);

    return { patchPlayer };
}
