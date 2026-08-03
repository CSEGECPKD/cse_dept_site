import { getEvents } from "@/actions/event.action";
import EventForm from "@/components/admin/event/EventForm";
import EventList from "@/components/admin/event/EventList";
import React from "react";

const EditAccreditionPage = async () => {
  const eventList = await getEvents();
  return (
    <div className="grid grid-cols-2">
      <div className="py-20 px-20">
        <EventForm />
      </div>
      <div className="py-20 px-10">
        <EventList eventList={eventList} />
      </div>
    </div>
  );
};

export default EditAccreditionPage;
