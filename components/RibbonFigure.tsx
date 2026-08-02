export default function RibbonFigure() {
  return (
    <div className="ribbon-figure" aria-hidden="true">
      <svg
        className="ribbon-svg"
        width="340"
        height="380"
        viewBox="0 0 340 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* the "V" stroke */}
        <path d="M60 40 L165 300 L270 40" />
        {/* the bow */}
        <g className="bow">
          <path d="M150 130 C120 90 90 95 95 130 C100 160 140 155 165 190" />
          <path d="M180 130 C210 90 240 95 235 130 C230 160 190 155 165 190" />
          <path d="M140 150 L190 150" />
        </g>
      </svg>
    </div>
  );
}
