window.onload = function (){


    document.querySelector("#add").addEventListener("click", renderNoticeForm);

    function renderNoticeForm() {

        document.querySelector('#o2-dialog-01').innerHTML = getNoticeFormHtml();

        tinymce.init({
            selector: '#o2-dialog-01'
        })

    }

    function getNoticeFormHtml() {
        return
        `<!DOCTYPE html>
<div class="contents brdpop" id="boardAdd">
    <h3>내용</h3>
    <table class="table form">
        <caption>게시판 보기</caption>
        <colgroup>
            <col width ="20%">
            <col width ="80%">
        </colgroup>
        <tbody>
        <tr id="">
            <th class="bullet">제목</th>
            <td><input type="text" id = "Title" class="wfull" value="" placeholder="제목을  입력해주세요" title="제목"/></td>
        </tr>
        <tr id="">
            <th>내용</th>
            <td  class="p-0">
                <div class="h300 overflow-y editor-cont" id="detail_cont"></div>
            </td>
        </tr>


        </tbody>
    </table>
</div>`
    }

}