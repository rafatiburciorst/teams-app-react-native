import AsyncStorage from "@react-native-async-storage/async-storage";
import { PLAYER_COLLECTION } from "@storage/storage-config";
import { AppError } from "@utils/AppError";

import { playerGetByGroup } from "./player-get-by-group";
import { PlayerStorageDTO } from "./Player-storage.dto";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

    try {
        const storagedPlayers = await playerGetByGroup(group)
        const playerAlreadyExist = storagedPlayers.some((player) => player.name === newPlayer.name)

        if (playerAlreadyExist) {
            throw new AppError('Essa pessoa já está adicionada em um time')
        }

        const storage = JSON.stringify([...storagedPlayers, newPlayer])

        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
    } catch (error) {
        throw error
    }
}

