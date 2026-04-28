---
sidebar_label: ストリーミング Markdown 表示
---


# ストリーミング Markdown 表示

このガイドでは、リアルタイムの Markdown レンダリングを使用してストリーミング AI レスポンスを表示する方法を説明します。ストリームからテキストチャンクが到着すると、それらが蓄積され、Markdown ライブラリを使用してフォーマットされた HTML としてレンダリングされます。

## marked.js の使用

[marked](https://www.npmjs.com/package/marked) ライブラリは Markdown を HTML に変換し、ストリーミングテキストとの相性が良好です：

```typescript
import { marked } from 'marked';

let buffer = '';

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'summary',
  stream: true,
});

stream.on('text', (content) => {
  buffer += content;
  // Re-render the full buffer as markdown on each chunk
  document.getElementById('output').innerHTML = marked.parse(buffer);
});

const result = await stream.finalResponse();
console.log('Streaming complete:', result.explanation);
```

## プログレスメッセージとの組み合わせ

メインコンテンツのストリーミングが開始される前に、プログレスステータスを表示します：

```typescript
let buffer = '';
const output = document.getElementById('output');

const stream = await client.ai.insights.get({
  dashboardId: 'sales-dashboard',
  type: 'analysis',
  stream: true,
});

stream.on('progress', (message) => {
  buffer += `*${message}*\n\n`;
  output.innerHTML = marked.parse(buffer);
});

stream.on('text', (content) => {
  buffer += content;
  output.innerHTML = marked.parse(buffer);
  output.scrollTop = output.scrollHeight; // Auto-scroll
});

await stream.finalResponse();
```

## ヒント

- 各チャンクで HTML フラグメントを追加するのではなく、**バッファー全体を再レンダリング**してください。部分的な Markdown（例：閉じられていない `**bold**`）は、さらにテキストが到着するまで正しくレンダリングされません。
- ストリーミング中に最新のテキストが表示されるように、コンテナを**自動スクロール**してください。
- 以前のレスポンスのコンテンツが混在しないように、新しいリクエストを開始する前に**バッファーをクリア**してください。
