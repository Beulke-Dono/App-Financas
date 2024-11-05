import { useSQLiteContext } from "expo-sqlite"

export type userDatabase = {
    Id: number
    Username: string
    Password: string
}

export function useDatabase() {
    const database = useSQLiteContext()

    async function create(data: Omit<userDatabase, "Id">) {
        const statement = await database.prepareAsync(
            "INSERT INTO User (Username, Password) VALUES ($Username, $Password)"
        )

        try {
            const result = await statement.executeAsync({
                $Username: data.Username,
                $Password: data.Password
            })

        const insertedRowId = result.lastInsertRowId.toLocaleString()
        return { insertedRowId }

        } catch (error) {
            throw error
        } finally {
            await statement.finalizeAsync()
        }
    }
    return { create }
}