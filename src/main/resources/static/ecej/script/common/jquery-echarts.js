/**
 * [description]
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
(function($){

	$.Echart = {
		init:function(options){
			// 获取图表
			var _echart = echarts.init($("#"+options.id).get(0));
			
			var defaults = {
				title:options.title,
				tooltip : {
			        trigger: options.type=="pie"?"item":"axis"
			    },
			    series:undefined,
			    legend:{
			    	data:options.seriesNames
			    }
			};

			// 饼图样式
			if(options.type == "pie"){
				defaults.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)";
				defaults.legend.orient = 'vertical';
        		defaults.legend.left = 'left';
        		defaults.title.x = 'center';
			}else{
				defaults.toolbox = options.toolbox?$.extend({
			    	show:true,
			    	feature : {
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line','bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    },options.toolbox):undefined;
				
				/*defaults.toolbox = options.toolbox?{
			    	show:true,
			    	feature : {
			            dataView : {show: true, readOnly: false},
			            magicType : {show: true, type: ['line','bar']},
			            restore : {show: true},
			            saveAsImage : {show: true}
			        }
			    }:undefined;*/
				defaults.xAxis = [
			        {
			            type : 'category',
			            data : options.xAxis
			        }
			    ];
			    defaults.yAxis = [{
			    	type:"value"
			    }];
			}
			

			// 初始化参数配置项
			var _series = [];

			if(options.seriesNames){
				var _serie = {};
				if(options.type == "pie"){
					_serie.itemStyle = {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		            _serie.name = options.title.topic?options.title.topic:options.title.subtext;
		            _serie.type = options.type
		            _serie.radius = '55%';
        			_serie.center = ['50%', '60%'];

        			var _datalist = [];
        			$.each(options.dataBody.datalist,function(index,data){
        				var _data = {};
        				
        				_data["value"] = data[options.dataBody.key];
        				_data["name"] = data[options.dataBody.text];
        				_datalist.push(_data);
        			});
        			_serie.data = _datalist;
        			_series.push(_serie);
				}else{
					$.each(options.seriesNames,function(index,data){
						_serie = {};
						_serie.name = data;
						_serie.type = options.type?options.type:"bar";
						_serie.data = options.datalist[index];
						_serie.smooth = true;
						if(options.averageLine){
							_serie.markLine = {
				                data : [
				                    {type : 'average', name : '平均值'}
				                ]
				            };
						}
						if(options.boundaryPoint){
							_serie.markPoint =  {
				                data : [
				                    {type : 'max', name: '最大值'},
				                    {type : 'min', name: '最小值'}
				                ]
				            };
						}
						_series.push(_serie);
					});
				}
				
			}
			
			defaults.series = _series;
			optionFlag = options.optionFlag;
			if(typeof(optionFlag) == 'undefined'){
				optionFlag = true;
			}
				
			_echart.setOption(defaults, optionFlag);
		}
	};
	
}(jQuery));