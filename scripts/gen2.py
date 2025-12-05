import json

# Parameter
start_year = 2005
end_year = 2025

salary_start = 2500
rent_start = 1200
shopping_start = 1200

salary_increase = 50   # jährliche Steigerung
rent_increase = 15
shopping_increase = 20

transactions = []

for year in range(start_year, end_year + 1):
    salary = salary_start + (year - start_year) * salary_increase
    rent = rent_start + (year - start_year) * rent_increase
    shopping = shopping_start + (year - start_year) * shopping_increase

    transactions.append({
        "date": f"{year}-01-01",
        "name": "Gehalt",
        "amount": salary,
        "imageUrl": "./img/commerzbank.png"
    })
    transactions.append({
        "date": f"{year}-01-01",
        "name": "Miete",
        "amount": -rent,
        "imageUrl": "./img/rent.png"
    })
    transactions.append({
        "date": f"{year}-01-1",
        "name": "Einkäufe",
        "amount": -shopping,
        "imageUrl": "./img/shopping.png"
    })

# Szenario JSON erstellen
scenario = {
    "geld_sitzen_lassen": {
        "options": ["geld_sitzen_lassen"],
        "simulationData": {
            "currentDate": f"{end_year}-12-31",
            "transactions": transactions,
            "depotTransactions": []
        },
        "chatData": {
            "chatMessages": [
                {
                    "isUser": False,
                    "content": "Sieh her, dein Geld hat sich über 20 Jahre fast vollständig verausgabt, weil keine Investitionen getätigt wurden."
                }
            ]
        }
    }
}

# JSON-Datei speichern
with open("geld_sitzen_lassen.json", "w", encoding="utf-8") as f:
    json.dump(scenario, f, indent=2, ensure_ascii=False)

print("JSON-Datei 'geld_sitzen_lassen.json' erfolgreich erstellt!")
