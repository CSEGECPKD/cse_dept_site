import React from "react";
import ColoredSection from "../../../components/ColoredSection";

const SectionTitle = ({ children, align = "left" }) => (
  <h1 className={`
    font-bebasneue
    text-[26px]/[31.2px] sm:text-[28px] md:text-[40px] lg:text-[56px]
    font-normal
    leading-[31.2px] sm:leading-[32px] md:leading-[48px] lg:leading-[64px]
    text-left ${align === 'right' ? 'md:text-right' : ''}
  `}>
    . {children}
  </h1>
);

const SectionSubtitle = ({ children }) => (
  <h2 className="
    py-2 sm:py-3 md:py-4
    font-montserrat
    text-[16px]/[24.32px] sm:text-[20px] md:text-[26px] lg:text-[32px]
    leading-[24.32px] sm:leading-[30px] md:leading-[39px] lg:leading-[48px]
    font-medium
    text-left
  ">
    {children}
  </h2>
);

const List = ({ items }) => (
  <ul className="
    px-1 sm:px-2 md:px-2
    list-disc
    font-montserrat
    font-normal
    text-gray-500
    text-[20px] sm:text-[22px] md:text-[24px]
    text-left
  ">
    {items.map((item, index) => (
      <li key={index} className="mb-3 sm:mb-4">{item}</li>
    ))}
  </ul>
);

const Section = ({ title, subtitle, items, titleAlign }) => (
  <div className="py-20">
    <SectionTitle align={titleAlign}>{title}</SectionTitle>
    {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
    <div className="pl-10">
      <List items={items} />
    </div>
  </div>
);

const AcademicsIntro = () => {
  const sections = [
    {
      title: "Program education objectives - peos",
      subtitle: "Within a short span of time after graduation, the graduates shall:",
      items: [
        "PEO1. Apply good analytic, design, and implementation skills required to formulate and solve computer science problems.",
        "PEO2. Be employed as computer science professionals beyond entry-level positions.",
        "PEO3. Be able to route their talents in to post graduate and research programs, promoting remarkable advancements in emerging areas.",
        "PEO4. Demonstrate that they can function, communicate, collaborate and continue to learn effectively as ethically and socially responsible computer science professionals."
      ]
    },
    {
      title: "Program specific outcomes - pSos",
      titleAlign: "right",
      items: [
        "PSO1: Problem Solving Skills: Ability to design and develop computer programs and computer based systems of moderate complexity in the areas pertaining to system software, multimedia, database, networking, artificial intelligence, web- design and information security.",
        "PSO2: Professional Skills: Ability to apply standard practices and methods in software project management and software development using suitable programming environments to deliver quality product for the industry.."
      ]
    },
    {
      title: "Program outcomes - pos",
      subtitle: "Engineering Graduates will be able to:",
      items: [
        "PO 1. Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.",
        // ... other POs ...
        "PO 2. Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences.",
        "PO 3. Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety, and the cultural, societal, and environmental considerations.",
        "PO 4. Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions.",
        "PO 5. Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modeling to complex engineering activities with an understanding of the limitations.",
        "PO 6. The engineer and society: Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to the professional engineering practice.",
        "PO 7. Environment and sustainability: Understand the impact of the professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of, and need for sustainable development.",
        "PO 8. Ethics: Apply ethical principles and commit to professional ethics and responsibilities and norms of the engineering practice.",
        "PO 9. Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams, and in multidisciplinary settings.",
        "PO 10. Communication: Communicate effectively on complex engineering activities with the engineering community and with society at large, such as, being able to comprehend and write effective reports and design documentation, make effective presentations, and give and receive clear instructions.",
        "PO 11. Project management and finance: Demonstrate knowledge and understanding of the engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects and in multidisciplinary environments.",
        "PO 12. Life-long learning: Recognize the need for, and have the preparation and ability to engage in independent and life-long learning in the broadest context of technological change."
      ]
    }
  ];

  return (
    <ColoredSection
      color="BLACK"
      className="bg-white w-full px-6 py-32 md:px-20 xl:px-24 sm:px-10"
    >
      <div className="px-10">
        {sections.map((section, index) => (
          <Section key={index} {...section} />
        ))}
      </div>
    </ColoredSection>
  );
};

export default AcademicsIntro;