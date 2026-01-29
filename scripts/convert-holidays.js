/**
 * @fileoverview 將原始假日資料轉換為應用程式所需格式的腳本。
 * 讀取 src/data/raw 目錄下的 JSON 檔案，轉換欄位名稱並輸出至 src/data/processed。
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '../src/data/raw');
const PROCESSED_DIR = path.join(__dirname, '../src/data/processed');

/**
 * 將單筆原始假日資料轉換為目標格式。
 * @param {Object} raw 原始資料物件
 * @returns {Object} 轉換後的資料物件
 */
const convertHoliday = (raw) => ({
    date: raw.西元日期,
    week: raw.星期,
    isHoliday: raw.是否放假 === '2',
    description: raw.備註,
});

/**
 * 處理單一 JSON 檔案的轉換。
 * @param {string} filename 檔案名稱
 */
const processFile = (filename) => {
    const rawData = fs.readFileSync(path.join(RAW_DIR, filename), 'utf-8');
    const processed = JSON.parse(rawData).map(convertHoliday);
    fs.writeFileSync(path.join(PROCESSED_DIR, filename), JSON.stringify(processed, null, 2), 'utf-8');
};

/** 主程式入口。 */
const main = () => {
    if (!fs.existsSync(PROCESSED_DIR)) {
        fs.mkdirSync(PROCESSED_DIR, { recursive: true });
    }

    fs.readdirSync(RAW_DIR)
        .filter((file) => file.endsWith('.json'))
        .forEach(processFile);
};

main();
