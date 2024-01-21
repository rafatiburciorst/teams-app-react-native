import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storage-config";

import { PlayerStorageDTO } from "./Player-storage.dto";

export async function playerGetByGroup(group: string) {
    try {
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`)
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : []

        return players
    } catch (error) {
        throw error
    }
}