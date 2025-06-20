// pages/events.tsx
import Link from "next/link";

const Event = () => {
  return (
    <div>
      <h1>Event</h1>
      <ul>
        <li>
          <Link href="/event/1">Event 1</Link>
        </li>
        <li>
          <Link href="/event/2">Event 2</Link>
        </li>
        <li>
            <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Event;
