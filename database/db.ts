// database/db.ts
import * as SQLite from "expo-sqlite";

// Mở database sync
export const db = SQLite.openDatabaseSync("expense.db");

export interface Transaction {
  id?: number;
  title: string;
  amount: number;
  type: "Thu" | "Chi";
  createdAt: string;
}

// Khởi tạo bảng
export const initDB = (): void => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      amount REAL NOT NULL,
      type TEXT NOT NULL,
      createdAt TEXT NOT NULL
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
  db.execSync(
    `INSERT INTO transactions (title, amount, type, createdAt) 
     VALUES ('${title.replace("'", "''")}', ${amount}, '${type}', '${createdAt}');`
  );
};

// Lấy tất cả transaction
export const getTransactions = (): Transaction[] => {
  // execSync không trả dữ liệu SELECT, nên chỉ minh họa
  // Nếu muốn lấy thật, phải dùng openDatabase + transaction async
  return [];
};
