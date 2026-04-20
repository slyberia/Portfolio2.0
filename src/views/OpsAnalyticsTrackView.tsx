import React from 'react';
import TrackHero from '../components/tracks/TrackHero';
import ProofBlockCard from '../components/tracks/ProofBlockCard';
import HowIWorkList from '../components/tracks/HowIWorkList';
import SupportingArtifactsGrid from '../components/tracks/SupportingArtifactsGrid';
import SharedLLMGovernanceBlock from '../components/tracks/SharedLLMGovernanceBlock';
import TrackCTA from '../components/tracks/TrackCTA';
import { opsAnalyticsTrackContent } from '../data/trackContent';

const llmGovernanceLinks = [
  { label: 'LLM governance summary', href: '/portfolio2/deep-dive#multi-llm-governance' },
  { label: 'Decision-impact blocks', href: '/portfolio2/deep-dive#decision-blocks' },
];

const OpsAnalyticsTrackView: React.FC = () => {
  const content = opsAnalyticsTrackContent;
  return (
    <div className="min-h-screen">
      <TrackHero
        eyebrow={content.eyebrow}
        title={content.title}
        headline={content.headline}
        subcopy={content.subcopy}
        chips={content.chips}
      />

      {/* What this page proves */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 space-y-3">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
            {content.whatThisPageProves.heading}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {content.whatThisPageProves.body}
          </p>
        </div>
      </section>

      {/* Pinned proof blocks */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
            Pinned proof
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {content.proofBlocks.map((block) => (
              <ProofBlockCard
                key={block.href}
                title={block.title}
                summary={block.summary}
                whyItMatters={block.whyItMatters}
                artifactChips={block.artifactChips}
                href={block.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-12 px-6 bg-slate-50/50 dark:bg-slate-900/20 border-y border-black/5 dark:border-white/5">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
            How I work
          </h2>
          <HowIWorkList items={content.howIWork} />
        </div>
      </section>

      {/* Best supporting artifacts */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xs font-bold text-indigo-600 dark:text-indigo-500 uppercase tracking-[0.3em]">
            Best supporting artifacts
          </h2>
          <SupportingArtifactsGrid items={content.supportingArtifacts} />
        </div>
      </section>

      {/* Shared LLM governance block */}
      <section className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <SharedLLMGovernanceBlock
            headline="Used multiple LLMs as governed collaborators inside a human-directed workflow"
            copy="Across Portfolio2.0, ChatGPT supported strategy and evidence architecture, Gemini supported synthesis and technical proof translation, and Google AI Studio preserved the iterative archive and governance trail. The value was not novelty. It was disciplined use of AI inside a controlled system."
            links={llmGovernanceLinks}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <TrackCTA
            bestFitRoles={content.bestFitRoles}
            ctaCopy={content.ctaCopy}
            resumeHref={content.ctaLinks?.resumeHref}
            deepDiveHref={content.ctaLinks?.deepDiveHref}
          />
        </div>
      </section>
    </div>
  );
};

export default OpsAnalyticsTrackView;
