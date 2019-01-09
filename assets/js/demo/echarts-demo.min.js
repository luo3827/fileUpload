var xqlist="";
var zxxlist="";
var zzlist="";
var gdlist="";
var bmmc="";
var jb="";
var maptype="";
$(function() {
	bmmc=bmmc+"教育机构";
	if(jb=='province'){
		maptype=bmmc.substring(0,2);
	}
	var s = echarts.init(document.getElementById("echarts-map-chart")), c = {
		title : {
			text : bmmc,
			x : "center"
		},
		tooltip : {
			trigger : "item"
		},
		legend : {
			orient : "vertical",
			x : "left",
			data : [ "学前教育","中小学教育","中职教育","高等教育"]
		},
		visualMap: {
			        min: 0,
			        max: 2500,
			        left: 'left',
			        top: 'bottom',
			        text: ['高','低'],           // 文本，默认为数值文本
			        calculable: true
			    },
		toolbox : {
			show : !0,
			orient : "vertical",
			x : "right",
			y : "center",
			feature : {
				mark : {
					show : !0
				},
				dataView : {
					show : !0,
					readOnly : !1
				},
				restore : {
					show : !0
				},
				saveAsImage : {
					show : !0
				}
			}
		},
		series : [ {
			name : "学前教育",
			type : "map",
			mapType:maptype,
			roam : !1,
			itemStyle : {
				normal : {
					label : {
						show : !0
					}
				},
				emphasis : {
					label : {
						show : !0
					}
				}
			},
			data : eval(xqlist)
		},{
			name : "中小学教育",
			type : "map",
			mapType:maptype,
			roam : !1,
			itemStyle : {
				normal : {
					label : {
						show : !0
					}
				},
				emphasis : {
					label : {
						show : !0
					}
				}
			},
			data : eval(zxxlist)
		} ,{
			name : "中职教育",
			type : "map",
			mapType:maptype,
			roam : !1,
			itemStyle : {
				normal : {
					label : {
						show : !0
					}
				},
				emphasis : {
					label : {
						show : !0
					}
				}
			},
			data : eval(zzlist)
		},{
			name : "高等教育",
			type : "map",
			mapType:maptype,
			roam : !1,
			itemStyle : {
				normal : {
					label : {
						show : !0
					}
				},
				emphasis : {
					label : {
						show : !0
					}
				}
			},
			data : eval(gdlist)
		}]
	};
	s.setOption(c), $(window).resize(s.resize);
	

});
