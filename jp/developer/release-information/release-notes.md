## リリース ノート

以下は、Reveal SDK の各バージョンに含まれる新機能および拡張機能です。

<table>
<colgroup>
<col style="width: 20%" />
<col style="width: 80%" />
</colgroup>
    <thead>
        <tr>
            <th>SDK バージョン</th>
            <th>説明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1.0.1136</td>
            <td><i>新しいカスタム テーマ</i><br>
            新しい RevealTheme (デスクトップ) / $.ig.RevealTheme (Web) クラスでカスタマイズ可能な設定の一部またはすべてを構成することにより、Reveal で独自のテーマを作成できるようになりました。</td>
        </tr>
        <tr>
            <td rowspan="3">1.0.981</td>
            <td><i>RevealSettings の新しいプロパティ</i><br>$.ig.RevealSettings にさまざまな機能を制御するための複数の新しいプロパティを追加しました。ShowExportToPDF, ShowExportToPowerpoint, ShowExportToExcel, ShowStatisticalFunctions, ShowDataBlending, ShowMachineLearningModelsIntegration, StartWithNewVisualization, InitialThemeName。</td>
        </tr>
        <tr>
            <td><i>アクセント色のサポート</i><br>SetAccentColor メソッドが $.ig.RevealView に追加されました。</td>
        </tr>
        <tr>
            <td><i>Trigger プロパティが DataSourceRequested イベントに追加されました。</i><br>DataSourcesRequestedTriggerType 型の Trigger プロパティを DataSourcesRequested イベント引数に追加しました。このイベントのユーザーは、DataSourcesRequested の目的について詳細なコンテキストを取得できます。</td>
        </tr>
            <td>1.0.825</td>
            <td><i>画像エクスポート機能が利用できるようになりました。</i><br>サーバー側の画像エクスポート (プログラム上およびユーザー操作の両方により) が再び有効になりました。修正の詳細については、以下のトピックを参照してください。 <a href="setup-configuration-server-web#server-side-image-export">サーバー側画像生成の有効化</a></td>
        <tr>
        </tr>
            <td rowspan="4">1.0.80x</td>
            <td><i>Reveal Desktop SDK のローカリゼーション サービス</i><br>さまざまなダッシュボード要素のタイトルおよびラベルをローカライズすることができます。ローカライゼーション サービスでは、数値および非集計の日付フィールドの書式設定を変更することもできます。</td>
        <tr>
        <tr>
            <td><i>Reveal Desktop SDK の書式設定サービス</i><br>数値データ、集計および非集計の日付フィールドを好みに合わせて書式設定できます。デフォルトの書式設定を無視して、ダッシュボード データを書式設定します。</td>
        </tr>
        <tr>
            <td><i>セットアップと構成の変更 (Server SDK)</i><br>Reveal Server SDK には、.NET Core 2.2+ および .NET Framework 4.6.1+ ASP MVC アプリケーション プロジェクトがサポートされます。また、NuGet パッケージ マネージャーのみを使用すると、アセンブリを参照し、依存関係パッケージをインストールします。</td>
        </tr>        
        </tr>
            <td rowspan="4">1.0.70x</td>
            <td><i>ステップバイステップ ガイド</i><br>Reveal SDK の前提条件、セットアップや構成に必要な手順全般に関するトピックを追加。</td>
        <tr>
        <tr>
            <td><i>ウィジェット データソースの変更</i><br>エンドユーザーによってウィジェットのデータソースを変更する機能を有効または無効にできます。編集モードで [可視化データ] 画面を開いた際に、UI の [データソースの変更] ボタンを表示または非表示にできます</td>
        </tr>
        <tr>
            <td><i>ダッシュボード テーマの変更</i><br>エンドユーザーによってダッシュボードのテーマを変更する機能を有効または無効にできます。ダッシュボードの編集モードに入る際に、使用可能なテーマを表示するためのボタンを表示または非表示にできます。</td>
        </tr>        
    </tbody>
</table>
