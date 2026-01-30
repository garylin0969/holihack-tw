---
name: google-style-comments
description: 當撰寫、重構或解釋 TypeScript/JavaScript 程式碼時啟動。強制為所有導出的函式、類別、介面與元件添加 Google Style 的繁體中文 JSDoc 註解。
---

# Google Style 程式碼註解規範 (繁體中文版)

為了確保程式碼的可讀性與 IDE 支援度，所有 Exported (導出) 的程式碼實體必須遵循 Google JavaScript Style Guide 的 JSDoc 規範。

> 📚 **官方參考**：[Google JavaScript Style Guide - JSDoc](https://google.github.io/styleguide/jsguide.html#jsdoc)

## 1. 核心原則 (Core Principles)

- **語言**：所有說明文字必須使用 **繁體中文** (台灣習慣用語)。
- **格式**：必須使用 `/** ... */` 多行註解格式。
- **時機**：在定義任何 `export` 的 Function, Component, Interface, Type, Class 之前，必須加上註解。

## 2. 標籤規範 (Tag Standards)

依照 Google Style，請使用以下標準標籤：

| 標籤                  | 說明                                                      |
| --------------------- | --------------------------------------------------------- |
| `@param {Type} name`  | 說明參數的名稱、型別與用途。若參數為選填，請標註 `[name]` |
| `@return {Type}`      | (或 `@returns`) 說明回傳值的型別與意義                    |
| `@throws {ErrorType}` | 說明函式可能拋出的錯誤類型與原因                          |
| `@deprecated`         | 若該功能已過時，請說明原因與替代方案                      |
| `@example`            | 提供程式碼使用範例                                        |

## 3. 撰寫範例 (Examples)

### A. 函式與工具 (Functions & Utils)

註解第一行應為簡短的摘要，若有詳細說明請空一行再寫。

```typescript
/**
 * 計算購物車的總金額，並包含稅率運算。
 *
 * 此函式會自動過濾掉無效的商品項目，並應用當前的優惠券折扣。
 *
 * @param {CartItem[]} items - 購物車內的商品列表
 * @param {number} [taxRate=0.05] - 稅率 (預設為 5%)
 * @param {string} [couponCode] - (選填) 優惠券代碼
 * @return {number} 計算後的最終金額 (四捨五入至小數點後兩位)
 * @throws {ValidationError} 當商品列表為空時拋出錯誤
 */
export const calculateTotal = (items: CartItem[], taxRate: number = 0.05, couponCode?: string): number => {
    // ...
};
```

### B. React 元件 (Components)

必須清楚說明元件的職責以及 Props。

```tsx
/**
 * 使用者個人資料卡片元件。
 *
 * 負責顯示使用者的頭像、名稱以及簡介。
 * 點擊卡片時會觸發導航至使用者詳情頁面。
 *
 * @param {Object} props - 元件參數
 * @param {string} props.userId - 使用者唯一識別碼
 * @param {string} props.name - 顯示名稱
 * @param {string} [props.avatarUrl] - (選填) 頭像圖片網址，若無則顯示預設圖
 * @param {() => void} [props.onClick] - (選填) 點擊卡片時的回呼函式
 * @return {JSX.Element} 渲染後的卡片 UI
 */
export const UserProfileCard = ({ userId, name, avatarUrl, onClick }: UserProfileCardProps): JSX.Element => {
    // ...
};
```

### C. 介面與型別 (Interfaces & Types)

每個屬性上方都應有單行說明。

```typescript
/**
 * 定義 API 回傳的標準錯誤格式
 */
export interface ApiErrorResponse {
    /** 錯誤代碼 (如: 404, 500) */
    code: number;
    /** 給使用者看的錯誤訊息 (繁體中文) */
    message: string;
    /** 除錯用的詳細堆疊資訊 (僅在開發環境回傳) */
    stack?: string;
}
```

## 4. 執行檢查 (Execution Check)

生成程式碼後，請檢查：

- [ ] 註解是否位於程式碼正上方？
- [ ] 參數名稱是否與程式碼一致？
- [ ] 說明文字是否通順且為繁體中文？
