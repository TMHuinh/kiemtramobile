import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';


export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>EXPENSE TRACKER</Text>
      </View>


      <View style={styles.body}>
        {/* Placeholder: sau sẽ thay bằng TransactionList component */}
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Chào mừng — danh sách giao dịch sẽ hiển thị ở đây.
        </Text>
      </View>
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
  title: { fontSize: 20, fontWeight: 'bold' },
  body: { flex: 1, padding: 16, backgroundColor: '#f7f8fa' }
});