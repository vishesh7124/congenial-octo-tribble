import { TopNavOverlay } from "../components/TopNavOverlay";
import { TeamCard } from "../components/TeamCard";
import { teamMembers } from "../utils/TeamData";
import Footer from "../components/footer";

export function Team() {

  const posterMembers = teamMembers.slice(0, 9);
  const remainingMembers = teamMembers.slice(9);

  return (
    <div className="min-h-screen bg-black text-pink-400 overflow-hidden">
      <TopNavOverlay />
      <div className="pt-36 max-w-7xl mx-auto relative">
        <div className="relative min-h-250">
          <h1 className="absolute left-0 top-0 text-[13rem] mr-20 text-pink-400/80 font-gothic leading-none">
            Meet
          </h1>
          <h1 className="absolute right-20 top-85 text-[13rem] text-pink-400/80 font-gothic leading-none">
            The
          </h1>
          <h1 className="absolute left-0 top-160 text-[13rem] text-pink-400/80 font-gothic leading-none">
            Team
          </h1>

          <div className="absolute top-0 right-0 grid grid-cols-3 gap-16">
            {posterMembers.slice(0, 3).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
          <div className="absolute top-80 left-80 -translate-x-1/2 grid grid-cols-3 gap-16">
            {posterMembers.slice(3, 6).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
          <div className="absolute top-160 right-0 grid grid-cols-3 gap-16">
            {posterMembers.slice(6, 9).map((member, i) => (
              <TeamCard key={i} member={member} />
            ))}
          </div>
        </div>
        {remainingMembers.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-24 place-items-center pb-10">
            {remainingMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}