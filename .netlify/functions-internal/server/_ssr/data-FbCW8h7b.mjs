//#region node_modules/.nitro/vite/services/ssr/assets/data-FbCW8h7b.js
var students = [
	{
		id: "PRG240108",
		name: "Aarav Sharma",
		initials: "AS",
		department: "Computer Science",
		year: "3rd year",
		attendance: 48,
		grades: 38,
		backlogs: 3,
		missed: 6,
		fees: 1,
		engagement: 25,
		placement: 24
	},
	{
		id: "PRG240216",
		name: "Priya Patel",
		initials: "PP",
		department: "Mechanical Eng.",
		year: "2nd year",
		attendance: 55,
		grades: 42,
		backlogs: 3,
		missed: 5,
		fees: 1,
		engagement: 32,
		placement: 28
	},
	{
		id: "PRG240329",
		name: "Rohan Mehta",
		initials: "RM",
		department: "Electronics & Comm.",
		year: "3rd year",
		attendance: 58,
		grades: 45,
		backlogs: 3,
		missed: 5,
		fees: 0,
		engagement: 30,
		placement: 32
	},
	{
		id: "PRG240412",
		name: "Sneha Reddy",
		initials: "SR",
		department: "Computer Science",
		year: "2nd year",
		attendance: 61,
		grades: 48,
		backlogs: 2,
		missed: 4,
		fees: 1,
		engagement: 36,
		placement: 38
	},
	{
		id: "PRG240507",
		name: "Arjun Singh",
		initials: "AS",
		department: "Civil Engineering",
		year: "4th year",
		attendance: 63,
		grades: 52,
		backlogs: 2,
		missed: 4,
		fees: 0,
		engagement: 40,
		placement: 25
	},
	{
		id: "PRG240621",
		name: "Ananya Iyer",
		initials: "AI",
		department: "Computer Science",
		year: "3rd year",
		attendance: 72,
		grades: 64,
		backlogs: 1,
		missed: 2,
		fees: 0,
		engagement: 55,
		placement: 58
	},
	{
		id: "PRG240718",
		name: "Kabir Das",
		initials: "KD",
		department: "Mechanical Eng.",
		year: "2nd year",
		attendance: 92,
		grades: 86,
		backlogs: 0,
		missed: 0,
		fees: 0,
		engagement: 85,
		placement: 82
	},
	{
		id: "PRG240823",
		name: "Diya Nair",
		initials: "DN",
		department: "Civil Engineering",
		year: "4th year",
		attendance: 88,
		grades: 80,
		backlogs: 0,
		missed: 1,
		fees: 0,
		engagement: 78,
		placement: 75
	}
];
function riskFactors(s, attendance = s.attendance) {
	return [
		{
			name: "Low attendance",
			value: (100 - Math.min(100, Math.max(0, attendance))) * .3,
			weight: 30
		},
		{
			name: "Falling grades",
			value: (100 - s.grades) * .2,
			weight: 20
		},
		{
			name: "Uncleared backlogs",
			value: Math.min(s.backlogs / 3, 1) * 15,
			weight: 15
		},
		{
			name: "Missed assignments",
			value: Math.min(s.missed / 6, 1) * 10,
			weight: 10
		},
		{
			name: "Fee dues",
			value: s.fees * 10,
			weight: 10
		},
		{
			name: "Low engagement",
			value: (100 - s.engagement) * .1,
			weight: 10
		},
		{
			name: "Placement readiness",
			value: (100 - s.placement) * .05,
			weight: 5
		}
	];
}
function riskScore(s, attendance = s.attendance) {
	return Math.min(100, Math.max(0, Math.round(riskFactors(s, attendance).reduce((sum, f) => sum + f.value, 0))));
}
function riskLevel(score) {
	return score >= 60 ? "high" : score >= 35 ? "moderate" : "low";
}
var recommendations = [
	"Guardian outreach",
	"Peer tutoring",
	"Backlog clearance plan",
	"Faculty mentoring",
	"Fee counselling"
];
//#endregion
export { students as a, riskScore as i, riskFactors as n, riskLevel as r, recommendations as t };
