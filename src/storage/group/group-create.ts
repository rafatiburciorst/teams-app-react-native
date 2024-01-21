import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage-config";
import { AppError } from "@utils/AppError";

import { groupsGetAll } from "./groups-get-all";

export async function groupCreate(newGroup: string) {
    try {
        const stored = await groupsGetAll()

        const groupAlreadyExists = stored.includes(newGroup)

        if (groupAlreadyExists) {
            throw new AppError('Já existe um grupo com este nome')
        }

        const storage = JSON.stringify([...stored, newGroup])
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)
    } catch (error) {
        throw error
    }
}