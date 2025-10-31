import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import TransactionItem from "@/components/TransactionItem";
import { useRouter, useFocusEffect } from "expo-router";
import { db, initDB, Transaction as SQLiteTransaction } from "../../database/db";

interface APITxn {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  createdAt: string;
}

export default function HomeScreen() {
  const [apiData, setApiData] = useState<APITxn[]>([]);
  const [sqliteData, setSqliteData] = useState<SQLiteTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const router = useRouter();

  // Load dữ liệu SQLite
  const loadSQLiteData = () => {
    try {
      const rows = db.getAllSync(
        "SELECT * FROM transactions ORDER BY id DESC"
      ) as any[];

      const formatted: SQLiteTransaction[] = rows.map((r) => ({
        id: Number(r.id),
        title: r.title,
        amount: r.amount,
        type: r.type,
        createdAt: r.createdAt,
        deleted: r.deleted ? true : false,
      }));
      setSqliteData(formatted.filter((t) => !t.deleted));
    } catch (err) {
      console.log("SQLite load error:", err);
      setSqliteData([]);
    }
  };

  // Xóa transaction SQLite với xác nhận
  const deleteSQLiteTransaction = (id: number) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc muốn xóa mục này không?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            try {
              db.runSync("UPDATE transactions SET deleted=1 WHERE id=?", [id]);
              loadSQLiteData();
            } catch (err) {
              console.log("SQLite delete error:", err);
            }
          },
        },
      ]
    );
  };

  // Fetch dữ liệu API
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://6831c3346205ab0d6c3d87b0.mockapi.io/chitieu"
      );
      const json = await res.json();
      setApiData(json);

      initDB();
      loadSQLiteData();
    } catch (err) {
      console.log("Fetch API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadSQLiteData();
    }, [])
  );

  if (loading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>

      {/* Dữ liệu API */}
      <FlatList
        data={apiData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onPress={() => router.push("../add")} />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={<Text style={styles.section}>Dữ liệu API</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {/* Dữ liệu SQLite */}
      <FlatList
        data={sqliteData}
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
            onPress={() => router.push("../add")}
            onLongPress={() => deleteSQLiteTransaction(item.id!)}
          />
        )}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          <Text style={styles.section}>Dữ liệu SQLite</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  section: { fontSize: 18, fontWeight: "bold", marginVertical: 8 },
});
