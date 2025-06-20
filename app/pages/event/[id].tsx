// pages/events/[id].tsx
import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Event {id} Details</h1>
      <p>More information about Event {id}...</p>
    </div>
  );
};

export default EventDetail;
