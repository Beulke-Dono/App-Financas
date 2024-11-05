import { useState } from "react";
import { View, Button, Alert } from "react-native";
import { Input } from "./components/Input";
import { useDatabase } from "@/database/useDatabase"

export default function Index() {
  const [Id, setId] = useState("")
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")

  const database = useDatabase()

  async function create() {
    try {
      const response = await database.create({ Username, Password })

      Alert.alert("Usuário cadastrado com sucesso!")

    } catch(error) {
      console.log(error)
    }
  }

  return (
      <View style={{ flex: 1, padding: 32, gap: 16,
        alignItems: "center"}}>
          <Input placeholder="Nome" onChangeText={setUsername} value={Username} />
          <Input placeholder="Senha" onChangeText={setPassword} value={Password} />
          <Button title="Cadastrar" onPress={create}/>
      </View>
  )
}