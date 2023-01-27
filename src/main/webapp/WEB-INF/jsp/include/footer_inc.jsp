<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="footer">
	<p>&copy; 기초조사 정보플랫폼 관리자 시스템</p>
</div>
<form name="formGotoUsrPage">
	<input type="hidden" id="USER_ID" name="USER_ID" value="<%=session.getAttribute("USER_ID")%>"/>
	<input type="hidden" id="SESSION_YN" name="SESSION_YN" value="Y">
</form>
<div id="o2-dialog-01" class="body-area"></div>
<div id="o2-dialog-02" class="body-area"></div>
<div id="o2-dialog-03" class="body-area"></div>
<div id="o2-mng_dialog-01"></div>
<div id="o2-mng_dialog-02"></div>
<div id="o2-mng_dialog-03"></div>
<div id="o2-msgbox-01"></div>
<div id="o2-msgbox-abs"></div>
<div id="o2-changePwd-01"></div>

<div  id="confirm_popup" class="modal fade" role="dialog"></div>
<div  id="alert_popup" class="modal fade" role="dialog"></div>