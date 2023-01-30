<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<c:set var="CONTEXTPATH" value="${pageContext.request.contextPath}" />

<script src="/js-package.js"></script>
<script src="/js-loader.js"></script>

<script>
    document.addEventListener("DOMContentLoaded", function (){
        o2web.common.CmmnEvent.DefaultEvent();
    })

</script>