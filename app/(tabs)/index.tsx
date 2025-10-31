import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, StyleSheet, ActivityIndicator, Alert, Text } from 'react-native';
import TransactionItem from '@/components/TransactionItem';
import { useRouter } from 'expo-router';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  createdAt: string;
}

export default function HomeScreen() {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch('https://6831c3346205ab0d6c3d87b0.mockapi.io/chitieu');
      const json = await res.json();
      setData(json);
    } catch (err) {
      Alert.alert('Lỗi tải dữ liệu', 'Không thể kết nối API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem item={item} onPress={() => {router.push('../add')}} onLongPress={() => {/* xử lý */}} />
        )}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff'
  },
  title: { fontSize: 20, fontWeight: 'bold' }
});
