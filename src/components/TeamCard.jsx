export function TeamCard({ member }) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-pink-400/40 shadow-[0_0_40px_rgba(236,72,153,0.35)] transition-transform duration-300 group-hover:scale-105">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/40"></div>
      </div>

      <h3 className="mt-4 text-xl font-gothic text-pink-300">
        {member.name}
      </h3>
      <p className="text-sm tracking-wide text-pink-300/70">
        {member.role}
      </p>
    </div>
  );
}