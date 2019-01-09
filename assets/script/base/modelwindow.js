

var color = '';
//系统功能模块
var ModalconObj_XTGN = GetModalCon([
	["学员信息", "sort", [
		["input", "学员姓名" + color, "input", "Sm_name", [],"required email"],
		["select", "性别" + color, "select", "Sm_sex", [],"required","base_getSelect.do?zdbh=090001"],
		["select", "国籍" + color, "select", "Sm_nationality", [
			["中国", "china"],
			["中国香港", "HongKong"],
			["中国澳门", "Macao"],
			["中国台湾", "Taiwan"]
		],"required"],
		["select", "证件类型" + color, "select", "Sm_cardtype", [
			["身份证", "IDCARD"]
		],"required"],
		["input", "证件号" + color, "input", "Sm_cardnum", [],"required"],
		["dayinput", "身份证有效期", "dayinput", "Sm_cardvaliddate", [],"date"],
		["input", "户籍所在地" + color, "input", "Sm_censusregister", [],"required"],
		["input", "手机号码" + color, "input", "Sm_mobile", [],"required"],
		["input", "联系地址" + color, "input", "Sm_address", [],"required"],
		["dayinput", "出生日期", "dayinput", "Sm_birthday", [],"required date"],
		["input", "暂住证号", "input", "Sm_tempcardno", [],"required"],
		["dayinput", "报名时间" + color, "dayinput", "Sm_signuptime", [],"required"]
	]],
	["其他信息", "sort", [
		["select", "招生点", "select", "Sm_brcrecruit", [],"required"],
		["select", "学员类型", "select", "Sm_stutype", [
			["VIP类", "VIP"],
			["商务类", "BUSINESS"],
			["普通类", "COMMON"]
		],"required"],
		["select", "报名教练", "select", "Sm_id", [],"required"],
		["select", "业务类型" + color, "select", "Sm_busitype", [
			["初领", "FIRSTLIC"],
			["增领", "INCREASELIC"]
			//,["其他", "OTHER"]
		],"required"],
		["input", "驾驶证号", "input", "Sm_drilicnum", [],"required"],
		["dayinput", "驾驶证初领日期", "dayinput", "Sm_fstdrilicdate", [],"required"],
		["select", "原准驾车型", "select", "Sm_perdritype", [
			["未缴费", "FALSE"],
			["已缴费", "TRUE"]
		],"required"],
		["select", "培训车型" + color, "select", "Sm_traintype", [
			["未缴费", "FALSE"],
			["已缴费", "TRUE"]
		],"required"],
		["select", "收费标准", "select", "Sm_brccharge", [],"required"],
		["input", "金额", "input", "Sm_money", [],"required"],
		["select", "缴费标记", "select", "Sm_ispayed", [
			["未缴费", "FALSE"],
			["已缴费", "TRUE"]
		],"required"],
		["select", "招生渠道", "select", "Sm_rc", [],"required"]
	]]
]);


//系统参数模块
var ModalconObj_XTCS = GetModalCon([
	["系统参数", "sort", [
		["input", "编码" + color, "input", "xtcs_bm", [],"required"],
		["input", "名称" + color, "input", "xtcs_mc", [],"required"],
		["input", "参数值" + color, "input", "xtcs_csz", [],"required"],
		["textarea", "备注" + color, "textarea", "xtcs_bz", [],"required"],
		["inputradio", "状态" + color, "radio", "xtcs_zt", [
			["启用", "1"],
			["禁用", "0"]
			
		],"required"]
	]]
]);
