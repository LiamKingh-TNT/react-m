export default function GradientGameTitle({
  text = "The Supreme Empire",
  fontSize = 64, // ✅ 控制文字實際高度
  strokeWidth = 8,
  fill = "#2E2E30",
  fontFamily = "'Jersey 25', sans-serif",
  gradientId = "strokeGradient",
  align = "center" // ✅ 新增對齊控制：'left' | 'center' | 'right'
}) {
  const strokeColors = [
    { color: "#B5D7D7", offset: "0%" },
    { color: "#A2B8C2", offset: "25%" },
    { color: "#778F98", offset: "50%" },
    { color: "#4E5F66", offset: "75%" },
    { color: "#324044", offset: "100%" }
  ];

  // 根據文字長度計算畫布大小
  const textWidth = text.length * fontSize;
  const viewWidth = textWidth + strokeWidth * 4;
  const viewHeight = fontSize * 1.5 + strokeWidth * 4;

  // ✅ 對齊控制
  let xPos = viewWidth / 2;
  let textAnchor = "middle";
  if (align === "left") {
    xPos = 20;
    textAnchor = "start";
  } else if (align === "right") {
    xPos = viewWidth-20;
    textAnchor = "end";
  }

  return (
    <div
      className={`w-fit z-[50] relative overflow-visible ${
        align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : "mr-auto"
      }`}
      style={{ height: `${viewHeight}px` }}
    >
      <svg
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {strokeColors.map((stop, i) => (
              <stop key={i} offset={stop.offset} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>

        {/* 底層描邊 */}
        <text
          x={xPos}
          y={viewHeight / 2}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight="900"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          fontFamily={fontFamily}
          strokeLinejoin="miter"
          strokeMiterlimit={0}
        >
          {text}
        </text>

        {/* 上層文字 */}
        <text
          x={xPos}
          y={viewHeight / 2}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight="900"
          fill={fill}
          fontFamily={fontFamily}
        >
          {text}
        </text>
      </svg>
    </div>
  );
}
