'����vbs�ű�����
'�����ļ� 2019.txt
'ʹ��
'����win+r -> ���� shell:startUp -> ���� �ļ��� -> ��vbs�ļ������·��
'·�����ʹ��""" ��Ϊ�е�·���д��ڿո�
'Ϊ���2018��ڼ��պ͹����Զ�ִ��ָ�������
'vbs �﷨ ��http://www.w3school.com.cn/vbscript/
'���� : http://lihang.xyz

'==========��Ҫ�޸ĵ����ݿ�ʼ=============

'�������������·��
workFilePath = array( _		
		"""C:\Program Files (x86)\Google\Chrome\Application\chrome.exe""" _	
		,"""C:\Program Files\JetBrains\IntelliJ IDEA 2018.3\bin\idea64.exe""" _
		,"""D:\Program Files (x86)\Tencent\QQ\Bin\QQScLauncher.exe""" _
		,"""D:\Program Files (x86)\Tencent\WeChat\WeChat.exe""" _
	)
	
	
'���սڼ��������ļ�
festivalFilePath = array( _		
		"""D:\Program Files (x86)\Tencent\QQ\Bin\QQScLauncher.exe""" _
		,"""D:\Program Files (x86)\Tencent\WeChat\WeChat.exe""" _
	)	
	
'�ڼ��������ļ�
festival = ".\2019.txt" 

'==========��Ҫ�޸ĵ����ݽ���=============

currentDate =Year(Date()) & Right("0" & Month(Date()), 2) & Right("0" & Day(Date()), 2) '��������� 20180210

Set fso = CreateObject("Scripting.FileSystemObject")
Set festivalFile=fso.OpenTextFile(festival,1)

DO While festivalFile.AtEndOfStream <> True
	lineStr= festivalFile.ReadLine 	
	if (currentDate = left(lineStr,8)) then 
		if (right(lineStr,1) = 0 and hour(now) >= 8 and hour(now) <= 16) then 
			'MsgBox "������"
			startUp(workFilePath) 
		else
			'MsgBox " 1 ��Ϣ�� �� 2 �ڼ���"
			startUp(festivalFilePath) 
		end if 
	end If
loop
festivalFile.close 
wscript.quit


'����ָ������ĳ���
sub startUp(startFiles)
	set ws=WScript.CreateObject("WScript.Shell") 
	For i=0 To UBound(startFiles)-LBound(startFiles)
		ws.Run startFiles(i)
	Next
end sub
