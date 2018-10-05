<%@page import="com.xbsoft.comm.util.SysConstant"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
request.getSession().removeAttribute(SysConstant.USER_NAME);
out.println("1");
%>