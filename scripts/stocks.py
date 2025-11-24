import yfinance as yf

def get_closing_values(symbol: str, interval: str, start: str, end: str):
    data = yf.download(symbol, interval=interval, start=start, end=end)

    if data.empty:
        return {}

    close_series = data["Close"]
    if hasattr(close_series, "columns"):
        close_series = close_series.iloc[:, 0]

    result = {
        idx.strftime("%d-%m-%Y"): round(val, 2)
        for idx, val in close_series.items()
    }

    return result


if __name__ == "__main__":
    result = get_closing_values("AAPL", "1d", "2023-01-01", "2023-06-01")
    print(result)
