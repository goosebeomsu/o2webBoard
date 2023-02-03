$(function() {
	"use strict";

	let _class = {

		rendererPageInfo : function(option, callback) {

			let _self = this;
			let dom = $(option.DOM_ID);
			dom.empty();

			if (option.TOTAL_CNT != 0) {

				let totalPageNo = Math.ceil(option.TOTAL_CNT / option.ROW_SIZE);

				let pageGroup = Math.ceil(option.pageNo / option.pageCountOfGroup);
				let endPageGroup = Math.ceil(totalPageNo / option.pageCountOfGroup);

				let startPageOfGroup = (pageGroup - 1) * option.pageCountOfGroup + 1;
				let endPageOfGroup = pageGroup * option.pageCountOfGroup;
				endPageOfGroup = endPageOfGroup > totalPageNo ? totalPageNo : endPageOfGroup;

				let startRowNum = (option.pageNo - 1) * option.ROW_SIZE + 1;
				let endRowNum = option.pageNo * option.ROW_SIZE;
				endRowNum = endRowNum > option.TOTAL_CNT ? option.TOTAL_CNT : endRowNum;

				let html = "<a class='page first' title='처음'>First</a>";
				html += "<a class='page prev' title='이전'>Previous</a>";

				for (let i = startPageOfGroup; i <= endPageOfGroup; i++) {
					if (option.pageNo == i) {
						html += "<a class='current' title='" + i + "'>" + i + "</a>";
					} else {
						html += "<a class='page-num' title='" + i + "'>" + i + "</a>";
					}
				}

				html += "<a class='page next' title='다음'>Next</a>";
				html += "<a class='page last' title='마지막'>Last</a>";

				dom.html(html);

				// FIRST
				dom.find("a.first").on("click", function(e) {
					if (option.pageNo > 1) {
						let pageNo = 1;
						option.pageNo = pageNo;

						_self.rendererPageInfo(option, callback);
						callback(pageNo);
					}
				});

				// PREV
				dom.find("a.prev").on("click", function(e) {
					let currentNo = dom.find("a.current").text();
					if(currentNo > 1){
						currentNo --;
						option.pageNo = currentNo;

						_self.rendererPageInfo(option, callback);
						callback(currentNo);
					}
				});

				// NEXT
				dom.find("a.next").on("click", function(e) {
					let currentNo = dom.find("a.current").text();
					if(currentNo < totalPageNo){
						currentNo ++;
						option.pageNo = currentNo;

						_self.rendererPageInfo(option, callback);
						callback(currentNo);
					}
				});

				// LAST
				dom.find("a.last").on("click", function(e) {
					if (option.pageNo < totalPageNo) {
						let pageNo = totalPageNo;
						option.pageNo = pageNo;

						_self.rendererPageInfo(option, callback);
						callback(pageNo);
					}
				});

				// PAGE
				dom.find("a.page-num").on("click", function(e) {
					let pageNo = $(this).text();
					pageNo = Number(pageNo);
					option.pageNo = pageNo;

					_self.rendererPageInfo(option, callback);
					callback(pageNo);
				});

			}

		}
	}

	o2web.utils = Object.assign(o2web.utils || {}, {
		PageRenderer : _class
	})

});