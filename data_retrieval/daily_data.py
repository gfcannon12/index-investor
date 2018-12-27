def lambda_handler(event, context):
    import requests
    import os
    import json
    import datetime
    import psycopg2
    import pytz
    
    ny_tz = pytz.timezone('America/New_York')
    ny_now = datetime.datetime.now(tz=ny_tz)
    
    if ny_now.hour != 16:
        print('It is not 4pm in NY, so we are not updating with new data')
        return

    current_day = datetime.datetime.today()
    day_string = current_day.strftime('%Y-%m-%d')
    
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
    day_dict = response_dict.get(day_string)
    
    if day_dict == None:
        print("ERROR - No data for {}".format(day_string))
    else:
        last_high = float(response_dict[day_string]['2. high'])
        last_close = float(response_dict[day_string]['4. close'])
        conn = psycopg2.connect(os.environ['DB_CONN_PSYCO'])
        cur = conn.cursor()
        cur.execute("insert into index_investor (date, sp500_high, sp500_close) values (%s, %s, %s)", [day_string, last_high, last_close])
        conn.commit()
        cur.close()
        conn.close()
        print("SUCCESS - Inserted data for {}".format(day_string))
