'自启vbs脚本工具
'依赖文件 2019.txt
'使用
'按键win+r -> 输入 shell:startUp -> 弹出 文件夹 -> 把vbs文件放入该路径
'路径最后使用""" 因为有的路径中存在空格
'为你的2018年节假日和工作自动执行指定的软件
'vbs 语法 ：http://www.w3school.com.cn/vbscript/
'博客 : http://lihang.xyz

'==========需要修改的内容开始=============

'工作日自启软件路径
workFilePath = array( _		
		"""C:\Program Files (x86)\Google\Chrome\Application\chrome.exe""" _	
		,"""C:\Program Files\JetBrains\IntelliJ IDEA 2018.3\bin\idea64.exe""" _
		,"""D:\Program Files (x86)\Tencent\QQ\Bin\QQScLauncher.exe""" _
		,"""D:\Program Files (x86)\Tencent\WeChat\WeChat.exe""" _
	)
	
	
'节日节假日自启文件
festivalFilePath = array( _		
		"""D:\Program Files (x86)\Tencent\QQ\Bin\QQScLauncher.exe""" _
		,"""D:\Program Files (x86)\Tencent\WeChat\WeChat.exe""" _
	)	
	
'节假日数据文件
festival = ".\2019.txt" 

'==========需要修改的内容结束=============

currentDate =Year(Date()) & Right("0" & Month(Date()), 2) & Right("0" & Day(Date()), 2) '当天的日期 20180210

Set fso = CreateObject("Scripting.FileSystemObject")
Set festivalFile=fso.OpenTextFile(festival,1)

DO While festivalFile.AtEndOfStream <> True
	lineStr= festivalFile.ReadLine 	
	if (currentDate = left(lineStr,8)) then 
		if (right(lineStr,1) = 0 and hour(now) >= 8 and hour(now) <= 16) then 
			'MsgBox "工作日"
			startUp(workFilePath) 
		else
			'MsgBox " 1 休息日 、 2 节假日"
			startUp(festivalFilePath) 
		end if 
	end If
loop
festivalFile.close 
wscript.quit


'启动指定数组的程序
sub startUp(startFiles)
	set ws=WScript.CreateObject("WScript.Shell") 
	For i=0 To UBound(startFiles)-LBound(startFiles)
		ws.Run startFiles(i)
	Next
end sub
