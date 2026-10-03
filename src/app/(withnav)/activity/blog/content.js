import { IoPersonCircle } from "react-icons/io5";

export const data = [
  {
    id: 1,
    img: "/blog.jpg",
    head: "Binary to Decimal Conversion",
    content: `Hi!

How do you convert a binary number to a decimal?

Say, 1011001110010001:

What I used to do looked like this:

1 * 2 ^ 0 +
0 * 2 ^ 1 +
0 * 2 ^ 2 +
0 * 2 ^ 3 +
1 * 2 ^ 4 +
0 * 2 ^ 5 +
0 * 2 ^ 6 +
1 * 2 ^ 7 +
1 * 2 ^ 8 +
1 * 2 ^ 9 +
0 * 2 ^ 10 +
0 * 2 ^ 11 +
1 * 2 ^ 12 +
1 * 2 ^ 13 +
0 * 2 ^ 14 +
1 * 2 ^ 15
Mostly it ends in me making some mistakes & I find myself starting over!

Well, now I'll show you how to do it quickly.

Before that, let me remind you about the shift operations we all have studied in our classes. What happens when we perform a logical right shift?

    [0 0 0 0 1 0 1 0] # decimal: 10
      / / / / / / /
    [0 0 0 1 0 1 0] <- [0]

result: [0 0 0 1 0 1 0 0] # decimal: 20
So, a logical left shift results in the number getting doubled. i.e., when the digit 0 is concatenated to the end of a binary sequence, its decimal equivalent essentially gets doubled.

PS: stop here & guess what happens when the digit 1 is concatenated to the right end of a binary sequence! :)

    [0 0 0 0 1 0 1 0] # decimal: 10
      / / / / / / /
    [0 0 0 1 0 1 0] <- [1]

result: [0 0 0 1 0 1 0 1] # decimal: 21 (i.e., 20 + 1)
So, we learnt, a binary sequence x when concatenated with:
    0: would result in 2x
    1: would result in 2x + 1
Now, let us get into action!!

We were converting 1011001110010001 to decimal:

1011001110010001

Starting with the first 1 and traversing from left to right, we get:

                encountered: 1 => 1
                encountered: 0 => 2            # 2x (2 * 1)
                encountered: 1 => 5            # 2x + 1 (2 * 2 + 1)
                encountered: 1 => 11           # 2x + 1 (2 * 5 + 1)
                encountered: 0 => 22           # 2x (2 * 11)
                encountered: 0 => 44           # 2x (2 * 22)
                encountered: 1 => 89           # 2x + 1 (2 * 44 + 1)
                encountered: 1 => 179          # 2x + 1 (2 * 89 + 1)
                encountered: 1 => 359          # 2x + 1 (2 * 179 + 1)
                encountered: 0 => 718          # 2x (2 * 359)
                encountered: 0 => 1436         # 2x (2 * 718)
                encountered: 1 => 2873         # 2x + 1 (2 * 1436 + 1)
                encountered: 0 => 5746         # 2x (2 * 2873)
                encountered: 0 => 11492        # 2x (2 * 5746)
                encountered: 0 => 22984        # 2x (2 * 11492)
                encountered: 1 => 45969        # 2x + 1 (2 * 22984 + 1)
Well, see how easy it is! You can use the following binary numbers to practice:

10101000
1100100110
010101001101
A massive shout-out to Prof. Soni for sharing this little hack with us! If you found this useful, share it with some computer science enthusiasts or flex this trick in your next class! Or if you're just surfing around here, drop me a message - I love talking to new people :)`,
    details:
      "In an era marked by rapid technological advancements, the education sector is undergoing a significant transformation. Digital technologies are revolutionizing the way we teach and learn, making education more accessible, engaging, and personalized. This blog explores the impact of digital transformation on education and how it is reshaping the learning landscape. One of the most notable changes brought about by digital transformation is the shift from traditional classroom settings to more flexible, online learning environments. Interactive learning platforms, such as MOOCs (Massive Open Online Courses) and e-learning portals, have made it possible for students to access high-quality education from anywhere in the world. These platforms offer a wide range of courses, from basic skills to advanced degrees, allowing learners to tailor their education to their individual needs and schedules. Digital transformation has also introduced innovative tools and technologies that enhance the learning experience. For example, virtual reality (VR) and augmented reality (AR) are being used to create immersive learning environments that can bring complex subjects to life. Students can explore historical sites, conduct virtual science experiments, and interact with 3D models, making learning more engaging and interactive. Additionally, AI-driven personalized education systems can analyze student performance data to provide customized learning experiences, identifying areas where students need improvement and offering targeted resources to help them succeed. Collaboration and communication have also been significantly improved through digital transformation. Online collaboration tools, such as video conferencing, instant messaging, and shared document platforms, enable students and teachers to work together more effectively, regardless of geographical location. These tools facilitate real-time feedback and support, creating a more connected and interactive learning environment.",
    icon: <IoPersonCircle />,
    name: "Vishnu Sanal",
    year: "2024 Pass out Batch",
    date: "July 15,2024",
  },
  // {
  //   id: 2,
  //   img: "/blog.png",
  //   head: "Embracing Digital Transformation in Education",
  //   content:
  //     "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
  //   icon: <IoPersonCircle />,
  //   name: "Jane Doe",
  //   year: "2025 Pass out Batch",
  //   date: "July 15,2024",
  // },
  // {
  //   id: 3,
  //   img: "/blog.png",
  //   head: "Embracing Digital Transformation in Education",
  //   content:
  //     "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
  //   icon: <IoPersonCircle />,
  //   name: "Jane Doe",
  //   year: "2025 Pass out Batch",
  //   date: "July 15,2024",
  // },
  // {
  //   id: 4,
  //   img: "/blog.png",
  //   head: "Embracing Digital Transformation in Education",
  //   content:
  //     "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
  //   icon: <IoPersonCircle />,
  //   name: "Jane Doe",
  //   year: "2025 Pass out Batch",
  //   date: "July 15,2024",
  // },
  // {
  //   id: 5,
  //   img: "/blog.png",
  //   head: "Embracing Digital Transformation in Education",
  //   content:
  //     "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
  //   icon: <IoPersonCircle />,
  //   name: "Jane Doe",
  //   year: "2025 Pass out Batch",
  //   date: "July 15,2024",
  // },
  // {
  //   id: 6,
  //   img: "/blog.png",
  //   head: "Embracing Digital Transformation in Education",
  //   content:
  //     "Explore how digital technologies are reshaping the educational landscape and enhancing learning experiences for students and educators....",
  //   icon: <IoPersonCircle />,
  //   name: "Jane Doe",
  //   year: "2025 Pass out Batch",
  //   date: "July 15,2024",
  // },
];
