import axios from 'axios';
import { useCallback } from "react";

export default function useCreateGame() {
    const createGame = useCallback(async (data) => {
        try {
            const response = await axios.post("http://localhost:8000/api/start_game/", {
                name: data.name,
                players: data.players,
            });
            return response;
        } catch (error) {
            console.error("Error on game creation :", error);
            throw error;
        }
    }, []);

    return { createGame };
}
