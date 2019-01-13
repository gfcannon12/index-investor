def lambda_handler(event, context):
    import pandas as pd
    import os
    import datetime
    import boto3
    import matplotlib.pyplot as plt
    from sqlalchemy import create_engine

    conn = create_engine(os.environ['DB_CONN'])
    sql = 'select * from index_investor'
    df = pd.read_sql(sql, conn)
    conn.dispose()
    col='sp500_close'
    col_name = 'S&P 500'

    def make_datetime(datestr):
      return datetime.datetime.strptime(datestr, '%Y-%m-%d')

    df['dt'] = df['date'].apply(make_datetime)
    df.sort_values(by='dt', inplace=True)
    most_recent_day = df['dt'].max()
    year_ago = most_recent_day - datetime.timedelta(days=365)
    max_value = df[col].max()
    max_df = df[df[col] == max_value]
    max_dt = max_df['dt'].values[0]
    max_dt_dt = datetime.datetime.utcfromtimestamp(max_dt.tolist()/1e9)

    if max_dt_dt > year_ago:
        chart_start = year_ago
        title = col_name + ' Last 365 days'
    else:
        chart_start = max_dt
        title = col_name + ' Since All-Time High'


    df = df[df['dt'] >= chart_start]
    df.reset_index(inplace=True)
    mark = df[df[col] == max_value].index

    filename = col + '.png'
    #filepath = '/tmp/' + filename
    filepath = './' + filename

    plt.style.use('dark_background')
    plt.figure(figsize=[9.6,7.2])
    plt.title(title)
    plt.xticks(rotation=45)
    plt.plot(df['dt'], df[col], markevery=mark, marker='d', markersize=10, markeredgecolor='r', markerfacecolor='r')
    plt.savefig(filepath)

    s3 = boto3.client('s3')
    bucket_name = 'index-investor'
    s3.upload_file(filepath, bucket_name, filename)
    return filename + ' uploaded to s3'

lambda_handler('test', 'test')