<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%-- ==================================================================================== --%>
<%-- = 사이드바 --%>
<%-- ==================================================================================== --%>
<div class="snb">
    <h3>
        <!-- 사이트바 title -->
    </h3>
    <div class="box">


        <!-- 시스템 관리 사이드바 -->
        <ul class="ulSide" id="sideMenu1">
            <li class="on"><a href="${CONTEXTPATH}/board" class="menu_sys_brd">게시판 관리</a></li>
        </ul>

        <!-- 데이터 관리 사이드바 -->
        <ul class="ulSide" id="sideMenu2">
            <li class="on"><a href="${CONTEXTPATH}/mngr/data/groupCd" class="menu_data_groupCd">데이터 그룹코드 관리</a></li>
            <li><a href="${CONTEXTPATH}/mngr/data/code" class="menu_data_code">데이터 코드 관리</a></li>
            <li><a href="${CONTEXTPATH}/mngr/data/grp" class="menu_data_grp">데이터 그룹 관리</a></li>
            <li><a href="${CONTEXTPATH}/mngr/data/meta" class="menu_data_meta">데이터 관리</a></li>
            <li><a href="${CONTEXTPATH}/mngr/data/inout" class="menu_data_inout">데이터 입출력</a></li>
        </ul>

        <!-- 연계 관리 사이드바 -->
        <ul class="ulSide" id="sideMenu3">
            <li class="on two-line"><a href="${CONTEXTPATH}/mngr/sink/kras" class="menu_sink_kras">부동산종합공부시스템(KRAS)</a></li>
            <li><a href="${CONTEXTPATH}/mngr/sink/saeol" class="menu_sink_saeol">새올행정(NTIS)</a></li>
        </ul>

        <!-- 이력조회 사이드바 -->
        <ul class="ulSide" id="sideMenu4">
            <li class="on"><a href="${CONTEXTPATH}/mngr/history/conn" class="menu_history_conn">접속 이력조회</a></li>
            <li><a href="${CONTEXTPATH}/mngr/history/upload" class="menu_history_upload">업로드 이력조회</a></li>
            <li><a href="${CONTEXTPATH}/mngr/history/download" class="menu_history_download">다운로드 이력조회</a></li>
        </ul>
    </div>
</div>
<!--// snb-->