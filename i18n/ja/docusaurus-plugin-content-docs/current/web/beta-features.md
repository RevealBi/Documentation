# ベータ機能 API

Reveal SDK は、**ベータ機能**を有効にして管理するための集中的な方法を提供します。これにより、正式にリリースされる前に新しい機能や実験的な機能をテストできます。

## ベータ機能の有効化
ベータ機能は以下を使用して有効にできます。

```javascript
//enable one feature
RevealSdkSettings.betaFeatures.enable("newPieChart");

//enable multiple features
RevealSdkSettings.betaFeatures.enable("newPieChart", "newDonutChart");

//alternatively use an array
RevealSdkSettings.betaFeatures.enable(...[
    "newPieChart",
    "newDonutChart"
]);
```

## ベータ機能の無効化
以前に有効にしたベータ機能を無効にするには:

```javascript
RevealSdkSettings.betaFeatures.disable("newPieChart");
```

## 有効化されたすべてのベータ機能を取得する

```javascript
const betafeatures = RevealSdkSettings.betaFeatures.getEnabledFeatures();
```

## 利用可能なベータ フラグ
次のベータ機能フラグを使用できます:

### `newDataGrid`

**リリース済み。** 新しいデータ グリッドは Reveal SDK のデフォルトのグリッド表示形式になったため、このフラグを有効にする必要はなくなりました。既存のグリッド表示形式は、ダッシュボードを変更しなくても新しいデータ グリッドで描画されます。

列オプション メニュー、フィルタリング、集計、グループ化、ページングの詳細な解説に加えて、コードから構成できる項目と現在の制限事項については、[グリッド チャート](../user/chart-types/grid-chart.md) を参照してください。

#### 従来のグリッドを使用する

このフラグは引き続き有効なため、`RevealView` を作成する前にフラグを**無効化**することで従来のグリッドに戻すことができます。

```javascript
RevealSdkSettings.betaFeatures.disable("newDataGrid");
```

これは移行期間中の一時的な回避策として用意されているものです。従来のグリッドは将来のリリースで削除される予定です。

:::caution
条件付き書式の動作は 2 つのグリッドで異なります。同じセルに複数のルールが一致する場合、新しいデータ グリッドは一致するすべてのルールをリストの順序で適用し、重複する書式プロパティについては後のルールが優先されます。重複するルールに依存しているダッシュボードは、アップグレード後に表示が変わる可能性があります。
:::

### `newTooltip`

**リリース済み。** ホバー ツールチップは Reveal SDK のデフォルトのツールチップ エクスペリエンスになり、このベータ フラグは削除されました。有効にしても効果はないため、その呼び出しは削除できます。

ツールチップは、対応するすべての表示形式でホバー時に表示されるようになりました。ドリルダウンやフィルタリングなどのツールチップ アクションも、ツールチップから直接利用できます。ツールチップのオン/オフを切り替えるには、`RevealView.showTooltips` プロパティを使用します。詳細については、[ツールチップの操作](tooltips.md) を参照してください。

## ベータ版サーバー API

### `IRVDataModelProvider`
基になるデータ ソースを変更せずに、サーバー上でデータ ソース項目のデータ モデルをカスタマイズできます。
- **`EditSchemaAsync`**: 既存のフィールド (ラベル、説明、既定の集計、週レベル) を変更します。変更を適用するには変更後のリストを返し、元のスキーマを保持するには `null` を返します。
- **`GetCalculatedFieldsAsync`**: 既存のフィールドを参照する式に基づいて計算フィールドを追加します (例: `[UnitPrice] * [Quantity]`)。
- **`GetMeasuresAsync`**: 集計式に基づくカスタム メジャーを追加します (例: `sum(...)`、`sumif(...)`、`PREVIOUS(...)`)。

計算フィールドとメジャーは、他のフィールドと同様に表示形式エディターに表示されます。

```csharp
public class MyDataModelProvider : IRVDataModelProvider
{
    public Task<List<RVDataModelField>> EditSchemaAsync(IRequestContext requestContext, RVDataSourceItem dataSourceItem, List<RVDataModelField> schema)
    {
        schema.First(f => f.Name == "UnitPrice").Label = "Price per Unit";
        return Task.FromResult(schema);
    }

    public Task<List<RVDataModelCalculatedField>> GetCalculatedFieldsAsync(IRequestContext userContext, RVDataSourceItem dataSourceItem)
    {
        return Task.FromResult(new List<RVDataModelCalculatedField> {
            new RVDataModelCalculatedField("LineTotal", RVDashboardDataType.Number, "[UnitPrice] * [Quantity] * (1 - [Discount])")
        });
    }

    public Task<List<RVDataModelMeasure>> GetMeasuresAsync(IRequestContext userContext, RVDataSourceItem dataSourceItem)
    {
        return Task.FromResult(new List<RVDataModelMeasure> {
            new RVDataModelMeasure("Total Revenue", "sum([UnitPrice] * [Quantity])") { Description = "Revenue before discount" }
        });
    }
}
```

プロバイダーは、ASP.NET では `AddDataModelProvider<MyDataModelProvider>()`、Java では `RevealServerBuilder` の `setDataModelProvider(...)`、Node.js では `dataModelProvider` オプションを使用して登録します。
