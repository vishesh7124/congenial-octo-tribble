import { useState } from "react";
import { TopNavOverlay } from "../components/TopNavOverlay";

const events = [
  {
    title: "Hack TU",
    below_title: "Flagship Hackathon",
    description: "Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do soch skta"
  },
  {
    title: "Hack TU 2",
    below_title: "Flagship Hackathon",
    description: "Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do soch skta"
  },
  {
    title: "Hack TU 3",
    below_title: "Flagship Hackathon",
    description: "Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do soch skta"
  },
  {
    title: "Hack TU 4",
    below_title: "Flagship Hackathon",
    description: "Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do bhai mei nahi soch skta Lorem ipsum kuch bhi likh do soch skta"
  }
]

function rotate(new_value, total) {
  if (new_value < 0) return total + new_value;
  return new_value % total;
}

function Event({ event }) {
  return <div className="flex flex-col w-[60vw] gap-4 text-[#95B7DA]"><h1 className="text-8xl font-pirata">
    {event.title}
  </h1>
  <h2 className="text-5xl font-gothic mb-8">
    {event.below_title}
  </h2>
  <div className="flex">
    <button onClick={() => alert('todo')} className="font-gothic text-2xl p-4 rounded-3xl" style={{
      border: "3px solid #65C5D4",
    }}>{"MORE INFO >"}</button>
    <div></div>
  </div>
  <h2 className="text-5xl font-gothic mt-8">Description</h2>
  <h2 className="text-4xl font-gothic">
    {event.description}
  </h2></div>
}

export function Events() {
  const [currentEvent, setCurrentEvent] = useState(0);
  return (
    <div className="min-h-screen text-pink-400">
      <TopNavOverlay />
      <div className="pt-32 px-8 flex justify-between pt-[30vh]">
        <button
          onClick={() => setCurrentEvent(rotate(currentEvent - 1, events.length))}
          className="text-8xl font-gothic text-[#DE87B4]" 
        >{"<"}</button>
        <Event event={events[currentEvent]} />
        <button
          onClick={() => setCurrentEvent(rotate(currentEvent + 1, events.length))}
          className="text-8xl font-gothic text-[#DE87B4]"
        >{">"}</button>
      </div>
    </div>
  );
}

