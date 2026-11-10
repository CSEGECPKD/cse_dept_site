// /app/activity/events/eventsData.js
const upcomingEvents = [
    {
        id: 1,
        title: 'HACKZERO : A Hackathon for CSE Students',
        mode: 'Offline',
        date: 'July 30, 2026',
        time: '9:30 AM IST',
        platform: '',
        topics: ['Competitive Coding', 'Hackathon', 'Rapid Prototyping'],
        speakers: [],
        location: 'Offline - CB105 Lecture Hall',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: '',
        description:
            'An exclusive intra-departmental hackathon tailored for CSE students to foster experiential learning, technical creativity, and rapid prototyping capabilities. Participating teams collaborate under time constraints to design, code, and deploy innovative technological solutions.',
    },
    {
        id: 2,
        title: 'Research Paper Writing & Publishing Workshop',
        mode: 'Online',
        date: 'September 09, 2026',
        time: '7:00 PM IST',
        platform: 'Google Meet',
        topics: ['Academic Research', 'Paper Drafting', 'Journal Publishing'],
        speakers: [
            {
                name: 'Dr. Princy Ann Thomas',
                title: 'Associate Professor, Dept. of CSE',
            },
        ],
        location: 'Online - Google Meet',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: '',
        description:
            'An online expert session led by Dr. Princy Ann Thomas orienting students and aspiring researchers on academic paper drafting, literature review structuring, identifying suitable indexing journals, maintaining academic integrity, and navigating peer-review workflows.',
    },
];

const pastEvents = [
    {
        id: 1,
        title: 'CSE Association Inauguration 2026',
        description:
            'The formal inauguration of the Computer Science & Engineering Association for the academic year 2025-26 held at CSE UG Seminar Hall. Inaugurated by Prof. Helen K J (HoD, CSE) with presidential address by Principal Dr. K R Remesh Babu and roadmap presented by Association Chair Sabari S and Secretary Navami B R.',
        mode: 'Offline',
        date: 'March 17, 2026',
        time: '11:00 AM IST',
        platform: 'CSE UG Seminar Hall',
        topics: ['Association Inauguration', 'Department Roadmap'],
        speakers: [
            { name: 'Dr. K R Remesh Babu', title: 'Principal, GEC Palakkad' },
            { name: 'Prof. Helen K J', title: 'HoD, Dept. of CSE' },
        ],
        location: 'CSE UG Seminar Hall',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
    {
        id: 2,
        title: 'CSE 2022-26 Batch Farewell',
        description:
            'A formal farewell ceremony ("Tassels & Tears") hosted by the CSE Association to honor and celebrate the achievements, contributions, and memories of the graduating B.Tech batch of 2022–2026 at GEC Palakkad.',
        mode: 'Offline',
        date: 'March 27, 2026',
        time: '9:30 AM IST',
        platform: 'GEC Palakkad',
        topics: ['Farewell', 'Batch 2022-26'],
        speakers: [],
        location: 'GEC Palakkad',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
    {
        id: 3,
        title: 'Crack the GATE Exam',
        description:
            'A technical guidance session organized by the CSE Department featuring alumnus Shankar Vinayak (currently pursuing M.Tech at IIT Madras). Covered structural pattern of the GATE exam, syllabus priorities, subject-wise weightage, and time-management strategies.',
        mode: 'Online',
        date: 'March 30, 2026',
        time: '10:30 AM IST',
        platform: 'Google Meet',
        topics: ['GATE Preparation', 'Competitive Exams', 'IIT Admissions'],
        speakers: [
            {
                name: 'Shankar Vinayak',
                title: 'Alumnus, M.Tech at IIT Madras',
            },
        ],
        location: 'Online - Google Meet',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
    {
        id: 4,
        title: "Let's Git It - Git & GitHub Tutorial",
        description:
            'A technical workshop organized in collaboration with Void Minds, led by Muhammad Fahad. The session focused on the fundamentals of version control systems, repository initialization, commit tracking, branch management, and conflict resolution.',
        mode: 'Online',
        date: 'April 08, 2026',
        time: '7:00 PM IST',
        platform: 'Google Meet',
        topics: ['Git', 'GitHub', 'Version Control', 'Open Source'],
        speakers: [{ name: 'Muhammad Fahad', title: 'Void Minds Lead' }],
        location: 'Online - Google Meet',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
    {
        id: 5,
        title: 'GATEway to Opportunities: Awareness Session on GATE',
        description:
            'An expert-led awareness session featuring Prof. Soni P, Assistant Professor at GEC Thrissur, highlighting GATE as a gateway to postgraduate studies at premier institutions and recruitment in major PSUs.',
        mode: 'Online',
        date: 'May 29, 2026',
        time: '5:00 PM IST',
        platform: 'Google Meet',
        topics: ['GATE Awareness', 'PSU Recruitment', 'Higher Studies'],
        speakers: [
            {
                name: 'Prof. Soni P',
                title: 'Assistant Professor, GEC Thrissur',
            },
        ],
        location: 'Online - Google Meet',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
    {
        id: 6,
        title: 'Interview Preparation Session with GeeksforGeeks',
        description:
            'An online interview preparation workshop featuring Mallesham Devasane (Associate Director at GeeksforGeeks), covering technical interview readiness, algorithmic problem-solving techniques, and resume building.',
        mode: 'Online',
        date: 'July 26, 2026',
        time: '7:00 PM IST',
        platform: 'Google Meet',
        topics: ['Interview Preparation', 'Coding Rounds', 'Resume Building'],
        speakers: [
            {
                name: 'Mallesham Devasane',
                title: 'Associate Director at GeeksforGeeks',
            },
        ],
        location: 'Online - Google Meet',
        image: '/events/cse-association-execom-2026-27.jpg',
        registrationLink: null,
    },
];

export { upcomingEvents, pastEvents };
