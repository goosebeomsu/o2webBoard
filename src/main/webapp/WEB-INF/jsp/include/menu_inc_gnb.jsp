<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%-- ==================================================================================== --%>
<%-- = 로고 / 유틸리티 메뉴 --%>
<%-- = 1단계 메뉴 --%>
<%-- ==================================================================================== --%>
<div class="header">
    <div class="inner">
        <h1>기초조사 정보플랫폼</h1>
        <h2>
            <a href="${CONTEXTPATH}">관리자 시스템</a>
        </h2>
        <div class="t-global">
            <span title="로그아웃" id="btnLogout" class="mngr-top-menu"><i class="logout"></i>로그아웃</span>
        </div>
        <!--// t-global-->
    </div>

    <div class="gnb">
        <div class="inner">
            <ul>
                <li class="topMenu1"><a href="${CONTEXTPATH}/board">시스템 관리</a></li>
                <li class="topMenu2"><a href="${CONTEXTPATH}/mngr/data">데이터 관리</a></li>
                <li class="topMenu3"><a href="${CONTEXTPATH}/mngr/sink">데이터 조회</a></li>
            </ul>
        </div>
    </div>
    <!--// gnb-->
</div>
