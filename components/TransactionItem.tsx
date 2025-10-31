import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


interface TransactionItemProps {
    item: {
        id: string | number;
        title: string;
        amount: number;
        type: 'income' | 'expense';
        createdAt: string;
    };
    onPress?: (item: any) => void;
    onLongPress?: (item: any) => void;
}


export default function TransactionItem({ item, onPress, onLongPress }: TransactionItemProps) {
    const isIncome = item.type === 'income';


    return (
        <TouchableOpacity
            onPress={() => onPress && onPress(item)}
            onLongPress={() => onLongPress && onLongPress(item)}
        >
            <View style={styles.row}>
                <View style={styles.left}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
                </View>
                <View style={styles.right}>
                    <Text style={[styles.amount, { color: isIncome ? 'green' : 'red' }]}>
                        {(isIncome ? '+' : '-') + Number(item.amount).toLocaleString()}
                    </Text>
                    <Text style={styles.type}>{item.type}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: '#fff',
        marginVertical: 6,
        borderRadius: 8,
        elevation: 1,
    },
    left: {},
    title: { fontWeight: '600', fontSize: 16 },
    date: { color: '#888', fontSize: 12 },
    right: { alignItems: 'flex-end' },
    amount: { fontWeight: '700', fontSize: 16 },
    type: { fontSize: 12, color: '#666' },
});