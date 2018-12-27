# I am using daily_data.py for my scheduled lambda function
# That uses psycopg whereas this uses sqlalchemy

import requests
import os
import json
import pandas as pd
from sqlalchemy import create_engine

url = "https://www.alphavantage.co/query"

querystring = {
    "function":"TIME_SERIES_DAILY_ADJUSTED",
    "symbol": ".INX",
    "outputsize": "full",
    "apikey": os.environ['API_KEY']
}

response = requests.request("GET", url, params=querystring)
response_dict = json.loads(response.text)
response_dict = response_dict['Time Series (Daily)']

days = []
highs = []
closes = []

for day in response_dict:
    high = float(response_dict[day]['2. high'])
    close = float(response_dict[day]['4. close'])
    days.append(day)
    highs.append(high)
    closes.append(close)

df = pd.DataFrame({'date': days, 'sp500_high': highs, 'sp500_close': closes})

conn = create_engine(os.environ['DB_CONN'])
df.to_sql('index_investor', conn, index = False, if_exists = 'replace')
conn.close()
print('Loaded new data')