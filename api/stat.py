import json
import pickle
import subprocess
import time
from functools import reduce

import pandas as pd
from loguru import logger

import app_properties
from dbutils import redis_client

# failed_data = pd.DataFrame([['source', 'tag', 'type', 'direction']])

command = 'xray api statsquery --server' + ' '


def add_unit(value):
    units = ['B', 'KB', 'MB', 'GB', 'TB']
    unit_index = 0
    while value >= 1024 and unit_index < len(units) - 1:
        value /= 1024
        unit_index += 1
    return f"{value:.2f} {units[unit_index]}"


def fetch_stats(server):
    pipe = redis_client.pipeline()
    try:
        logger.debug(f'[{server}] fetch stats')
        data = json.loads(subprocess.check_output(command + server, shell=True))
        df = pd.DataFrame(data.get('stat'))
        df[['source', 'tag', 'type', 'direction']] = df['name'].str.split('>>>', expand=True)
        df = df.drop('name', axis=1)
        df['update_time'] = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
        df_binary = pickle.dumps(df)
        pipe.multi()
        pipe.set(server, df_binary)
        pipe.set(f'{server}:time', time.time())
        pipe.execute()
        return True
    except Exception as e:
        pipe.reset()
        logger.error(e)
        # traceback.print_exc()
    finally:
        pipe.close()
    return False


def get_stats(servers):
    dfs = []
    i = 0
    while i < len(servers):
        server = servers[i].strip()
        try:
            update_time = redis_client.get(f'{server}:time')
            if update_time:
                if time.time() - float(update_time.decode('utf-8')) < app_properties.interval:
                    logger.debug(f'[{server}] valid cache')
                    data = redis_client.get(server)
                    if data:
                        logger.debug(f'[{server}] shot cache')
                        df = pd.DataFrame(pickle.loads(data))
                        dfs.append(df)
                        i += 1
                        continue
            if not fetch_stats(server):
                i += 1
        except Exception as e:
            # traceback.print_exc()
            logger.error(e)
            # dfs.append(failed_data)
    if not dfs:
        return pd.DataFrame()
    result = reduce(lambda x, y: pd.concat([x, y], ignore_index=True), dfs)
    result['value'] = pd.to_numeric(result['value'])
    result['value'] = result['value'].apply(add_unit)
    return result
