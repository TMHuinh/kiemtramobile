import * as SQLite from "expo-sqlite";

// Sử dụng openDatabaseSync
export const db = SQLite.openDatabaseSync("expense.db");

// Transaction type
export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: "Thu" | "Chi";
  createdAt: string;
  deleted?: boolean;
}

// Khởi tạo bảng
export const initDB = (): void => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      deleted INTEGER DEFAULT 0
    );
  `);
};

// Thêm transaction
export const addTransaction = (
  title: string,
  amount: number,
  type: "Thu" | "Chi"
): void => {
  const createdAt = new Date().toISOString();
  db.execSync(`
    INSERT INTO transactions (title, amount, type, createdAt)
    VALUES ('${title.replace("'", "''")}', ${amount}, '${type}', '${createdAt}');
  `);
};

// Lấy transaction (vẫn chỉ trả mảng rỗng nếu dùng openDatabaseSync)
export const getSQLiteTransactions = (): Transaction[] => {
  return [];
};

// Cập nhật
export const updateTransaction = (
  id: number,
  title: string,
  amount: number,
  type: "Thu" | "Chi"
): void => {
  db.execSync(`
    UPDATE transactions 
    SET title='${title}', amount=${amount}, type='${type}'
    WHERE id=${id};
  `);
};

// Xóa
export const deleteTransaction = (id: number): void => {
  db.execSync(`
    UPDATE transactions
    SET deleted=1
    WHERE id=${id};
  `);
};
