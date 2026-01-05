import { useState } from "react";
import { TopNavOverlay } from "../components/TopNavOverlay";

function Aura({ aura_file_name, size, children }) {
  return <div
    className="flex justify-center items-center"
    style={{
      width: size,
      height: size,
      backgroundImage: `url(/${aura_file_name}.svg)`,
      backgroundOrigin: "padding-box",
      backgroundSize: "cover"
    }}
  >
    {children}
  </div>
}

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
  return <div className="flex flex-col w-[30vw] gap-4 text-[#95B7DA] pl-32 pr-32">
    <h1 className="text-8xl font-pirata">
      {event.title}
    </h1>
    <h2 className="text-5xl font-gothic mb-8">
      {event.below_title}
    </h2>
    <div className="flex">
      <button
        onClick={() => alert('todo')}
        className="font-gothic text-2xl p-4 rounded-3xl cursor-pointer"
        style={{
          border: "3px solid #65C5D4",
        }}
      >{"MORE INFO >"}</button>
      <div></div>
    </div>
    <h2 className="text-5xl font-gothic mt-8">Description</h2>
    <h2 className="text-4xl font-gothic">
      {event.description}
    </h2>
  </div>
}

const upcomingEvents = [
  {
    title: "Event X",
    liner: "One liner jo bhi event hai"
  },
  {
    title: "Event X",
    liner: "One liner jo bhi event hai"
  },
  {
    title: "Event X",
    liner: "One liner jo bhi event hai"
  },
  {
    title: "Event X",
    liner: "One liner jo bhi event hai"
  },
]
const radius = "20vw"
function UpcomingEvents() {
  return <div className="flex flex-col pb-128" style={{
    backgroundImage: "url(/upcoming_events_bg.png)",
    backgroundSize: "cover"
  }}>
    <h2 className="section-title font-pirata text-8xl">
      <span>Upcoming Events</span>
    </h2>
    <div class="orbit">
      <div class="center">
        <img src="/aavegh.png" alt="Aavegh" style={{
          width: "80vw"
        }} />
      </div>
      {upcomingEvents.map(({ title, liner }, i) => {
        const angle = (360 / upcomingEvents.length) * i + 40;
        return <div
          key={`upcoming-event-${i}`}
          className="node font-gothic text-[#95B7DA]"
          style={{
            transform: `
              translate(-50%, -50%)
              rotate(${angle}deg)
              translate(${radius})
              rotate(-${angle}deg)
            `,
          }}
        >
          <Aura aura_file_name={"upcoming_aura"} size="15vw">
            <div className="flex flex-col">
              <div className="text-6xl">{title}</div>
              <div className="text-2xl">{liner}</div>
            </div>
          </Aura>
        </div>
      })}
    </div>
  </div>
}

export function Events() {
  const [currentEvent, setCurrentEvent] = useState(0);
  return (
    <div className="min-h-screen text-pink-400">
      <TopNavOverlay />
      <div className="pt-32 pb-48 px-8 flex justify-between pt-[30vh]">
        <button
          onClick={() => setCurrentEvent(rotate(currentEvent - 1, events.length))}
          className="font-gothic text-[#DE87B4] cursor-pointer ml-32" style={{
            fontSize: "30rem"
          }}
        >{"<"}</button>
        <Aura aura_file_name="aura" size="50vw">
          <Event event={events[currentEvent]} />
        </Aura>
        <button
          onClick={() => setCurrentEvent(rotate(currentEvent + 1, events.length))}
          className="font-gothic text-[#DE87B4] cursor-pointer mr-32" style={{
            fontSize: "30rem"
          }}
        >{">"}</button>
      </div>
      <UpcomingEvents />
    </div>
  );
}

