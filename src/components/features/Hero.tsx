import GridPattern from "../magicui/animated-grid-pattern"

export const Hero = () => {
  return (
    <div id="Presentation" className="relative">
      <div
        className="absolute inset-0 z-0 h-[70vh] md:h-[75vh] lg:h-[92vh] overflow-hidden dark:bg-[#0a001a] bg-[#efe5ff]"
        style={{
          maskImage:
            "radial-gradient(ellipse 68% 62% at 50% 38%, white 25%, white 55%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 62% at 50% 38%, white 25%, white 55%, transparent 92%)",
        }}
      >
        {/* Spotlights : éclairent la grille par en dessous, c'est ce qui donne
            la profondeur "premium" plutôt qu'un aplat de lignes plates. */}
        <div className="absolute left-1/2 top-[36%] h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a877fd]/35 dark:bg-[#a877fd]/45 blur-[110px]" />
        <div className="absolute left-[72%] top-[58%] h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff6fd8]/20 dark:bg-[#ff6fd8]/25 blur-[100px]" />

        {/* Grille majeure : lignes espacées et marquées, structure "blueprint" technique */}
        <GridPattern
          width={160}
          height={160}
          numSquares={0}
          strokeWidth={1.6}
          className="stroke-[#a877fd]/55 dark:stroke-[#a877fd]/45"
        />

        {/* Grille fine + carrés qui scintillent, en détail par-dessus */}
        <GridPattern
          numSquares={26}
          maxOpacity={0.9}
          duration={3}
          repeatDelay={0.3}
          strokeWidth={1}
          glow
          className="stroke-[#a877fd]/30 dark:stroke-[#a877fd]/22 text-[#a877fd]/90 dark:text-[#a877fd]/80"
        />
      </div>
    </div>
  )
}