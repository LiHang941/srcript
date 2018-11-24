import requests
import re
import os

# aria2启动脚本
# 自动获取BT节点并替换配置文件
# 配置文件务必添加 bt-tracker=

res = requests.get("https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt")
trackers = re.sub("\s+", ",", res.text.rstrip())
print(trackers)
dir_path = ''  # aria2 路径
file = dir_path + 'aria2.conf'
with open(file, 'r', encoding='UTF-8') as f1:
    content = re.sub("bt-tracker=.+", "bt-tracker=" + trackers, f1.read())
    print(content)
    with open(file, 'w', encoding='UTF-8') as f2:
        f2.write(content)

os.system('start /b ' + dir_path + 'aria2c.exe --conf-path=' + dir_path + 'aria2.conf')
