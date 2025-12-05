import json
from datetime import datetime, timedelta

def generate_depot_transactions(start_year=2015, end_year=2025, shares_per_quarter=5, symbol="XWD.TO"):
    depot_transactions = []
    current_date = datetime(start_year, 1, 1)

    while current_date.year <= end_year:
        # Transaction date at end of quarter (approx.)
        transaction_date = (current_date + timedelta(days=27)).strftime("%Y-%m-%d")
        depot_transactions.append({
            "date": transaction_date,
            "symbol": symbol,
            "shares": shares_per_quarter,
            "type": "buy"
        })

        # Move to next quarter
        if current_date.month >= 10:
            current_date = datetime(current_date.year + 1, 1, 1)
        else:
            current_date = datetime(current_date.year, current_date.month + 3, 1)
    
    return depot_transactions

# Generate the list
transactions_list = generate_depot_transactions()

# Save to JSON file
with open("depotTransactions.json", "w") as f:
    json.dump(transactions_list, f, indent=2)

# Optional: print a preview
print(json.dumps(transactions_list[:5], indent=2))
