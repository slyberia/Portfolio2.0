const TECHNICAL_DEPTH_HEADING = '\n## Technical depth\n';
const STAKEHOLDER_HEADING = '\n## 🤝 Customer / Stakeholder Value\n';

/** Keep the HPS narrative and optional notes in one canonical markdown source. */
export const splitHpsCaseStudy = (content: string) => {
  const technicalStart = content.indexOf(TECHNICAL_DEPTH_HEADING);
  if (technicalStart < 0) return { overview: content, technical: '' };
  return {
    overview: content.slice(0, technicalStart),
    technical: content.slice(technicalStart + 1),
  };
};

export const hpsRecruiterScan = (overview: string) => {
  const stakeholderStart = overview.indexOf(STAKEHOLDER_HEADING);
  return stakeholderStart < 0 ? overview : overview.slice(0, stakeholderStart);
};
