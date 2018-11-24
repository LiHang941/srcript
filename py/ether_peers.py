import requests
import os
import json
import re


# 获取以太坊节点
def get_data(length):
    url = "https://www.ethernodes.org/network/1/data?draw=1&columns[0][data]=id&order[0][column]=0&start=0&search[value]="
    params = {
        "length": length
    }
    return json.loads(requests.get(url, params).text)


def to_node_url(item):
    return "enode://" + item['id'] + '@' + item['host'] + ':' + str(item['port']);


def item_filter(_data, key, reg):
    return list(filter(lambda x: x[key] is not None and re.match(reg, str(x[key])) is not None, _data))


# 生成添加到Geth的代码
def get_peers(_data):
    _list = []
    for item in _data:
        _list.append(to_node_url(item))
    return _list


def get_peers_js(_list):
    return "for(var pp=" + json.dumps(_list) + ",i=0;i<pp.length;i++)console.log(admin.addPeer(pp[i]));"


if __name__ == '__main__':
    data = get_data(get_data(0)['recordsTotal'])['data']
    data = item_filter(data, "country", "China")
    data = item_filter(data, "host", "\d+\.\d+\.\d+\.\d+")
    print(data)
    _list = get_peers(data)
    js = get_peers_js(_list)

    with open('peer.js', 'w', encoding='UTF-8') as f2:
        f2.write(js)
    with open('static-nodes.json', 'w', encoding='UTF-8') as f2:
        f2.write(json.dumps(_list, sort_keys=True, indent=4, separators=(',', ':')))
