const STORAGE_KEY = 'diary-entries';

export const storage = {
  // すべての日記エントリーを取得
  getAll: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load diary entries:', error);
      return [];
    }
  },

  // 特定の日付の日記を取得
  getByDate: (date) => {
    const entries = storage.getAll();
    return entries.find(entry => entry.date === date) || null;
  },

  // 日記を保存（新規作成または更新）
  save: (entry) => {
    try {
      const entries = storage.getAll();
      const existingIndex = entries.findIndex(e => e.date === entry.date);

      if (existingIndex >= 0) {
        // 既存のエントリーを更新
        entries[existingIndex] = {
          ...entry,
          updatedAt: new Date().toISOString()
        };
      } else {
        // 新規エントリーを追加
        entries.push({
          ...entry,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
      return true;
    } catch (error) {
      console.error('Failed to save diary entry:', error);
      return false;
    }
  },

  // 日記を削除
  delete: (date) => {
    try {
      const entries = storage.getAll();
      const filtered = entries.filter(entry => entry.date !== date);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Failed to delete diary entry:', error);
      return false;
    }
  },

  // 日記が存在する日付のリストを取得
  getDatesWithEntries: () => {
    const entries = storage.getAll();
    return entries.map(entry => entry.date);
  }
};
