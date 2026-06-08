import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GUYNODE_SYSTEM_HREF } from '../../lib/routes';
import { TrackPageContent, EmbeddedArtifact } from '../../data/trackContent';
import { componentRecipes, getRoleAccentRecipe } from '../../lib/design-system';
import ProofBlockCard from './ProofBlockCard';
import { executiveEvidenceBlocks } from '../../utils/evidenceBlocks';
import { mapEvidenceToProofCard } from '../../utils/mapEvidenceToProofCard';
import { RecruiterRoleLane, VALID_RECRUITER_LANES } from '../../types';
import SkillDiscoveryModal from '../SkillDiscoveryModal';
import { HtmlPreviewCard } from '../CaseStudyComponents';
import { OperationalTriageSimulator } from '../ops-triage/OperationalTriageSimulator';
import { PROJECT_REGISTRY } from '../../constants';

interface RoleTrackPageProps {
  content: TrackPageContent;
}

const INITIAL_DISPLAY_COUNT = 4;

const RoleTrackPage: React.FC<RoleTrackPageProps> = ({ content }) => {
  const navigate = useNavigate();
  const [inspectorSkill, setInspectorSkill] = useState<string | null>(null);

  // Maps high-level track proves statements to canonical operational skill names
  const CANONICAL_SKILL_MAP: Record<string, string> = {
    // Forward Deployed Engineer
    'Workflow setup': 'Workflow Design',
    'Workflow design': 'Workflow Design',
    'Technical discovery': 'Technical Troubleshooting',
    Documentation: 'Documentation',
    'Implementation planning': 'Implementation Planning',
    'Support handoff': 'Support Handoff',
    'Customer-facing problem solving': 'Customer Success Support',
    'Technical support': 'Technical Troubleshooting',
    'Frontend systems': 'React',
    'AI-assisted build workflows': 'AI-Assisted Development',
    'Stakeholder translation': 'Stakeholder Communication',

    // Implementation Consultant
    'Test planning': 'QA Protocols',
    'QA protocols': 'QA Protocols',
    'Test matrices': 'QA Protocols',
    'Defect taxonomy': 'Issue Triage',
    Reproducibility: 'QA Protocols',
    'Validation workflows': 'Data QA / Validation',
    'Issue triage': 'Issue Triage',
    'Root-cause analysis': 'Root-Cause Analysis',
    'Validation logic': 'Data QA / Validation',
    'Reproducible testing': 'QA Protocols',
    'Launch-readiness review': 'Launch Readiness',
    'Decision-ready reporting': 'Dashboards & Reporting',

    // Spatial Systems Architect
    'Spatial data organization': 'Spatial Data',
    'GIS workflow understanding': 'ArcGIS',
    'Map viewer logic': 'Leaflet',
    'Dataset governance': 'Dataset Cataloging',
    'Metadata schema design': 'Metadata',
    'Public spatial data access': 'Dataset Cataloging',
    'Utility and spatial operations awareness': 'ESRI ArcMap',
  };

  // "What This Track Proves" buttons pass Title Case labels (e.g. "Workflow Setup") while the
  // map keys are sentence case ("Workflow setup"); resolve case-insensitively so every claim
  // maps to a canonical skill that SkillDiscoveryModal can back with real evidence.
  const resolveCanonicalSkill = (skillName: string): string => {
    if (CANONICAL_SKILL_MAP[skillName]) return CANONICAL_SKILL_MAP[skillName];
    const lowered = skillName.toLowerCase();
    const match = Object.keys(CANONICAL_SKILL_MAP).find((key) => key.toLowerCase() === lowered);
    return match ? CANONICAL_SKILL_MAP[match] : skillName;
  };

  const handleSkillClick = (skillName: string) => {
    setInspectorSkill(resolveCanonicalSkill(skillName));
  };

  const roleLane =
    content.accent === 'implementation' ? 'Implementation' : content.accent === 'qa' ? 'QA' : 'GIS';
  const accent = getRoleAccentRecipe(roleLane);

  // Type guard for RecruiterRoleLane
  const isRecruiterRoleLane = (title: string): title is RecruiterRoleLane => {
    return (VALID_RECRUITER_LANES as string[]).includes(title);
  };

  // Filter and map dynamic evidence blocks
  const dynamicEvidence = executiveEvidenceBlocks.blocks
    .filter((block) => {
      const currentTitle = content.title;
      if (!isRecruiterRoleLane(currentTitle)) return false;

      // EXCLUSIVE: Determination comes strictly from explicit roleLanes metadata
      // per Jules P3 requirement. Heuristics removed to prevent silent failures.
      return block.roleLanes && block.roleLanes.includes(currentTitle);
    })
    .map(mapEvidenceToProofCard);

  const [showAllEvidence, setShowAllEvidence] = useState(false);
  const newBatchRef = useRef<HTMLDivElement>(null);

  const hasMoreEvidence = dynamicEvidence.length > INITIAL_DISPLAY_COUNT;

  // Handle focus management when expanding
  // Decoupled from INITIAL_DISPLAY_COUNT magic numbers per Jules P2 requirement.
  useEffect(() => {
    if (showAllEvidence && newBatchRef.current) {
      // Jules: Focus the first interactive element (the link) inside the new content
      // ProofBlockCard is wrapped in a Link, so we target the first 'a' tag.
      const firstNewLink = newBatchRef.current.querySelector('a');
      if (firstNewLink) {
        (firstNewLink as HTMLElement).focus();
      }
    }
  }, [showAllEvidence]);

  const actions = content.ctaActions.map((action) => {
    const normalizedLabel = action.label.toLowerCase();

    return {
      ...action,
      href: normalizedLabel.includes('guynode') && !action.href ? GUYNODE_SYSTEM_HREF : action.href,
      isContact: normalizedLabel.includes('contact'),
    };
  });

  // Renders embedded interactive evidence by reusing existing artifact components.
  // `project-preview` pulls live content/iframe from PROJECT_REGISTRY so artifact HTML
  // is never duplicated here.
  const renderEmbeddedArtifact = (artifact: EmbeddedArtifact) => {
    if (artifact.kind === 'ops-triage-simulator') {
      return <OperationalTriageSimulator />;
    }
    const project = PROJECT_REGISTRY.find((entry) => entry.id === artifact.projectId);
    const hero = project?.heroArtifact;
    if (!hero) return null;
    return (
      <HtmlPreviewCard
        content={(hero.content as string) || ''}
        label={artifact.label}
        iframeUrl={hero.iframeUrl}
        accentColor={artifact.accentColor}
      />
    );
  };

  return (
    <div className="min-h-screen">
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[620px] h-[620px] ${accent.bgClass} blur-[130px] rounded-full pointer-events-none opacity-60`}
          aria-hidden="true"
        />
        <div className="max-w-5xl mx-auto space-y-6">
          <p
            className={`inline-flex items-center text-xs uppercase tracking-[0.25em] font-semibold border px-3 py-1.5 rounded-full ${accent.chipClass}`}
          >
            {content.eyebrow}
          </p>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-ink-navy dark:text-white leading-tight">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 leading-snug max-w-4xl">
            {content.headline}
          </p>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
            {content.summary}
          </p>
        </div>
      </section>

      <section className="px-6 pb-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="sr-only">Why this lens adds value</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { tag: 'Business value', body: content.valueBridge.business },
              { tag: 'For the people who use it', body: content.valueBridge.people },
            ].map((bridge) => (
              <article
                key={bridge.tag}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
              >
                <span
                  className={`inline-flex items-center text-[10px] font-bold uppercase tracking-[0.16em] border px-2.5 py-1 rounded-md ${accent.chipClass}`}
                >
                  {bridge.tag}
                </span>
                <p className="mt-3 text-sm md:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                  {bridge.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8">
          <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
            What This Track Proves
          </h2>
          <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
            {content.proves.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleSkillClick(item)}
                  className="text-sm text-left w-full font-medium text-slate-800 dark:text-slate-200 leading-relaxed border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 bg-white dark:bg-slate-900 hover:border-gild/40 dark:hover:border-gild/30 hover:scale-[1.01] transition-all duration-200 cursor-pointer flex justify-between items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua"
                >
                  <span>{item}</span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 group-hover:text-gild dark:group-hover:text-gild-soft transition-colors flex items-center gap-1">
                    Inspect <span>→</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 bg-slate-50/60 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto rounded-2xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-slate-900/60 p-8">
          <p className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
            {content.flagshipLabel}
          </p>
          <h2 className="mt-3 text-2xl font-outfit font-semibold text-ink-navy dark:text-white">
            {content.flagshipTitle}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.flagshipSummary}
          </p>
          <ul className="mt-5 space-y-2">
            {content.flagshipBullets.map((bullet) => (
              <li
                key={bullet}
                className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2"
              >
                <span
                  aria-hidden="true"
                  className={`mt-1.5 w-1.5 h-1.5 rounded-full ${content.accent === 'implementation' ? 'bg-tide-aqua' : content.accent === 'qa' ? 'bg-tide-blue' : 'bg-tide-cyan'}`}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            to={content.flagshipHref}
            aria-label={`${content.flagshipCtaLabel} for ${content.title} track`}
            className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 ${accent.chipClass}`}
          >
            {content.flagshipCtaLabel}
          </Link>
        </div>
      </section>

      {content.embeddedArtifacts.length > 0 && (
        <section className="px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-5">
            <div className="space-y-2">
              <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
                Interactive Evidence
              </h2>
              <p className={componentRecipes.typography.sectionSubheading}>
                Working artifacts you can open and operate — not screenshots.
              </p>
            </div>
            <div className="space-y-10">
              {content.embeddedArtifacts.map((artifact) => (
                <figure key={artifact.label} className="space-y-3">
                  {renderEmbeddedArtifact(artifact)}
                  <figcaption className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <span className="font-semibold text-ink-navy dark:text-white">
                      {artifact.label}.
                    </span>{' '}
                    {artifact.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-5">
          <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
            Supporting Evidence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content.supportingEvidence.map((item) => {
              const card = (
                <article className="h-full rounded-xl border border-[#d8e8ee] dark:border-white/10 bg-white/95 dark:bg-slate-900/70 p-5">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-semibold text-ink-navy dark:text-white">
                      {item.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-[#d8e8ee] dark:border-white/10 rounded-full px-2 py-0.5">
                      {item.proofType}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.relevance}
                  </p>
                  {item.roleChips && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {item.roleChips.map((chip) => (
                        <span
                          key={`${item.title}-${chip}`}
                          className={`text-[11px] px-2 py-0.5 rounded-md border ${accent.chipClass}`}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              );

              const evidenceHref = item.href;
              if (!evidenceHref) return <div key={item.title}>{card}</div>;
              return (
                <Link
                  key={item.title}
                  to={evidenceHref}
                  aria-label={`View supporting evidence for ${item.title}`}
                  className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua rounded-xl"
                >
                  {card}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {dynamicEvidence.length > 0 && (
        <section
          className={`${componentRecipes.layout.section} bg-ink-mist dark:bg-ink-deep border-y border-ink-border`}
        >
          <div className={componentRecipes.layout.container}>
            <div className={componentRecipes.layout.sectionHeader}>
              <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
                Automated Governance Proof
              </h2>
              <p className={componentRecipes.typography.sectionSubheading}>
                Direct evidence from development logs and automated review cycles.
              </p>
            </div>

            <div className={componentRecipes.layout.grid}>
              {dynamicEvidence.slice(0, INITIAL_DISPLAY_COUNT).map((evidence) => (
                <div key={evidence.id}>
                  <ProofBlockCard {...evidence} />
                </div>
              ))}

              {showAllEvidence && (
                <div ref={newBatchRef} className="contents" data-testid="evidence-batch-new">
                  {dynamicEvidence.slice(INITIAL_DISPLAY_COUNT).map((evidence) => (
                    <div key={evidence.id}>
                      <ProofBlockCard {...evidence} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {hasMoreEvidence && (
              <div className="flex justify-center pt-8">
                <button
                  type="button"
                  aria-expanded={showAllEvidence}
                  onClick={() => setShowAllEvidence(!showAllEvidence)}
                  className={
                    showAllEvidence
                      ? componentRecipes.button.disclosureGhost
                      : componentRecipes.button.disclosure
                  }
                >
                  {showAllEvidence ? (
                    'Show Less'
                  ) : (
                    <>
                      View {dynamicEvidence.length - INITIAL_DISPLAY_COUNT} More Proof Blocks
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="h-4 w-4"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="px-6 py-12 bg-slate-50/60 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-5xl mx-auto space-y-5">
          <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
            Skills &amp; Tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {content.skillsTools.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillClick(skill)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200 hover:scale-[1.02] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-tide-aqua ${accent.chipClass}`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 pb-24">
        <div className="max-w-5xl mx-auto glass-card rounded-2xl p-8">
          <h2 className={componentRecipes.typography.sectionHeading + ' ' + accent.textClass}>
            {content.ctaTitle}
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-300">{content.ctaCopy}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {actions.map((action, index) => {
              if (action.isContact) {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() => window.dispatchEvent(new CustomEvent('open-contact'))}
                    aria-label={`${action.label} for ${content.title}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 border ${accent.chipClass}`}
                  >
                    {action.label}
                  </button>
                );
              }

              if (action.twinSource) {
                return (
                  <button
                    key={action.label}
                    type="button"
                    onClick={() =>
                      window.dispatchEvent(
                        new CustomEvent('open-digital-twin', {
                          detail: {
                            source: action.twinSource,
                            modeLabel:
                              action.twinSource === 'implementation'
                                ? 'Forward Deployed Track'
                                : action.twinSource === 'qa'
                                  ? 'Implementation Consultant Track'
                                  : action.twinSource === 'gis'
                                    ? 'GIS Track'
                                    : 'General Recruiter Mode',
                            starterPrompt: action.twinStarterPrompt,
                          },
                        }),
                      )
                    }
                    aria-label={`${action.label} for ${content.title}`}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 border ${accent.chipClass}`}
                  >
                    {action.label}
                  </button>
                );
              }

              if (!action.href) return null;

              return (
                <Link
                  key={action.label}
                  to={action.href}
                  aria-label={`${action.label} for ${content.title}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-colors focus:outline-none focus-visible:ring-2 ${
                    index === 0 ? componentRecipes.button.primary : `border ${accent.chipClass}`
                  }`}
                >
                  {action.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <SkillDiscoveryModal
        skill={inspectorSkill || ''}
        isOpen={!!inspectorSkill}
        onClose={() => setInspectorSkill(null)}
        onNavigateToStudy={(id) => navigate(`/projects/${id}`)}
      />
    </div>
  );
};

export default RoleTrackPage;
