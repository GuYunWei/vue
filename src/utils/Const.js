export default {
	numToStr: ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'],
	dayOfWeek: [ '日', '一', '二', '三', '四', '五', '六'],
  appType: {
  	6516: {
			name: ['瞬时流量','累计流量','水表攻击状态','水表电池电压','输入电压','输出频率','输出电流','输出电压','输出功率','输出能量','反馈压力','出口压力','逆变温度','故障信息','水位埋深','管道压力','开关量','设备信息'],
			order: [0, 5, 10, 11, 6, 4, 8, 9],
			unit: ['（m³/h）','（m³）','','（V）','（V）','（Hz）','（A）','（V）','（KW）','（KWh）','（m）','（m）','（℃）','','（m）','（m）','',''],
			maxV: 528,
			minV: 323,
  	},
  	6212: {
			name: ['瞬时流量','累计流量','水位埋深','管道压力','开关量','设备信息','A相电压','B相电压','C相电压','A相电流','B相电流','C相电流','电功率','电能量'],
			order: [0, 3, 9, 6, 11, 8, 12, 13],
			unit: ['（m³/h）','（m³）','（m）','（m）','','','（V）','（V）','（V）','（A）','（A）','（A）','（KW）','（KWh）'],
			maxV: 460,
			minV: 330,
  	},
  	6213: {
			name: ['瞬时流量','累计流量','水位埋深','管道压力','开关量','设备信息','A相电压','B相电压','C相电压','A相电流','B相电流','C相电流','电功率','电能量'],
			order: [0, 3, 9, 6, 11, 8, 12, 13],
			unit: ['（m³/h）','（m³）','（m）','（m）','','','（V）','（V）','（V）','（A）','（A）','（A）','（KW）','（KWh）'],
			maxV: 460,
			minV: 330,
  	},
  }
}