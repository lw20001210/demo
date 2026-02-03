/**
 * 本地存储工具类
 */

class Storage {
  /**
   * 获取存储项
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return null;
    }
  }

  /**
   * 设置存储项
   */
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key} to localStorage:`, error);
    }
  }

  /**
   * 移除存储项
   */
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  }

  /**
   * 清空存储
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * 获取字符串类型的存储项
   */
  getString(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error getting string item ${key} from localStorage:`, error);
      return null;
    }
  }

  /**
   * 设置字符串类型的存储项
   */
  setString(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting string item ${key} to localStorage:`, error);
    }
  }
}

export const storage = new Storage();
