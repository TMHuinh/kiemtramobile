import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addTransaction, initDB } from "../database/db";
import { useRouter } from "expo-router";

export default function AddTransactionScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"Thu" | "Chi">("Thu");

  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    initDB();
  }, []);

  const handleSave = () => {
    if (!title || !amount) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    addTransaction(title, parseFloat(amount), type);

    Alert.alert("Thành công", "Giao dịch đã được thêm!");

    // Clear ô nhập
    setTitle("");
    setAmount("");
    titleRef.current?.clear();
    amountRef.current?.clear();

    router.back(); // Quay về màn hình Home
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tên giao dịch:</Text>
      <TextInput
        ref={titleRef}
        style={styles.input}
        placeholder="Nhập tên"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Số tiền:</Text>
      <TextInput
        ref={amountRef}
        style={styles.input}
        placeholder="Nhập số tiền"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Loại:</Text>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Button
          title="Thu nhập"
          onPress={() => setType("Thu")}
          color={type === "Thu" ? "green" : "gray"}
        />
        <View style={{ width: 10 }} />
        <Button
          title="Chi tiêu"
          onPress={() => setType("Chi")}
          color={type === "Chi" ? "red" : "gray"}
        />
      </View>

      <Button title="Lưu giao dịch" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
});
