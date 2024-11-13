import axios from 'axios';
import { useCallback } from "react";

// J'aurais pu faire 1 seul hook pour patch game et player en passant la route dans les paramètres
// Mais je trouve que faire 2 hooks est mieux pour une raison de scalabilité, dans les cas
// Où player et game viendraient à évoluer et être trop différents

export default function usePatchGame() {
    const patchGame = useCallback(async (data, id) => {
        try {
            const response = await axios.patch(`http://localhost:8000/api/game/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error on patching game :", error);
            throw error;
        }
    }, []);

    return { patchGame };
}
