# Reveal SDK for HTML/JavaScript で作業を開始

## 手順 1 - HTML ファイルの作成

1 - お気に入りのコード エディターを開き、新しい HTML ファイルを作成し、`index.html` という名前でファイルを保存します。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title>  
</head>
<body>

</body>
</html>
```

## 手順 2 - Reveal JavaScript API の追加

1 - `index.html` ファイルを変更し、ページの下部に (`</body>` 終了タグの直前) `infragistics.reveal.js` スクリプトを含めます。

```html
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

2 - 残りの Reveal JavaScript API 依存関係をインストールします。

- jQuery 2.2 またはそれ以降

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```
- Day.js 1.8.15 またはそれ以降

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

- Quill RTE 1.3.6 またはそれ以降

```html
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">    
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
```

最終の `index.html` ファイルは以下のようになります。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title> 
    // highlight-next-line
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">  
</head>
<body>

    // highlight-start
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>    
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>    
    <script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
    // highlight-end
</body>
</html>
```

## 手順 3 - Reveal ビューの初期化

1 - `index.html` ファイルを変更し、開始 `<body>` タグの後に新しい `<div>` タグを追加して、`id` を `revealView` に設定します。

```html
<div id="revealView" style="height: 920px; width: 100%;"></div>
```

2 - `index.html` ファイルの最後に JavaScript の `Script` タグを追加し、`revealView` を初期化します。

```html
<script type="text/javascript">
    //highlight-next-line
    var revealView = new $.ig.RevealView("#revealView");
</script>
```

この JavaScript コードは最初に `$.ig.RevealSdkSettings.ensureFontsLoadedAsync` を呼び出してすべてのフォントが正しく読み込まれたことを確認します。次に、新しい `$.ig.RevealView` を作成し、`#revealView` セレクターを渡すことで、`RevealView` の新しいインスタンスを作成します。

最終の `index.html` ファイルは以下のようになります。

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reveal Sdk - HTML/JavaScript</title> 
    //highlight-next-line
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">  

</head>
<body>
    //highlight-start
    <div id="revealView" style="height: 920px; width: 100%;"></div>

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
    <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>    
    <script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>    
    <script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>

    <script type="text/javascript">
        var revealView = new $.ig.RevealView("#revealView");
    </script>
    //highlight-end
</body>
</html>
```

:::caution

クライアント アプリは、クライアントが別の URL でホストしている場合、`$.ig.RevealSdkSettings.setBaseUrl("url-to-server");` をダッシュボードをホストしているサーバー アドレスに設定する必要があります。

:::

## 手順 4 - アプリケーションの実行

`index.html` ファイルをダブルクリックしてデフォルトのブラウザーで Web ページを起動します。

![](images/angular-app-running.jpg)

完了しました! 最初の Reveal SDK アプリケーションを作成しました。

:::info Get the Code

このサンプルのソース コードは [GitHub](https://github.com/RevealBi/sdk-samples-javascript/tree/main/01-GettingStarted/client/html) にあります。

:::
