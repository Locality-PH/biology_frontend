import { COLORS } from 'constants/ChartConstant';

export const VisitorChartData = {
	series: [
	  {
		  name: "Session Duration",
		  data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
	  },
	  {
		  name: "Page Views",
		  data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
	  }
  ],
  categories:[
	  '01 Jan', 
	  '02 Jan', 
	  '03 Jan', 
	  '04 Jan', 
	  '05 Jan', 
	  '06 Jan', 
	  '07 Jan', 
	  '08 Jan', 
	  '09 Jan',
	  '10 Jan', 
	  '11 Jan', 
	  '12 Jan'
  ]
}

export const socialMediaReferralData = [
	{
		title: 'Facebook',
		data:  [{
			data: [12, 14, 2, 47, 42, 15, 47]
		}],
		percentage: 30.1,
		amount: 322
	},
	{
		title: 'Twitter',
		data:  [{
			data: [9, 32, 12, 42, 25, 33]
		}],
		percentage: 21.6,
		amount: 217
	},
	{
		title: 'Youtube',
		data:  [{
			data: [10, 9, 29, 19, 22, 9, 12]
		}],
		percentage: -7.1,
		amount: 188
	},
	{
		title: 'Linkedin',
		data:  [{
			data: [25, 66, 41, 89, 63, 25, 44]
		}],
		percentage: 11.9,
		amount: 207
		},
	{
		title: 'Dribbble',
		data:  [{
			data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
		}],
		percentage: -28.5,
		amount: 86
	}
]

export const AnnualStatisticData = [
	{
		title: 'Revenue',
		value:'$2,454', 
		status: -11.4,
		subtitle: `Compare to last year (2019)`
	},
	{
		title: 'Sales',
		value:'$6,982', 
		status: 8.2,
		subtitle: `Compare to last year (2019)`
	},
	{
		title: 'Costs',
		value:'$8,310', 
		status: 0.7,
		subtitle: `Compare to last year (2019)`
	}
]

export const weeklyRevenueData = {
	series: [
	  {
		name: 'Earning',
		data: [45, 52, 38, 24, 33, 26, 21]
	  }
	],
	categories:[
	  '08 Jul', 
	  '09 Jul', 
	  '10 Jul', 
	  '11 Jul', 
	  '12 Jul', 
	  '13 Jul', 
	  '14 Jul'
	]
}

export const topCampaignData = [
	{
		name: 'Tapat mo linis mo',
		image: '/img/thumbs/thumb-5.jpg',
		category: 'Environment',
		sales: 5930,
		status: 'up'
	},
	{
		name: 'Take care',
		image: '/img/thumbs/thumb-12.jpg',
		category: 'Health',
		sales: 5177,
		status: 'up'
	},
	{
		name: 'Sing along',
		image: '/img/thumbs/thumb-14.jpg',
		category: 'Sport',
		sales: 4701,
		status: 'up'
	},
	{
		name: 'Distance Dance',
		image: '/img/thumbs/thumb-6.jpg',
		category: 'Business',
		sales: 2833,
		status: 'up'
	},
	{
		name: 'Online Dating',
		image: '/img/thumbs/thumb-11.jpg',
		category: 'Technology',
		sales: 1692,
		status: 'up'
	},
]

export const customerChartData = [
	{
		name: 'Store Customers',
		data: [28, 25, 64, 40, 75, 45, 70]
	},
	{
		name: 'Online Customers',
		data: [25, 15, 41, 25, 44, 12, 36]
	}
]

export const sessionColor = [COLORS[0], COLORS[1], COLORS[3], COLORS[5]]
export const sessionData = [3561, 1443, 2462, 1693]
export const sessionLabels = ['Health', 'Sport', 'Environment', 'Business']
const jointSessionData = () => {
	let arr = []
	for (let i = 0; i < sessionData.length; i++) {
		const data = sessionData[i];
		const label = sessionLabels[i];
		const color = sessionColor[i]
		arr = [...arr, {
			data: data,
			label: label,
			color: color
		}]
	}
	return arr
}
export const conbinedSessionData = jointSessionData()

export const campaignListData = [
	{
		id: '1',
		name: 'Eileen Horton',
		image: '/img/avatars/thumb-1.jpg',
        campaignName: 'Tapat mo Linis mo',
		logo: '/img/thumbs/thumb-5.jpg',
		date: 1573430400,
		category: "Health",
		paymentStatus: 'Paid',
		orderStatus: 'Approved'
	},
	{
		id: '2',
		name: 'Terrance Moreno',
        image: '/img/avatars/thumb-2.jpg',
        campaignName: 'Sumba Dance',
		logo: '/img/thumbs/thumb-6.jpg',
		date: 1572393600,
		category: "Sport",
		paymentStatus: 'Paid',
		orderStatus: 'Approved'
	},
	{
		id: '3',
		name: 'Ron Vargas',
		image: '/img/avatars/thumb-3.jpg',
        campaignName: 'Covid Alis',
		logo: '/img/thumbs/thumb-3.jpg',
		date: 1593949805,
		category: "Health",
		paymentStatus: 'Paid',
		orderStatus: 'Pending'
	},
	{
		id: '4',
		name: 'Luke Cook',
		image: '/img/avatars/thumb-4.jpg',
        campaignName: 'Online Dating',
		logo: '/img/thumbs/thumb-2.jpg',
		date: 1579132800,
		category: "Technology",
		paymentStatus: 'Paid',
		orderStatus: 'Rejected'
	},
	{
		id: '5',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '6',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '7',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '8',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '9',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '10',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '11',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
	{
		id: '12',
		name: 'Joyce Freeman',
		image: '/img/avatars/thumb-5.jpg',
        campaignName: 'Clean and Green',
		logo: '/img/thumbs/thumb-10.jpg',
		date: 1591286400,
		category: "Environment",
		paymentStatus: 'Pending',
		orderStatus: 'Rejected'
	},
]