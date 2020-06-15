## 書式設定サービスの使用

書式設定サービスは、フィールドの書式設定を使用せずにダッシュボード データをカスタムに書式設定できます。

### 書式設定がサポートされる要素

書式設定がサポートされる要素

  - 数値データ
  - 日付、時間、または日時のデータ
  - 集計される日、時間、または日時のデータ

### 書式設定サービスの使用

以下は、書式設定の方法の 3 つの例を示します。[数値データ](#numeric-data)、 [集計した日付データ](#aggregated-date-time-data)、 [(未集計) 日時データ](#date-time-data)。この例で使用されるダッシュボードは、*Marketing サンプル* ダッシュボードです。

<a name='numeric-data'></a>

#### 数値データの書式設定例

以下に、 **Marketing サンプル*ダッシュボードの　*キャンペーン ID 別の新しいシート** 可視化の初期状態を示します。

![Initial state of the Marketing visualization using numeric
data](images/initial-state-visualization-formatting-numeric-data.png)

以下の手順に従って、数値データを書式設定して 5 桁の 10 進数を表示します。

1.  1. ダッシュボード データの書式を許可するには、**FormattingProvider** プロパティをカスタム実装に設定します。

    ``` csharp
    RevealView.FormattingProvider = new UpMediaFormattingProvider();
    ```

2.  **IRVFormattingProvider** プロバイダーを実装します。

    ``` csharp
    public class UpMediaFormattingProvider : IRVFormattingProvider
    {
        public RVBaseFormattingService GetFormattingService()
        {
            return new UpMediaFormattingService();
        }
    }
    ```

3.  **RVBaseFormattingService** の実装で **FormatNumber** メソッドをオーバーライドします。

    ``` csharp
    public class UpMediaFormattingService : RVBaseFormattingService
    {
        public override string FormatNumber(double value, RVNumberFormattingSpec formatting, bool ignoreMkFormatting)
        {
            return string.Format("{0:0.00000}", value);
        }
    }
    ```

アプリを再実行すると、すべての数値データが 5 桁の 10 進数で数値を表示するように書式設定され、他のすべての書式設定 (フィールドが通貨またはパーセンテージを表すかどうかなど) が無視されることがわかります。

![After formatting all numbers in the visualizations have five decimal digits](images/result-formatting-numeric-data.png)

たとえば、パーセンテージを表示するフィールドのみの書式を変更する場合は、数値フィールドのタイプのチェックを追加する必要があります。

``` csharp
public class UpMediaFormattingService : RVBaseFormattingService
{
    public override string FormatNumber(double value, RVNumberFormattingSpec formatting, bool ignoreMkFormatting)
    {
        if (formatting.FormatType == RVDashboardNumberFormattingType.Percent)
        {
            return string.Format("{0:0.00000%}", value);
        }

        return base.FormatNumber(value, formatting, ignoreMkFormatting);
    }
}
```

これで、書式設定されたパーセンテージ フィールドのみができました。

![Only percentage numeric data in the visualization displays five decimal digits](images/result-formatting-numeric-data-percentage.png)

ダッシュボードのその他の可視化では、数値データの書式が変更されていないことがわかります。書式設定はチャートによって制御されるため、フィールドの書式設定を変更するには、フィールドの書式設定を変更する必要があります。 変更には、 [ローカライゼーション サービス](localization-service.md)を使用してください。

![The Marketing sample dashboard after formatting
changes](images/formatting-service-marketing-sample-result.png)

<a name='aggregated-date-time-data'></a>

#### DateTime データ書式設定の例

これは、Marketing サンプル **Actual Spend vs Budget** の可視化のうちの 1 つの初期状態です。

![Actual Spend vs Budget initial state](images/formatting-visualization-aggregated-datetime-initial-state.png)

以下に、完全な月名を表示するために集約された日付データを表示する方法の例を示します (例: January 2001)。これを行うには、**RVBaseFormattingService** の実装で　**FormatAggregatedDate** メソッドをオーバーライドする必要があります。

``` csharp
public class UpMediaFormattingService : RVBaseFormattingService
{
    public override string FormatAggregatedDate(DateTime value, RVDashboardDataType type, RVDashboardDateAggregationType aggregation, RVDateFormattingSpec formatting)
    {
        if (aggregation == RVDashboardDateAggregationType.Month)
        {
            return string.Format("{0:MMMM yyyy}", value);
        }

        return base.FormatAggregatedDate(value, type, aggregation);
    }
}
```

アプリを再度実行すると、更新された日付が表示されます。

![The visualization dates showing full name of the month after
formatting](images/formatting-aggregated-datetime-result.png)

<a name='date-time-data'></a>

#### 日時 (非集計) データ書式設定の例

以下に、非集計の日付データを書式設定する方法の例を示します。まず、集計データを除外するために、 **Actual Spend vs Budget** 可視化を **Grid** に変更します。

![Actual Spend vs Budget displayed as a
Grid](images/formatting-non-aggregated-date-grid.png)

日付の表示方法を変更するには、 **RVBaseFormattingService** の実装で **FormatNumber** メソッドをオーバーライドする必要があります。Monday, 01 January 2001 のように、曜日と日付を含む日付を作成します。

``` csharp
public class UpMediaFormattingService : RVBaseFormattingService
{
    public override string FormatDate(DateTime value, RVDashboardDataType type, RVDateFormattingSpec formatting, bool localTimeZone)
    {
        return string.Format("{0:dddd, dd MMMM yyyy}", value);
    }
}
```

また、アプリを再実行してグリッドの可視化を変更すると、更新された日付が表示されます (キャッシュのためにデータの更新が必要な場合があります)。

![Visualization after formatting showing full names of the dates in a grid](images/formatting-non-aggregated-date-result.png)
