<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<%@ include file="../include/header_inc.jsp"%>
</head>

<body>
	
	<div class="login-wrap">
	    <div class="login-box">
	        <div class="left">
				<h1>UDP</h1>
	        </div>       
	        <div class="right">
	            <h2>기초조사 정보플랫폼</h2>
	            <div class="login-content">
	            	<form id="securedLoginForm" name="loginForm" method="post" action="/login">
					<fieldset>
						<legend>로그인</legend>
						<input type="text" title="아이디" placeholder="아이디" id="userId" name="userId">
						<input type="password" title="비밀번호" placeholder="비밀번호" id="userPassword" name="userPwd">
						<button type="submit" class="btn" id="userLoginButton">로그인</button>
					</fieldset>
					</form>
					<div class="check_info">
						<div>
							<input type="checkbox" title="선택" id="idSaveCheck">
							<label for="idSaveCheck"><span></span>아이디 저장</label>
						</div>
					</div>
	            </div>
	        </div>
	        <!-- //right -->
	    </div>
	</div>

	<div id="o2-dialog-01" class="body-area"></div>
	<div  id="confirm_popup" class="modal fade" role="dialog"></div>

</body>


</html>