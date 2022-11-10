// 格式化日期: yyyy-MM-dd
function formatDate(date) {
	const year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	if (month < 10) {
		month = `0${month}`
	}
	if (day < 10) {
		day = `0${day}`
	}
	return (`${year}-${month}-${day}`)
}

// 格式化日期：yyyy-MM-dd hh:mm:ss
function formatDateTime(date) {
	const year = date.getFullYear()
	let month = date.getMonth() + 1
	let day = date.getDate()
	let hour = date.getHours()
	let minute = date.getMinutes()
	let second = date.getSeconds()
	if (month < 10) {
		month = `0${month}`
	}
	if (day < 10) {
		day = `0${day}`
	}
	hour = hour.toString().padStart(2, '0')
	minute = minute.toString().padStart(2, '0')
	second = second.toString().padStart(2, '0')
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

// 日期格式化为周几
function formatWeek(date) {
	const thisDay =  new Date(date).getDay()
	const weekDay = ['周日','周一','周二', '周三', '周四', '周五', '周六']  
    //注意getDay()的结果区间为0至6，0表示周日
	return weekDay[thisDay]
}

// 获取今日日期: yyyy-MM-dd
function getToday() {
	return formatDate(new Date())
}

// 获取昨日日期: yyyy-MM-dd
function getYesterday() {
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	return formatDate(new Date(year,month,day-1))
}

// 获取本周开始和结束日期: [yyyy-MM-dd, yyyy-MM-dd]
function getThisWeek() {
	// 1.创建Date对象
	const date = new Date()
	// 2.获取今日的年月日，及周几
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	const week = date.getDay()
	// 3.获取本周开始日期并格式化为yyyy-MM-dd格式
	const thisWeekStartDate = formatDate(new Date(year,month,day-week+1))  
    // 若本周开始日期为上月月底日期也无需担心，如new Date()中的参数为2022,3,-3,则此条语句会输出2022-03-28
	// 4.获取本周结束日期并格式化为yyyy-MM-dd格式
	const thisWeekEndDate = formatDate(new Date(year,month,day-week+7))
	const thisWeek = []
	thisWeek.push(thisWeekStartDate,thisWeekEndDate)
	// 5.返回结果
	return thisWeek
}

// 获取上周开始和结束日期: [yyyy-MM-dd, yyyy-MM-dd]
function getLastWeek() {
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth()
	const day = date.getDate()
	const week = date.getDay()
	const lastWeekStartDate = formatDate(new Date(year,month,day-week-6))
	const lastWeekEndDate = formatDate(new Date(year,month,day-week))
	const lastWeek = []
	lastWeek.push(lastWeekStartDate,lastWeekEndDate)
	return lastWeek
}

// 获取本月开始和结束日期: [yyyy-MM-dd, yyyy-MM-dd]
function getThisMonth() {
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth()
	const thisMonthStartDate = formatDate(new Date(year,month,1))
	const thisMonthEndDate = formatDate(new Date(year,month+1,0)) 
    // 下个月第0天表示本月最后一天
	const thisMonth = []
	thisMonth.push(thisMonthStartDate,thisMonthEndDate)
	return thisMonth
}

// 获取上月日期
function getLastMonth() {
	const date = new Date()
	const year = date.getFullYear()
	const month = date.getMonth()
	const lastMonthStartDate = formatDate(new Date(year,month-1,1))
	const lastMonthEndDate = formatDate(new Date(year,month,0)) 
    //本月第0天表示上个月最后一天
	const lastMonth = []
	lastMonth.push(lastMonthStartDate,lastMonthEndDate)
	return lastMonth
}

module.exports = {
	formatDate,
	formatDateTime,
	formatWeek,
	getToday,
	getYesterday,
	getThisWeek,
	getLastWeek,
	getThisMonth,
	getLastMonth,
}