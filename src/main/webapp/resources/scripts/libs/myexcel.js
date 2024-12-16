/// <reference path="../../types/js/js-myexcel.d.ts" />

/**
* @type {Excel}
*/
var MyExcel = {};


(function  ()  {
	var e = ["left", "right", "top", "bottom"];
	var t = ["LEFT", "CENTER", "RIGHT", "NONE"];
	var n = ["TOP", "CENTER", "BOTTOM", "NONE"];
	var r = {L: "left", C: "center", R: "right", T: "top", B: "bottom"};
	function o (e)  {
		var t = e.toString(16);
		return t.length == 1 ? "0" + t : t;
	}
	MyExcel.rgbToHex = function  (e, t, n)  {
		if (e == undefined || t == undefined || n == undefined) return undefined;
		return (o(e) + o(t) + o(n)).toUpperCase();
	};
	MyExcel.toExcelUTCTime = function  (e)  {
		var t = Math.floor(e.getTime() / 1e3);
		t = Math.floor(t / 86400) + 25569;
		var n = e.getUTCSeconds() + 60 * e.getUTCMinutes() + 60 * 60 * e.getUTCHours();
		var r = 60 * 60 * 24;
		return t + n / r;
	};
	MyExcel.toExcelLocalTime = function  (e)  {
		var t = Math.floor(e.getTime() / 1e3);
		t = Math.floor(t / 86400) + 25569;
		var n = e.getUTCSeconds() + 60 * e.getUTCMinutes() + 60 * 60 * e.getUTCHours();
		n = n - 60 * e.getTimezoneOffset();
		var r = 60 * 60 * 24;
		return t + n / r;
	};
	var s = [];
	s[0] = "General";
	s[1] = "0";
	s[2] = "0.00";
	s[3] = "#,##0";
	s[4] = "#,##0.00";
	s[9] = "0%";
	s[10] = "0.00%";
	s[11] = "0.00E+00";
	s[12] = "# ?/?";
	s[13] = "# ??/??";
	s[14] = "mm-dd-yy";
	s[15] = "d-mmm-yy";
	s[16] = "d-mmm";
	s[17] = "mmm-yy";
	s[18] = "h:mm AM/PM";
	s[19] = "h:mm:ss AM/PM";
	s[20] = "h:mm";
	s[21] = "h:mm:ss";
	s[22] = "m/d/yy h:mm";
	s[27] = "[$-404]e/m/d";
	s[30] = "m/d/yy";
	s[36] = "[$-404]e/m/d";
	s[37] = "#,##0 ;(#,##0)";
	s[38] = "#,##0 ;[Red](#,##0)";
	s[39] = "#,##0.00;(#,##0.00)";
	s[40] = "#,##0.00;[Red](#,##0.00)";
	s[44] = '_("$"* #,##0.00_);_("$"* (#,##0.00);_("$"* "-"??_);_(@_)';
	s[45] = "mm:ss";
	s[46] = "[h]:mm:ss";
	s[47] = "mmss.0";
	s[48] = "##0.0E+0";
	s[49] = "@";
	s[50] = "[$-404]e/m/d";
	s[57] = "[$-404]e/m/d";
	s[59] = "t0";
	s[60] = "t0.00";
	s[61] = "t#,##0";
	s[62] = "t#,##0.00";
	s[67] = "t0%";
	s[68] = "t0.00%";
	s[69] = "t# ?/?";
	s[70] = "t# ??/??";
	s[165] = "*********";
	var l = 166;
	MyExcel.formats = s;
	MyExcel.borderStyles = [
		"none",
		"thin",
		"medium",
		"dashed",
		"dotted",
		"thick",
		"double",
		"hair",
		"mediumDashed",
		"dashDot",
		"mediumDashDot",
		"dashDotDot",
		"mediumDashDotDot",
		"slantDashDot",
	];
	var i = [];
	for (let e = 0; e < MyExcel.borderStyles.length; e++)
		i.push(MyExcel.borderStyles[e].toUpperCase());
	var a =
		'<?xml version="1.0" ?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
		'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:mv="urn:schemas-microsoft-com:mac:vml" ' +
		'xmlns:mx="http://schemas.microsoft.com/office/mac/excel/2008/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" ' +
		'xmlns:x14="http://schemas.microsoft.com/office/spreadsheetml/2009/9/main" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" ' +
		'xmlns:xm="http://schemas.microsoft.com/office/excel/2006/main">' +
		"{columns}" +
		"<sheetData>{rows}</sheetData></worksheet>";
	function f (e)  {
		if (!e) return undefined;
		return e.constructor === Array ? e.slice() : undefined;
	}
	function m (e, t)  {
		var n = e.indexOf(t);
		if (n != -1) return n;
		e.push(t);
		return e.length - 1;
	}
	function c (e, t)  {
		e.push(t);
		return t;
	}
	function h (e, t)  {
		e.push(t);
		return e.length - 1;
	}
	function u (e, t, n)  {
		e[t] = n;
		return n;
	}
	function p (e)  {
		return (
			'<sheet state="visible" name="' + e.name + '" sheetId="' + e.id + '" r:id="' + e.rId + '"/>'
		);
	}
	function d (e, t)  {
		return (
			'<Relationship Id="' +
			e.rId +
			'" Target="worksheets/sheet' +
			t +
			'.xml" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet"/>'
		);
	}
	function g (e)  {
		return a.replace("{columns}", z(e.columns)).replace("{rows}", X(e.rows));
	}
	function x (e, t, n)  {
		this.name = e;
	}
	function v (e)  {
		return this.rows[e] ? this.rows[e] : u(this.rows, e, {cells: []});
	}
	function y (e)  {
		return this.columns[e] ? this.columns[e] : u(this.columns, e, {});
	}
	function b (e, t)  {
		var n = this.getRow(t).cells;
		return n[e] ? n[e] : u(n, e, {});
	}
	function N (e, t, n)  {
		if (t != undefined) e.v = t;
		if (n) e.s = n;
	}
	function w (e, t, n)  {
		if (t != undefined) e.wt = t;
		if (n) e.style = n;
	}
	function T (e, t, n)  {
		if (t && !isNaN(t)) e.ht = t;
		if (n) e.style = n;
	}
	function E ()  {
		var e = {
			sheets: [],
			add: function  (e)  {
				var t = {
					id: this.sheets.length + 1,
					rId: "rId" + (3 + this.sheets.length),
					name: e,
					rows: [],
					columns: [],
					getColumn: y,
					set: x,
					getRow: v,
					getCell: b,
				};
				return h(this.sheets, t);
			},
			get: function  (e)  {
				var t = this.sheets[e];
				if (!t) throw "Bad sheet " + e;
				return t;
			},
			rows: function  (e)  {
				if (e < 0 || e >= this.sheets.length)
					throw "Bad sheet number must be [0.." + (this.sheets.length - 1) + "] and is: " + e;
				return this.sheets[e].rows;
			},
			setWidth: function  (e, t, n, r)  {
				if (n) this.sheets[e].colWidths[t] = isNaN(n) ? n.toString().toLowerCase() : n;
				if (r) this.sheets[e].colStyles[t] = r;
			},
			toWorkBook: function  ()  {
				var e =
					'<?xml version="1.0" standalone="yes"?>' +
					'<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">' +
					"<sheets>";
				for (let t = 0; t < this.sheets.length; t++) e = e + p(this.sheets[t]);
				return e + "</sheets><calcPr/></workbook>";
			},
			toWorkBookRels: function  ()  {
				var e =
					'<?xml version="1.0" ?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
				e =
					e +
					'<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>';
				for (let t = 0; t < this.sheets.length; t++) e = e + d(this.sheets[t], t + 1);
				return e + "</Relationships>";
			},
			toRels: function  ()  {
				var e =
					'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
				e =
					e +
					'<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>';
				return e + "</Relationships>";
			},
			toContentType: function  ()  {
				var e =
					'<?xml version="1.0" standalone="yes" ?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default ContentType="application/xml" Extension="xml"/>';
				e =
					e +
					'<Default ContentType="application/vnd.openxmlformats-package.relationships+xml" Extension="rels"/>';
				e =
					e +
					'<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" PartName="/xl/workbook.xml"/>';
				e =
					e +
					'<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" PartName="/xl/styles.xml" />';
				for (let t = 1; t <= this.sheets.length; t++)
					e =
						e +
						'<Override ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" PartName="/xl/worksheets/sheet' +
						t +
						'.xml"/>';
				return e + "</Types>";
			},
			fileData: function  (e)  {
				for (let t = 0; t < this.sheets.length; t++) {
					e.file("worksheets/sheet" + (t + 1) + ".xml", g(this.sheets[t]));
				}
			},
		};
		return e;
	}
	function C (e)  {
		var e = e.split(";");
		return (
			"<font>" +
			(e[3].indexOf("B") > -1 ? "<b />" : "") +
			(e[3].indexOf("I") > -1 ? "<i />" : "") +
			(e[3].indexOf("U") > -1 ? "<u />" : "") +
			(e[1] != "_" ? '<sz val="' + e[1] + '" />' : "") +
			(e[2] != "_" ? '<color rgb="FF' + e[2] + '" />' : "") +
			(e[0] ? '<name val="' + e[0] + '" />' : "") +
			"</font>"
		);
	}
	function k (e)  {
		return (
			'<fill><patternFill patternType="solid"><fgColor rgb="FF' +
			e +
			'" /><bgColor indexed="64" /></patternFill ></fill>'
		);
	}
	function S (t)  {
		var n = "<border>";
		t = t.split(",");
		for (let s = 0; s < 4; s++) {
			var r = t[s].split(" ");
			n = n + "<" + e[s];
			if (r[0] == "NONE") n = n + "/>";
			else {
				var o = MyExcel.borderStyles[i.indexOf(r[0])];
				if (o)
					n =
						n +
						' style="' +
						o +
						'" >' +
						(r[1] != "NONE" ? '<color rgb="FF' + r[1].substring(1) + '" />' : "");
				else n = n + ">";
				n = n + "</" + e[s] + ">";
			}
		}
		return n + "<diagonal/></border>";
	}
	function I (e, t, n)  {
		return e.split(t).join(n);
	}
	function O (e, t, n)  {
		while (e.indexOf(t) != -1) e = I(e, t, n);
		return e;
	}
	function F (e)  {
		var t = "";
		if (e.align) {
			var n = r[e.align.charAt(0)];
			var o = r[e.align.charAt(1)];
			if (n || o) {
				t = "<alignment ";
				if (n) t = t + ' horizontal="' + n + '" ';
				if (o) t = t + ' vertical="' + o + '" ';
				t = t + " />";
			}
		}
		var s =
			'<xf numFmtId="' +
			e.format +
			'" fontId="' +
			e.font +
			'" fillId="' +
			e.fill +
			'" borderId="' +
			e.border +
			'" xfId="0" ';
		if (e.border != 0) s = s + ' applyBorder="1" ';
		if (e.format >= l) s = s + ' applyNumberFormat="1" ';
		if (e.fill != 0) s = s + ' applyFill="1" ';
		if (t != "") s = s + ' applyAlignment="1" ';
		s = s + ">";
		s = s + t;
		return s + "</xf>";
	}
	function D (e)  {
		e = O(e, "  ", " ");
		var t = ["_", "_", "_", "_"];
		var n = 0,
			r = e.split(" ");
		var o = [];
		while (r[0] && r[0] != "none" && isNaN(r[0]) && r[0].charAt(0) != "#") {
			o.push(r[0].charAt(0).toUpperCase() + r[0].substring(1).toLowerCase());
			r.splice(0, 1);
		}
		t[0] = o.join(" ");
		while (r[0] == "none") r.splice(0, 1);
		if (!isNaN(r[0])) {
			t[1] = r[0];
			r.splice(0, 1);
		}
		while (r[0] == "none") r.splice(0, 1);
		if (r[0] && r[0].length == 7 && r[0].charAt(0) == "#") {
			t[2] = r[0].substring(1).toUpperCase();
			r.splice(0, 1);
		}
		while (r[0] == "none") r.splice(0, 1);
		if (r[0] && r[0].length < 4) t[3] = r[0].toUpperCase();
		return t.join(";");
	}
	function R (e)  {
		if (!e) return "--";
		var e = O(e.toString(), "  ", " ").trim().toUpperCase().split(" ");
		if (e.length == 0) return "--";
		if (e.length == 1) e[1] = "-";
		return e[0].charAt(0) + e[1].charAt(0) + "--";
	}
	function U (e)  {
		e = O(e, "  ", " ").trim();
		var t = (e + ",NONE,NONE,NONE,NONE").split(",");
		var n = "";
		for (let e = 0; e < 4; e++) {
			t[e] = t[e].trim().toUpperCase();
			t[e] = ((t[e].substring(0, 4) == "NONE" ? "NONE" : t[e]).trim() + " NONE NONE NONE").trim();
			var r = t[e].split(" ");
			if (r[0].charAt(0) == "#") {
				r[2] = r[0];
				r[0] = r[1];
				r[1] = r[2];
			}
			n = n + r[0] + " " + r[1] + ",";
		}
		return n;
	}
	function A (e)  {
		var t = [],
			n = [],
			r = s.slice(0),
			o = [],
			i = [];
		var a = {
			add: function  (e)  {
				var s = {};
				if (e.fill && e.fill.charAt(0) == "#")
					s.fill = 2 + m(i, e.fill.toString().substring(1).toUpperCase());
				if (e.font) s.font = m(n, D(e.font.toString().trim()));
				if (e.format) s.format = m(r, e.format);
				if (e.align) s.align = R(e.align);
				if (e.border) s.border = 1 + m(o, U(e.border.toString().trim()));
				return 1 + h(t, s);
			},
		};
		if (!e) e = "Calibri Light 12 0000EE";
		a.add({font: e});
		a.register = function  (e)  {
			for (let n = 0; n < t.length; n++) {
				if (
					t[n].font == e.font &&
					t[n].format == e.format &&
					t[n].fill == e.fill &&
					t[n].border == e.border &&
					t[n].align == e.align
				)
					return n;
			}
			return h(t, e);
		};
		a.getStyle = function  (e)  {
			return t[e];
		};
		a.toStyleSheet = function  ()  {
			var e =
				'<?xml version="1.0" encoding="utf-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" ' +
				'xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
			e = e + '<numFmts count="' + (r.length - l) + '">';
			for (let t = l; t < r.length; t++)
				e = e + '<numFmt numFmtId="' + t + '" formatCode="' + r[t] + '"/>';
			e = e + "</numFmts>";
			e =
				e +
				'<fonts count="' +
				n.length +
				'" x14ac:knownFonts="1" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">';
			for (let t = 0; t < n.length; t++) e = e + C(n[t]);
			e = e + "</fonts>";
			e =
				e +
				'<fills count="' +
				(2 + i.length) +
				'"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill>';
			for (let t = 0; t < i.length; t++) e = e + k(i[t]);
			e = e + "</fills>";
			e =
				e +
				'<borders count="' +
				(1 + o.length) +
				'"><border><left /><right /><top /><bottom /><diagonal /></border>';
			for (let t = 0; t < o.length; t++) e = e + S(o[t]);
			e = e + "</borders>";
			e =
				e +
				'<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>';
			e =
				e +
				'<cellXfs count="' +
				(1 + t.length) +
				'"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />';
			for (let n = 0; n < t.length; n++) {
				e = e + F(t[n]);
			}
			e = e + "</cellXfs>";
			e =
				e + '<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>';
			e = e + '<dxfs count="0"/>';
			e = e + "</styleSheet>";
			return e;
		};
		return a;
	}
	var $ = /[&<>"']/g,
		_ = RegExp($.source);
	var M = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};
	function J (e)  {
		return function  (t)  {
			return e == null ? undefined : e[t];
		};
	}
	var B = J(M);
	function W (e)  {
		if (typeof e != "string") e = e + "";
		return e && _.test(e) ? e.replace($, B) : e;
	}
	function P (e)  {
		var t = Math.floor(e / 26) - 1;
		var n = t > -1 ? P(t) : "";
		return n + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(e % 26);
	}
	function L (e, t)  {
		return P(e) + t;
	}
	function j (e, t, n)  {
		var r = '<c r="' + L(t, n) + '"';
		if (e.s) r = r + ' s="' + e.s + '" ';
		if (isNaN(e.v)) return r + ' t="inlineStr" ><is><t>' + W(e.v) + "</t></is></c>";
		return r + "><v>" + e.v + "</v></c>";
	}
	function H (e, t)  {
		var n = t + 1;
		var r = [];
		for (let t = 0; t < e.cells.length; t++) {
			if (e.cells[t]) r.push(j(e.cells[t], t, n));
		}
		var o = '<row r="' + n + '" ';
		if (e.ht) o = o + ' ht="' + e.ht + '" customHeight="1" ';
		if (e.style) o = o + 's="' + e.style + '" customFormat="1"';
		return o + " >" + r.join("") + "</row>";
	}
	function X (e)  {
		var t = [];
		for (let n = 0; n < e.length; n++) {
			if (e[n]) {
				t.push(H(e[n], n));
			}
		}
		return t.join("");
	}
	function z (e)  {
		if (e.length == 0) return;
		var t = "<cols>";
		for (let r = 0; r < e.length; r++) {
			var n = e[r];
			if (n) {
				t = t + '<col min="' + (r + 1) + '" max="' + (r + 1) + '" ';
				if (n.wt == "auto") t = t + ' width="18" bestFit="1" customWidth="1" ';
				else if (n.wt) t = t + ' width="' + n.wt + '" customWidth="1" ';
				if (n.style) t = t + ' style="' + n.style + '"';
				t = t + " />";
			}
		}
		return t + "</cols>";
	}
	function G (e)  {
		return e !== null && typeof e === "object";
	}
	function Z (e, t)  {
		for (let o = 0; o < e.length; o++) {
			for (let r = 0; r < e[o].rows.length; r++) {
				var n = e[o].rows[r];
				if (n && n.style) {
					for (let e = 0; e < n.cells.length; e++) {
						if (n.cells[e]) q(n.cells[e], t, n.style);
					}
				}
			}
			for (let s = 0; s < e[o].columns.length; s++) {
				if (e[o].columns[s] && e[o].columns[s].style) {
					var r = e[o].columns[s].style;
					for (let l = 0; l < e[o].rows.length; l++) {
						var n = e[o].rows[l];
						if (n)
							for (let e = 0; e < n.cells.length; e++)
								if (n.cells[e] && e == s) q(n.cells[e], t, r);
					}
				}
			}
		}
	}
	function q (e, t, n)  {
		if (!e) return;
		if (!e.s) {
			e.s = n;
			return;
		}
		var r = t.getStyle(e.s - 1);
		var o = t.getStyle(n - 1);
		var s = {},
			l = false;
		for (let e in r) s[e] = r[e];
		for (let e in o) {
			if (!s[e]) {
				s[e] = o[e];
				l = true;
			}
		}
		if (!l) return;
		e.s = 1 + t.register(s);
	}
	MyExcel.newExcel = function  (e)  {
		var t = {};
		var n = E();
		var r = A(e);
		n.add("Sheet 0");
		t.addSheet = function  (e)  {
			if (!e) e = "Sheet " + n.length;
			return n.add(e);
		};
		t.addStyle = function  (e)  {
			return r.add(e);
		};
		t.set = function  (e, t, r, o, s)  {
			if (G(e)) return this.set(e.sheet, e.column, e.row, e.value, e.style);
			if (!e) e = 0;
			e = n.get(e);
			if (isNaN(t) && isNaN(r)) return e.set(o, s);
			if (!isNaN(t)) {
				if (!isNaN(r)) return N(e.getCell(t, r), o, s);
				return w(e.getColumn(t), o, s);
			}
			return T(e.getRow(r), o, s);
		};
		t.generate = function  (e)  {
			Z(n.sheets, r);
			var t = new JSZip();
			t.file("_rels/.rels", n.toRels());
			var o = t.folder("xl");
			o.file("workbook.xml", n.toWorkBook());
			o.file("styles.xml", r.toStyleSheet());
			o.file("_rels/workbook.xml.rels", n.toWorkBookRels());
			t.file("[Content_Types].xml", n.toContentType());
			n.fileData(o);
			t.generateAsync({type: "blob"}).then(function  (t)  {
				saveAs(t, e);
			});
		};
		return t;
	};
})();
