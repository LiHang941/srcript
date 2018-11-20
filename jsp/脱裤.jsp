<%--
  Created by IntelliJ IDEA.
  User: LiHang
  Date: 2017/9/9
  Time: 14:27
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="java.sql.*" %>
<%@ page import="java.io.PrintWriter" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>


<html>
<head>
    <title>Title</title>
</head>
<style>
    body{
        font: 400 16px/1.62 "Georgia", "Xin Gothic", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei", sans-serif;
    }
    input{
        width: 100%;
    }
    table{
        width: 100%;
    }
    table td{
        height: 50px;
    }
    textarea{
        width: 100%;
        height:100px;
    }

</style>
<body>

    <div style="width: 100%;margin: 0 auto;margin-top:50px;">
        <form action="<%=basePath%>sql.jsp?type=1" method="post">
            <table border="1" >
                <tr>
                    <td style="width: 10%"> driver</td>
                    <td style="width: 90%"> <input type="text" name="driver" value="com.mysql.jdbc.Driver"></td>
                </tr>
                <tr>
                    <td> url</td>
                    <td> <input type="text" name="url" value="jdbc:mysql://127.0.0.1:3306/teacher_manager?characterEncoding=UTF-8&autoReconnect=true&failOverReadOnly=false&zeroDateTimeBehavior=convertToNull"></td>
                </tr>
                <tr>
                    <td> 用户名</td>
                    <td> <input type="text" name="username" value="teacher-web"></td>
                </tr>
                <tr>
                    <td> 密码</td>
                    <td> <input type="text" name="password" value="tw7654321"></td>
                </tr>
                <tr>
                    <td> sql</td>
                    <td><textarea name="sql"></textarea></td>
                </tr>
                <tr>
                    <td>类型</td>
                    <td>
                        DML语句:<input type="radio" value="1" name="select" checked style="width: 10px">
                        DDL语句:<input type="radio" value="2" name="select" style="width: 10px">
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td><input type="submit"></td>
                </tr>

            </table>
        </form>
        <%
            String type = request.getParameter("type");
            if(type != null && type.equals("1")){
                Connection connection = null;
                Statement statement = null;
                ResultSet resultSet  = null;
                try {
                    String driver = request.getParameter("driver");
                    String username = request.getParameter("username");
                    String password = request.getParameter("password");
                    String url = request.getParameter("url");
                    String sql = request.getParameter("sql");
                    String select = request.getParameter("select");

                    Class.forName(driver);
                    connection = DriverManager.getConnection(url, username, password);
                    statement = connection.createStatement();
                    if (select.equals("1")) {
                        resultSet = statement.executeQuery(sql);
                        ResultSetMetaData metaData = resultSet.getMetaData();
                        StringBuilder sb = new StringBuilder();
                        sb.append("<table border=\"1\">");
                        sb.append("<tr>");
                        for (int i = 1; i < metaData.getColumnCount() + 1; i++) {
                            sb.append("<td>");
                            sb.append(metaData.getColumnName(i));
                            sb.append("(" + metaData.getColumnTypeName(i) + ")");
                            sb.append("</td>");
                        }
                        while (resultSet.next()) {
                            sb.append("<tr>");
                            for (int i = 1; i < metaData.getColumnCount() + 1; i++) {
                                sb.append("<td>");
                                sb.append(resultSet.getString(i));
                                sb.append("</td>");
                            }
                            sb.append("</tr>");
                        }
                        sb.append("</tr>");


                        sb.append("</table>");
                        PrintWriter writer = response.getWriter();
                        response.getWriter().println(sb.toString());
                        writer.flush();
                    }

                    if(select.equals("2")){
                        boolean execute = statement.execute(sql);
                        PrintWriter writer = response.getWriter();
                        response.getWriter().println("flag:" + execute);
                        writer.flush();
                    }
                }catch (Exception e){
                    PrintWriter writer = response.getWriter();
                    response.getWriter().println(e.toString());
                    writer.flush();
                }finally {
                    try{
                        if(resultSet!=null)
                            resultSet.close();
                        if(statement!=null)
                            statement.close();
                        if(connection!=null)
                            connection.close();
                    }catch (Exception e){
                        PrintWriter writer = response.getWriter();
                        response.getWriter().println(e.toString());
                        writer.flush();
                    }
                }
            }
        %>
    </div>

</body>
</html>
