// import React, { useEffect, useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
// import { useRouter, useLocalSearchParams } from "expo-router";
// import { Transaction, getTransactions, updateTransaction } from "../../database/db";

// export default function EditTransactionScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const router = useRouter();

//   const [title, setTitle] = useState("");
//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState<"Thu" | "Chi">("Thu");

//   useEffect(() => {
//     if (!id) return;

//     // Lấy tất cả transaction (sync) và tìm transaction cần edit
//     const rows: Transaction[] = getTransactions();
//     const t = rows.find((tx) => tx.id === Number(id));
//     if (t) {
//       setTitle(t.title);
//       setAmount(String(t.amount));
//       setType(t.type);
//     }
//   }, [id]);

//   const handleSave = () => {
//     if (!id || !title || !amount) {
//       Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin");
//       return;
//     }

//     // Cập nhật transaction (sync)
//     updateTransaction(Number(id), title, parseFloat(amount), type);
//     Alert.alert("Thành công", "Cập nhật giao dịch thành công");
//     router.back();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Tên giao dịch:</Text>
//       <TextInput
//         style={styles.input}
//         value={title}
//         onChangeText={setTitle}
//       />

//       <Text style={styles.label}>Số tiền:</Text>
//       <TextInput
//         style={styles.input}
//         value={amount}
//         onChangeText={setAmount}
//         keyboardType="numeric"
//       />

//       <Text style={styles.label}>Loại:</Text>
//       <View style={{ flexDirection: "row", marginBottom: 20 }}>
//         <Button
//           title="Thu nhập"
//           onPress={() => setType("Thu")}
//           color={type === "Thu" ? "green" : "gray"}
//         />
//         <View style={{ width: 10 }} />
//         <Button
//           title="Chi tiêu"
//           onPress={() => setType("Chi")}
//           color={type === "Chi" ? "red" : "gray"}
//         />
//       </View>

//       <Button title="Lưu thay đổi" onPress={handleSave} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   label: { fontWeight: "bold", marginTop: 10 },
//   input: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     padding: 10,
//     marginTop: 5,
//   },
// });
