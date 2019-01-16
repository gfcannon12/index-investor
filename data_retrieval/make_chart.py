def lambda_handler(event, context):
    import platform
    import os
    import datetime
    import boto3
    import pandas as pd
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
    mrd_str = df.loc[df['dt'] == most_recent_day, 'date'].values[0]
    year_ago = most_recent_day - datetime.timedelta(days=365)
    max_value = df[col].max()
    max_df = df[df[col] == max_value]
    max_dt = max_df['dt'].values[0]
    max_dt_dt = datetime.datetime.utcfromtimestamp(max_dt.tolist()/1e9)
    
    if max_dt_dt > year_ago:
        chart_start = year_ago
        title = col_name + ' LAST 365 DAYS'
    else:
        chart_start = max_dt
        title = col_name + ' SINCE ALL-TIME HIGH'
    
    
    df = df[df['dt'] >= chart_start]
    df.reset_index(inplace=True)
    mark = df[df[col] == max_value].index
    
    filename = col + '_' + mrd_str + '.png'
    if platform.system() == 'Darwin':
        print('running locally')
        filepath = './' + filename
    else:
        print('running on Lambda')
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

lambda_handler('test', 'test')