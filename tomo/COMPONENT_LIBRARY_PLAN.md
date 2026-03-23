# Component Library 實作計劃

## 定位

給 Swift 工程師的視覺規格文件，不包含程式碼。
工程師參考後自行以 SwiftUI 實作。

## 格式

獨立的 `component-library.html`，和 `screen-flow.html` 互相有連結切換。
頁面排版風格沿用 screen-flow.html（紙色背景、page header 樣式）。

## 重要：樣式來源

**所有元件的顏色、尺寸、CSS 數值必須從 `voice-diary.html` 提取，不能只看 screen-flow.html。**
screen-flow.html 是仿製版本，已知有誤差，不可作為規格依據。
實作前必須重新讀 voice-diary.html 的 CSS 和 JS，確保數值正確。

## 重要：情緒顏色系統以規格文件為主

原型（voice-diary.html）和規格文件的情緒系統**不一樣**，兩者不可混用。

| | 原型 | 規格文件 |
|---|---|---|
| 來源 | 隨意自訂 | Plutchik 情緒輪 × 色彩心理學 |
| 情緒數 | 10 種 | 8 種 + 中性 |
| 強度分層 | 無 | high / medium / low 三層 |
| 分析方式 | 關鍵字比對（prototype 限制） | LLM 分析（正式版） |

**Component library 的顏色規格以 `/Users/kyle/obsidian/healyou-wiki/projects/tomo/spec_emotion-color-mapping.md` 為唯一依據。**
原型的顏色僅供視覺風格參考，不作為正式色票。

## 內容結構

### 1. 色彩系統
- 情緒色（10 種）：色票 + 名稱 + hex + RGB
  平靜 #8BB8C8 / rgb(170,205,218)
  快樂 #F5C030 / rgb(255,210,80)
  興奮 #F07030 / rgb(255,125,65)
  悲傷 #6478C0 / rgb(95,120,198)
  焦慮 #C09ADC / rgb(190,150,220)
  憤怒 #DC4840 / rgb(218,70,60)
  感激 #80C888 / rgb(125,198,142)
  疲倦 #9E9488 / rgb(155,145,135)
  溫柔 #FCC0B5 / rgb(250,190,180)
  孤獨 #7460A0 / rgb(112,92,155)
- 背景色：--paper #f7f2ec
- 文字色：--ink #2e2318 / --ink2 rgba(46,35,24,.44)
- 玻璃色：--glass rgba(255,255,255,.55)

### 2. 字型系統
- Playfair Display（italic）：品牌名、大標題
  - 72px：OB splash 品牌大字
  - 36px：Auth 品牌名
  - 26px：OB 標題
  - 22px：日記簿標題
  - 20px：錄音頁品牌名
- Noto Serif TC：所有 UI 文字
  - 15px / weight 300：轉錄文字、正文
  - 14px：按鈕、卡片內文
  - 13px：副文字、描述
  - 12px：標籤、輔助文字
  - 11px：meta、時間、badge
  - 10px / letter-spacing .18em uppercase：眉標文字

### 3. 元件清單（每個元件附視覺展示 + 尺寸規格 + 狀態說明）

- **Mic Button**：idle / recording（紅色光暈 pulse animation）
- **Progress Ring**：SVG 圓環，r=36，circumference=226，stroke-dashoffset 控制進度
- **Emotion Pill**：色點 + 情緒名稱，idle 時「靜待…」無色
- **Volume Viz**：5–7 條 bar，寬 3px，圓角，高度動態
- **Side Button**（完成）：圓形，48×48，玻璃質感
- **Glass Card**：background rgba(255,255,255,.55)，border rgba(255,255,255,.85)，border-radius 多種規格
- **Bottom Sheet**（Done Sheet）：border-radius 24px 24px 0 0，handle bar
- **Modal**：overlay + card，border-radius 20px
- **Entry Card**：水彩背景 + 漸層遮罩 + 情緒 meta + 文字摘要
- **Auth Button**：Apple（黑底白字）/ Google（白底黑字）
- **OB Dots**：分頁指示點，active 態為長條形 width 20px
- **CTA Button**：全幅，border-radius 50px，玻璃質感

### 4. 動畫規格（供工程師參考）
- OB 頁切換：.45s cubic-bezier(.4,0,.2,1)
- Done Sheet 滑入：.45s cubic-bezier(.4,0,.2,1)，translateY(100%)→0
- Modal 出現：opacity 0→1 0.3s + translateY(12px)→0
- Reflection 浮現：opacity 0→1 0.8s ease，delay 1400ms
- Progress Ring 更新：stroke-dashoffset transition .4s linear

## 實作提醒

- 元件 CSS 數值一律從 voice-diary.html 提取，不從 screen-flow.html 複製
- 頁面排版（header、背景、字體載入）參考 screen-flow.html
- 每個元件用獨立的展示卡片呈現，背景用 --paper
- 狀態並排展示（如 Mic Button idle 和 recording 放在同一行）
- 頁面頂部和 screen-flow.html 一樣有 page header，加上互相切換的連結
