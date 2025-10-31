import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import TransactionItem from "@/components/TransactionItem";
import { db, Transaction as SQLiteTransaction } from "../database/db";

export default function TrashScreen() {
  const [deletedData, setDeletedData] = useState<SQLiteTransaction[]>([]);

  const loadDeleted = () => {
    try {
      const rows = db.getAllSync(
        "SELECT * FROM transactions WHERE deleted=1 ORDER BY id DESC"
      ) as any[];

      const formatted: SQLiteTransaction[] = rows.map((r) => ({
        id: Number(r.id),
        title: r.title,
        amount: r.amount,
        type: r.type,
        createdAt: r.createdAt,
        deleted: r.deleted ? true : false,
      }));

      setDeletedData(formatted);
    } catch (err) {
      console.log("SQLite load deleted error:", err);
      setDeletedData([]);
    }
  };

  useEffect(() => {
    loadDeleted();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>Trash - Khoản đã xóa</Text>
      <FlatList
        data={deletedData}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TransactionItem
            item={{
              id: String(item.id),
              title: item.title,
              amount: item.amount,
              type: item.type === "Thu" ? "income" : "expense",
              createdAt: item.createdAt,
            }}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { fontSize: 20, fontWeight: "bold", padding: 16 },
});
