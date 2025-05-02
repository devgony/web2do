import type { SVGProps } from "react"

export default function FerrisIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* 몸체 */}
      <ellipse cx="50" cy="45" rx="30" ry="25" fill="#FF4500" />

      {/* 눈 (왼쪽) */}
      <g>
        <circle cx="35" cy="30" r="8" fill="black" />
        <circle cx="35" cy="28" r="3" fill="white" />
      </g>

      {/* 눈 (오른쪽) */}
      <g>
        <circle cx="65" cy="30" r="8" fill="black" />
        <circle cx="65" cy="28" r="3" fill="white" />
      </g>

      {/* 집게발 (왼쪽) */}
      <path d="M15 45 Q5 40 10 30 Q15 25 20 35 Q22 40 15 45 Z" fill="#FF4500" stroke="black" strokeWidth="1" />

      {/* 집게발 (오른쪽) */}
      <path d="M85 45 Q95 40 90 30 Q85 25 80 35 Q78 40 85 45 Z" fill="#FF4500" stroke="black" strokeWidth="1" />

      {/* 다리들 (왼쪽) */}
      <path d="M25 50 Q15 60 10 65" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 55 Q20 70 15 75" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M35 60 Q30 70 25 80" stroke="black" strokeWidth="2" strokeLinecap="round" />

      {/* 다리들 (오른쪽) */}
      <path d="M75 50 Q85 60 90 65" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 55 Q80 70 85 75" stroke="black" strokeWidth="2" strokeLinecap="round" />
      <path d="M65 60 Q70 70 75 80" stroke="black" strokeWidth="2" strokeLinecap="round" />

      {/* 입 */}
      <path d="M40 50 Q50 55 60 50" stroke="black" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* 몸체 윤곽선 */}
      <ellipse cx="50" cy="45" rx="30" ry="25" stroke="black" strokeWidth="1.5" fill="none" />
    </svg>
  )
}
