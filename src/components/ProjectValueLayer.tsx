import React from 'react';
import type { ProjectMetadata } from '../data/projectMetadata';

type ProjectValueLayerProps = {
  project: Pick<ProjectMetadata, 'purpose' | 'stakeholderValue'>;
};

const ROW_LABEL_CLASS =
  'font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400';
const ROW_BODY_CLASS = 'mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed';

/**
 * Stakeholder-value layer for project cards. Renders the Purpose and Stakeholder Value
 * rows from project metadata so a card answers "who did this help / what got easier,"
 * not just "what was built." Role Relevance (role chips) and Proof Type (proof pill)
 * are rendered by the card itself alongside this block.
 */
const ProjectValueLayer: React.FC<ProjectValueLayerProps> = ({ project }) => {
  if (!project.purpose && !project.stakeholderValue) return null;

  return (
    <dl className="mt-3 space-y-2.5">
      {project.purpose && (
        <div>
          <dt className={ROW_LABEL_CLASS}>Purpose</dt>
          <dd className={ROW_BODY_CLASS}>{project.purpose}</dd>
        </div>
      )}
      {project.stakeholderValue && (
        <div>
          <dt className={ROW_LABEL_CLASS}>Stakeholder Value</dt>
          <dd className={ROW_BODY_CLASS}>{project.stakeholderValue}</dd>
        </div>
      )}
    </dl>
  );
};

export default ProjectValueLayer;
