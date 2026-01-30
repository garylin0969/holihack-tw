---
trigger: always_on
description: 當使用者要求建立元件、UI 區塊或進行前端開發時啟動。強制執行 Atomic Design 架構與特定的檔案導出規範。
---

# Atomic Design 元件開發規範

你必須遵循 **Atomic Design** 的架構原則來組織所有元件。

## 1. 目錄架構 (Directory Structure)

根據元件的複雜度，將其放置於以下對應路徑：

| 層級          | 路徑                    | 說明                        | 範例                      |
| ------------- | ----------------------- | --------------------------- | ------------------------- |
| **Atoms**     | `components/atoms/`     | 最小單位，不可再分割        | Button, Input, Icon       |
| **Molecules** | `components/molecules/` | 由 Atom 組成的小型群組      | SearchBar, Card           |
| **Organisms** | `components/organisms/` | 由多個 Molecules/Atoms 組成 | Header, Footer, LoginForm |

## 2. 命名規範 (Naming Convention)

> **注意**：檔案命名規範請參考 `kebab-naming-enforcer` 的rules。

- **資料夾命名**：嚴格使用 **kebab-case** (例如：`user-avatar`)
- **檔案命名**：嚴格使用 **kebab-case** (例如：`user-avatar.tsx`)
- **元件變數名**：使用 **PascalCase** (例如：`UserAvatar`)

## 3. 檔案組成與內容規範 (File Composition)

每個元件必須是一個獨立的資料夾，包含 `index.ts` 與元件本體檔案。

### 規則 A: 元件本體 (`<component-name>.tsx`)

- **語法**：必須使用 **Arrow Function (箭頭函式)**
- **導出**：必須使用 `export default`

```tsx
// components/organisms/site-footer/site-footer.tsx

interface SiteFooterProps {
    copyright?: string;
}

const SiteFooter = ({ copyright }: SiteFooterProps) => {
    return <footer>{copyright}</footer>;
};

export default SiteFooter;
```

### 規則 B: 索引檔案 (`index.ts`)

- **語法**：使用 `export { default }` 進行轉發
- **擴充**：若有額外型別需導出，可在此加入

```ts
// components/organisms/site-footer/index.ts

export { default } from './site-footer';

// 若有其他需要導出的型別
// export type { SiteFooterProps } from './site-footer';
```
