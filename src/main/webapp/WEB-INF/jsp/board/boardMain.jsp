<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="utf-8" isELIgnored="false"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>boardMain</title>
    <%@ include file="../include/header_inc.jsp"%>
</head>
<body>
<div id="wrap">
    <%@include file="../include/menu_inc_gnb.jsp" %>
        <div id="container">
            <div class="inner">
                <%-- 사이드바 설정 --%>
                <%@include file="../include/menu_inc_side.jsp" %>

                <div class="content-body">
                    <div class="title">
                        <h3>게시판 관리</h3>
                    </div>
                    <div class="body-inner" id="sysBrdMng_page">


                        <ul class ="tabs sysMng mb15">
                            <li class="category_tab01 On" id ="BRD001">공지사항</li>
                            <li class="category_tab03" id ="BRD003">자료실</li>
                        </ul>
                        <div class="filter">
                            <div class="form-group sysMng">
                                <div class="line-form">
                                    <div class="select-box">
                                        <select title="검색" id="SEARCH_TYPE" class="w95">
                                            <!--                                         <option value="">선택</option> -->
                                            <option value="BRD_TITLE">제목</option>
                                            <option value="REG_USR">작성자</option>
                                        </select>
                                    </div>
                                    <input type="text" id="SEARCH_VAL" title="검색어" placeholder="검색어를 입력해 주세요." style="width: 645px;">
                                </div>
                            </div>

                            <div class="r-btn">
                                <button type="button" class="btn btnGrpCdReset">초기화</button>
                                <button type="button" class="btn blue btnGrpCdSearch">검색</button>
                            </div>
                        </div>
                        <!--// filter -->

                        <div class="r-btn mb15">
                            <button type="button" class="btn blue btnGrpCdAdd" id="add">추가</button>
                            <button type="button" class="btn btnGrpCdDel">선택삭제</button>
                        </div>
                        <!--// button -->

                        <table class="table list skipTextTable" id="tblSysbrdList">
                            <caption>검색결과</caption>
                            <colgroup>
                                <col width="5%">
                                <col width="5%">
                                <col width="45%">
                                <col width="10%">
                                <col width="15%">
                                <col width="10%">
                                <col width="10%">
                            </colgroup>
                            <thead>
                            <tr>
                                <th><input type="checkbox" title="선택" id="ckbrdValAll" >
                                    <label for="ckbrdValAll"></label></th>
                                <th>번호</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>등록일</th>
                                <th>조회수</th>
                                <th>편집</th>
                            </tr>
                            </thead>
                            <tbody id="DataTablelist">
                            <!-- // group code list content -->
                            </tbody>
                        </table>

                        <div class="listbottom position-relative">
                        <span class="total-cnt mr10">전체 <strong class="strTotalCnt">0</strong>건
                        </span>
                            <!--// Total -->

                            <!-- paging -->
                            <div class="o2udp-paging paging"></div>
                        </div>

                    </div>
                    <!-- body-inner -->
                </div>
                <!--//본문 content-body-->
            </div>
            <%@include file="../include/footer_inc.jsp" %>

</div>
</body>
</html>