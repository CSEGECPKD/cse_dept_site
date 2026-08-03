// /app/activity/events/eventsData.js
const upcomingEvents = [
  {
    id: 1,
    title: "IDEA INTO PRODUCT",
    mode: "Offline",
    date: "October 26, 2024",
    time: "11 AM IST",
    platform: " ",
    topics: ["UI/UX Designing", "Ideas  for product"],
    speakers: [{ name: "Rajesh E M", title: "LEAD UI/UX Designer" }],
    location: "Offline  - PG Seminar Hall",
    image: "/ideaintoproduct.jpeg",
    registrationLink: "https://example.com/register",
    description:
      "Having a great idea is just the beginning. The real challenge is transforming that idea into a market-ready product. ALGORHYTHM'24 will help you to turn them into reality , Idea Into Product, led by Rajesh EM, Lead UI/UX Designer at Speridian Technologies.",
  },
  {
    id: 2,
    title: "HARDWARE AND PROJECT EXPO",
    mode: "Offline",
    date: "October 26, 2024",
    time: "11:30 AM IST",
    platform: " ",
    topics: ["Hardware Expo", "ML Project Expo"],
    speakers: [],
    location: "Offline  - Room No : 108",
    image: "/expo.jpeg",
    registrationLink: "https://example.com/register",
    description:
      "Catch the buzz at our Project Expo by ALGORHYTHM'24 featuring the ML Learning Group and Void Minds ! Check out the projects that are set to shake things up. ",
  },
  {
    id: 3,
    title: "CODE RELAY",
    mode: "Offline",
    date: "October 26, 2024",
    time: "10:00 AM IST",
    platform: " ",
    topics: ["Competition", "Network", "Coding"],
    speakers: [],
    location: "Offline  - Network Lab",
    image: "/coderelay.jpeg",
    registrationLink: "https://example.com/register",
    description:
      "ALGORHYTHM'24 is set to ignite your coding skills with an epic Code Relay on 26th October  ",
  },
  {
    id: 4,
    title: "Natural Language Processing",
    description:
      "Dive deep into the world of NLP with hands-on sessions and case studies on real-world applications.",
    mode: "Online",
    date: "November 15, 2024",
    time: "6:00 PM IST",
    platform: "Microsoft Teams",
    topics: [
      "Text Processing Techniques",
      "Sentiment Analysis",
      "Language Models and Transformers",
      "Speech Recognition",
    ],
    speakers: [
      { name: "Dr. Amy Farrah Fowler", title: "NLP Specialist, AI University" },
      { name: "Raj Patel", title: "AI Researcher, NLP Labs" },
    ],
    location: "Online - Microsoft Teams",
    image: "/activity_nlp.png",
    registrationLink: "https://example.com/register",
  },
];

const pastEvents = [
  {
    id: 1,
    title: "Big Data Analytics Conference",
    description:
      "A deep dive into big data technologies, tools, and strategies for turning data into actionable insights.",
    mode: "Onsite",
    date: "May 20, 2024",
    time: "9:00 AM IST",
    platform: "Onsite Only",
    topics: [
      "Introduction to Big Data",
      "Data Warehousing",
      "Real-time Data Processing",
      "Big Data in Cloud",
    ],
    speakers: [
      { name: "George R.R. Data", title: "Data Architect, BigDataCo" },
      { name: "Sara Connor", title: "Data Engineer, FutureTech" },
    ],
    location: "Tech Convention Center, Main Hall",
    image: "/activity_bigdata.png",
    registrationLink: null, // Past event, no registration
  },
  {
    id: 2,
    title: "AI for Business Leaders",
    description:
      "A strategic look at how AI can drive business innovation and create competitive advantages.",
    mode: "Hybrid",
    date: "June 12, 2024",
    time: "3:00 PM IST",
    platform: "Webex & Onsite",
    topics: [
      "AI in Business Strategy",
      "Operationalizing AI",
      "Case Studies in AI Deployment",
      "Ethical AI in Business",
    ],
    speakers: [
      { name: "Michael Stevens", title: "AI Consultant, InnovateAI" },
      { name: "Nancy Drew", title: "COO, BusinessAI Solutions" },
    ],
    location: "Business Convention Center, Room 203 & Online",
    image: "/activity_aibusiness.png",
    registrationLink: null, // Past event, no registration
  },
  {
    id: 3,
    title: "Robotics and AI",
    description:
      "Explore the intersection of robotics and AI, with demonstrations and insights from industry experts.",
    mode: "Onsite",
    date: "July 15, 2024",
    time: "11:00 AM IST",
    platform: "Onsite Only",
    topics: [
      "Robotics Fundamentals",
      "AI in Robotics",
      "Autonomous Systems",
      "Human-Robot Interaction",
    ],
    speakers: [
      {
        name: "Isaac Asimov",
        title: "Professor of Robotics, SciTech University",
      },
      { name: "Robo Cop", title: "Head of Robotics, RoboTech" },
    ],
    location: "Robotics Institute, Auditorium",
    image: "/activity_robotics.png",
    registrationLink: null, // Past event, no registration
  },
  {
    id: 4,
    title: "AI Ethics Symposium",
    description:
      "A forum to discuss the ethical implications of AI and how to ensure responsible AI development.",
    mode: "Online",
    date: "August 10, 2024",
    time: "2:00 PM IST",
    platform: "Google Meet",
    topics: [
      "Introduction to AI Ethics",
      "Bias in AI",
      "Transparency and Explainability",
      "Future of AI Ethics",
    ],
    speakers: [
      { name: "Dr. Eliza Doolittle", title: "Ethics Researcher, AI Society" },
      { name: "Mark Twain", title: "Philosopher and AI Ethicist" },
    ],
    location: "Online - Google Meet",
    image: "/activity_aiethics.png",
    registrationLink: null, // Past event, no registration
  },
];

export { upcomingEvents, pastEvents };
