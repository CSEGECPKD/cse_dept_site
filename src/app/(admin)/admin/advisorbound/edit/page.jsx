import { getAdvisoryBoardMembers } from "@/actions/advisoryboard.action";
import AdvisoryBoardForm from "@/components/admin/advisorbound/AdvisorBoundForm";
import AdvisoryBoardList from "@/components/admin/advisorbound/AdvisoryBoardList";
import React from "react";

const EditAccreditionPage = async () => {
  const advisors = await getAdvisoryBoardMembers();
  return (
    <div className="grid grid-cols-2">
      <div className="py-20 px-20">
        <AdvisoryBoardForm />
      </div>
      <div className="py-20 px-10">
        <AdvisoryBoardList advisoryBoardList={advisors} />
      </div>
    </div>
  );
};

export default EditAccreditionPage;
