import json

from flask import Blueprint, request

import app_properties
from api import stat

api_blueprint = Blueprint('api_blueprint', __name__)


@api_blueprint.get('/servers')
def servers():
    ss = [{'label': server.get('alias'), 'value': i} for i, server in enumerate(app_properties.servers.values())]
    return {
        'status': 0,
        'data': ss
    }


@api_blueprint.get('/stats')
def stats():
    args = request.args
    server_keys = list(app_properties.servers.keys())
    servers = [server_keys[int(i)] for i in str(args.get('servers')).split(',')] if args.get('servers') else list(
        app_properties.servers.keys())
    dataframe = stat.get_stats(servers)
    rows = [] if dataframe.empty else json.loads(dataframe.to_json(orient='records'))
    return {
        'status': 0,
        'data': {"rows": rows}
    }
