# Installing the Client SDK

## Install Using Script Files

### Using the CDN
Modify the `index.html` file to include the `infragistics.reveal.js` script at the bottom of the page just before the closing `</body>` tag.

```html
<script src="https://dl.revealbi.io/reveal/libs/1.3.1/infragistics.reveal.js"></script>
```

### Using JavaScript Files
If using the Reveal CDN is not an option, you can also host the Reveal SDK JavaScript files on your own domain. The Reveal JavaScript files are installed with the [Reveal SDK Installer](installation.md).

1 - `assets` と呼ばれる新しいフォルダーを作成し、`assets` フォルダー内に `reveal` と呼ばれる別のフォルダーを作成します。

![](images/javascript-create-reveal-folder.jpg)

2 - `%public%/Documents/Infragistics/Reveal/SDK/Web/JS/Client` にあるすべての JavaScript ファイルを以前作成した `assets/reveal` フォルダーにコピーします。

![](images/javascript-copy-reveal-files.jpg)

3 - `index.html` ファイルを変更し、ページの下部に (`</body>` 終了タグの直前) `infragistics.reveal.js` スクリプトを含めます。

```html
<script src="./assets/reveal/infragistics.reveal.js"></script>
```

### Add Dependencies
The Reveal SDK requires the following dependencies in order to properly function.

**Jquery 2.2 またはそれ以降**

```html
<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.min.js"></script>
```
**Day.js 1.8.15 またはそれ以降**

```html
<script src="https://unpkg.com/dayjs@1.8.21/dayjs.min.js"></script>
```

**Quill RTE 1.3.6 またはそれ以降**

```html
<link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" type="text/css">    
<script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
```

**Spectrum v 1.8.0 またはそれ以降 (オプション)** - これは、エンドユーザーが特定の表示形式の背景色を設定できるように UI を有効にする場合にのみ必要です。

``` html
<link href="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.css" rel="stylesheet" type="text/css" >
<script src="https://cdnjs.cloudflare.com/ajax/libs/spectrum/1.8.0/spectrum.min.js"></script>
```

Modify the `index.html` file to include all depedency scripts at the bottom of the page just before the `infragistics.reveal.js` script.

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
    <script src="./assets/reveal/infragistics.reveal.js"></script>   
    // highlight-end
</body>
</html>
```