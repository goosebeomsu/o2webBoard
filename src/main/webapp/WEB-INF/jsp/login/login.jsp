<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
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
						<input type="hidden" name="securedId" id="securedId" value="" />
						<input type="hidden" name="securedPassword" id="securedPassword" value="" />
					</form>
					<fieldset>
						<legend>로그인</legend>
						<input type="text" title="아이디" placeholder="아이디" id="userId" name="userId">
						<input type="password" title="비밀번호" placeholder="비밀번호" id="userPassword" name="userPassword">
						<button type="button" class="btn" id="userLoginButton">로그인</button>
					</fieldset>
		                <div class="check_info">
		                    <button type="button" class="btn" open-modal="pop-signup" id="btnOpenSignupPopup">회원가입</button>
		                </div>
		                <div class="copyright">
 		                    Ⓒ 기초조사 정보플랫폼. All rights reserved.
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