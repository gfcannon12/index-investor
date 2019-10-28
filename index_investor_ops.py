import platform
import os
import datetime
import boto3
import pandas as pd
import matplotlib.pyplot as plt
import requests
import json
import pytz
from sqlalchemy import create_engine
from pandas.plotting import register_matplotlib_converters
    
def lambda_handler(event, context):
    register_matplotlib_converters()
    ny_tz = pytz.timezone('America/New_York')
    ny_now = datetime.datetime.now(tz=ny_tz)
    
    if ny_now.hour != 16:
        msg = 'WRONG TIME - It is not 4pm in NY, so we are not updating with new data'
        print(msg)
        return msg

    url = "https://www.alphavantage.co/query"

    index_arr = [
        {
            'col': 'sp500',
            'name': 'S&P 500',
            'symbol': 'INX'
        },
        {
            'col': 'djia',
            'name': 'DOW JONES',
            'symbol': 'DJI'
        },
        {
            'col': 'nasdaq',
            'name': 'ONEQ ETF',
            'symbol': 'ONEQ'
        }
    ]

    def get_all_data(index_arr):
        print('requesting ' + index_arr['col'])
        querystring = {
            "function":"TIME_SERIES_DAILY_ADJUSTED",
            "symbol": index_arr['symbol'],
            "outputsize": "full",
            "apikey": os.environ['API_KEY']
        }

        response = requests.request("GET", url, params=querystring)
        response_dict = json.loads(response.text)
        response_dict = response_dict['Time Series (Daily)']

        days = []
        closes = []

        for day in response_dict:
            close = float(response_dict[day]['4. close'])
            days.append(day)
            closes.append(close)
        return {'days': days, 'closes': closes}

    sp500_closes = get_all_data(index_arr[0])
    djia_closes = get_all_data(index_arr[1])
    nasdaq_closes = get_all_data(index_arr[2])

    sp500_len = len(sp500_closes['days'])
    nasdaq_len = len(nasdaq_closes['days'])
    len_diff = sp500_len - nasdaq_len
    nas_zeroes = [0] * len_diff
    nasdaq_closes['closes'] = nasdaq_closes['closes'] + nas_zeroes

    df = pd.DataFrame({'date': sp500_closes['days'], 'sp500': sp500_closes['closes'], 'djia': djia_closes['closes'], 'nasdaq': nasdaq_closes['closes']})
    print('created dataframe')
    
    def make_datetime(datestr):
        return datetime.datetime.strptime(datestr, '%Y-%m-%d')
    
    df['dt'] = df['date'].apply(make_datetime)
    df.sort_values(by='dt', inplace=True)

    most_recent_day = df['dt'].max()    
    day_ago = most_recent_day - datetime.timedelta(days=1)
    month_ago = most_recent_day - datetime.timedelta(days=30)
    year_ago = most_recent_day - datetime.timedelta(days=365)
    
    def get_day(period_dt, col):
        date_list = df.loc[df['dt'] == period_dt, 'date'].values
        while len(date_list) == 0:
            period_dt = period_dt - datetime.timedelta(days=1)
            date_list = df.loc[df['dt'] == period_dt, 'date'].values
        day_data = {}
        day_data['date'] = df.loc[df['dt'] == period_dt, 'date'].values[0]
        day_data[col] = df.loc[df['dt'] == period_dt, col].values[0]
        return day_data
    
    def make_summary(index_arr, df):
        col = index_arr['col']
        col_name = index_arr['name']

        mrd_str = get_day(most_recent_day, col)['date']
        day_str = get_day(day_ago, col)['date']
        month_str = get_day(month_ago, col)['date']
        year_str = get_day(year_ago, col)['date']
        
        mrd_value = get_day(most_recent_day, col)[col]
        day_value = get_day(day_ago, col)[col]
        month_value = get_day(month_ago, col)[col]
        year_value = get_day(year_ago, col)[col]
        
        max_value = df[col].max()
        max_df = df[df[col] == max_value]
        max_df = max_df.loc[max_df['dt'] == max_df['dt'].min(), :]
        max_dt = max_df['dt'].values[0]
        max_dt_dt = datetime.datetime.utcfromtimestamp(max_dt.tolist()/1e9)
        max_str = max_df['date'].values[0]
    
        if max_dt_dt > year_ago:
            chart_start = year_ago
            title = col_name + ' LAST 365 DAYS'
        else:
            chart_start = max_dt
            title = col_name + ' SINCE ALL-TIME HIGH'
        
        
        df = df[df['dt'] >= chart_start]
        df.reset_index(inplace=True)
        mark_df = df[df[col] == max_value]
        mark = mark_df[mark_df['dt'] == mark_df['dt'].max()].index
        
        filename = col + '_' + mrd_str + '.png'
        if platform.system() == 'Darwin':
            # Running Locally
            filepath = './' + filename
        else:
            # Running on Lambda
            filepath = '/tmp/' + filename
        
        plt.style.use('dark_background')
        plt.figure(figsize=[7.2,7.2])
        plt.title(title, fontsize='xx-large')
        plt.yticks(fontsize='large')
        plt.xticks(rotation=45, fontsize='large')
        plt.plot(df['dt'], df[col], label='_nolegend_')
        plt.plot(df['dt'], df[col], linestyle='None', markevery=mark, marker='d', markersize=10, markeredgecolor='r', markerfacecolor='r')
        plt.legend(('HIGH',), fontsize='large')
        plt.savefig(filepath)
        
        s3 = boto3.client('s3')
        bucket_name = 'index-investor'
        s3.upload_file(filepath, bucket_name, 'charts/' + filename)
        print(filename + ' uploaded to ' + bucket_name + ' bucket, charts folder' )

        summary_df = pd.DataFrame({
            'period': ['today', 'yesterday', 'month', 'year', 'max'],
            'date': [mrd_str, day_str, month_str, year_str, max_str],
            'value': [mrd_value, day_value, month_value, year_value, max_value],
            'metric': [col, col, col, col, col]
        })
        return summary_df

    sp500_summary = make_summary(index_arr[0], df)
    djia_summary = make_summary(index_arr[1], df)
    nasdaq_summary = make_summary(index_arr[2], df)

    index_summary = pd.concat([sp500_summary, djia_summary, nasdaq_summary])
    conn = create_engine(os.environ['DB_CONN'])
    index_summary.to_sql('index_summary', conn, if_exists='replace', index=False)
    conn.dispose()
    msg = 'SUCCESS - index_summary table updated'
    print(msg)
    return msg

lambda_handler('test', 'test')