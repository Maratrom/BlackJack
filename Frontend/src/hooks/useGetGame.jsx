import { useCallback } from "react";
import axios from 'axios';

export default function useGetGame() {
    const getGame = useCallback(async (id) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/game/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error on retrieving game ${data.id}:`, error);
            throw error;
        }
    }, []);

    return { getGame };
}
