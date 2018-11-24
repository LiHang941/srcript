import requests
import json
import re


## bitcoin.conf : https://github.com/bitcoin/bitcoin/blob/master/share/examples/bitcoin.conf


## 获取所有的比特币节点

def get_all_data():
    url = "https://bitnodes.earn.com/api/v1/snapshots/"
    url = json.loads(requests.get(url).text)['results'][0]['url']
    return json.loads(requests.get(url).text)['nodes']


def to_conf(_list):
    s = ''
    for item in _list:
        s = s + ('addnode=' + item)
        s = s + "\n"
    return s


if __name__ == '__main__':
    nodes = get_all_data()

    _list = list(
        filter(lambda x: re.match("\d+\.\d+\.\d+\.\d+", x) is not None and nodes[x][7] == 'CN', nodes.keys()))

    with open('bitcoin.conf', 'w', encoding='UTF-8') as f2:
        f2.write(to_conf(_list))

    for item in _list:
        print(item, nodes[item])
