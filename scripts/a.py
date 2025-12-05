records = []

for y in range(2010, 2026):
    records.extend([
        {
            "date": f"{y}-01-01",
            "name": "Gehalt",
            "amount": 1500,
            "imageUrl": "./img/commerzbank.png"
        },
        {
            "date": f"{y}-01-01",
            "name": "Miete",
            "amount": -600,
            "imageUrl": "./img/rent.png"
        },
        {
            "date": f"{y}-02-01",
            "name": "Einkäufe",
            "amount": -200,
            "imageUrl": "./img/groceries.png"
        },
        {
            "date": f"{y}-04-01",
            "name": "Einkäufe",
            "amount": -200,
            "imageUrl": "./img/groceries.png"
        },
        {
            "date": f"{y}-07-01",
            "name": "Einkäufe",
            "amount": -200,
            "imageUrl": "./img/groceries.png"
        },
        {
            "date": f"{y}-11-01",
            "name": "Einkäufe",
            "amount": -200,
            "imageUrl": "./img/groceries.png"
        }
    ])


import json

print(json.dumps(records, ensure_ascii=False))