"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const links = [
  {
    label: "Students",
    href: "/admin/student/edit",
    id: "student",
  },
  {
    label: "Faculty",
    href: "/admin/faculty/edit",
    id: "faculty",
  },
  {
    label: "Courses",
    href: "/admin/course/edit",
    id: "course",
  },
  {
    label: "Certificates",
    href: "/admin/certificate/edit",
    id: "certificate",
  },
  {
    label: "Events",
    href: "/admin/event/edit",
    id: "event",
  },
  {
    label: "Gallery",
    href: "/admin/gallery/edit",
    id: "gallery",
  },
  {
    label: "Recruiter",
    href: "/admin/recruiter/edit",
    id: "recruiter",
  },
  {
    label: "Poster",
    href: "/admin/poster/edit",
    id: "poster",
  },
  {
    label: "Subject",
    href: "/admin/subject/edit",
    id: "subject",
  },
  {
    label: "Syllabus",
    href: "/admin/syllabus/edit",
    id: "syllabus",
  },
  {
    label: "Toppers",
    href: "/admin/toppers/edit",
    id: "toppers",
  },
  {
    label: "Blog",
    href: "/admin/blog/edit",
    id: "blog",
  },
  {
    label: "Association Members",
    href: "/admin/associationmembers/edit",
    id: "associationmembers",
  },
  {
    label: "Advisor Bourd",
    href: "/admin/advisorbound/edit",
    id: "advisorbound",
  },
];

const AdminNavbar = ({ email = "hod@gmail.com" }) => {
  const pathname = usePathname();
  const [name, domain] = email.split("@");
  return (
    <nav className="px-10 bg-black min-h-50 w-full">
      <div className="flex justify-between items-center">
        <div className="flex">
          <NavLink
            label="EDIT"
            link="./edit"
            active={pathname.includes("/edit")}
          />
          <NavLink
            label="SAVED"
            link="./saved"
            active={pathname === "/admin/saved"}
          />
          <NavLink
            label="REQUEST STATUS"
            link="./request-status"
            active={pathname === "/admin/request-status"}
          />
        </div>
        <div className="flex gap-2.5 h-full items-center">
          {/* <NavButton label="SUBMIT ALL" /> */}
          <Link href="/api/logout">
            <NavButton label="LOGOUT" />
          </Link>
          <p className="text-white text-right">
            {name}
            <br />@{domain}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-wrap border-l border-white">
        {links.map((link) => (
          <NavLink
            key={link.id}
            label={link.label}
            link={link.href}
            active={pathname.includes(link.id)}
          />
        ))}
      </div>
    </nav>
  );
};

function NavLink({ link, active, label }) {
  return (
    <Link
      className={twMerge(
        "text-white p-6 border-r border-b border-t border-white first-of-type:border-l h-fit",
        active && "text-black bg-white border-black border-b-1"
      )}
      href={link}
    >
      {label}
    </Link>
  );
}

function NavButton({ label, onClick }) {
  return (
    <button className="text-black px-6 py-4 h-fit bg-white" onClick={onClick}>
      {label}
    </button>
  );
}

export default AdminNavbar;
