import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storage-config";

import { playerGetByGroup } from "./player-get-by-group";

export async function playerRemoveByGroup(playerName: string, group: string) {

    try {
        const storaged = await playerGetByGroup(group)
        const players = storaged.filter(player => player.name !== playerName)
        const store = JSON.stringify(players)
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, store)
    } catch (error) {
        throw error
    }
}