import { describe, expect, it } from 'vitest';
import { RESUME_CONTENT } from '../data/resumeContent';

describe('portfolio resume content', () => {
  it('keeps the approved positioning and evidence-first hierarchy', () => {
    expect(RESUME_CONTENT.title).toBe('Forward Deployed Engineer | Technical Systems Translator');
    expect(RESUME_CONTENT.subtitle).toContain('Full-Stack Geospatial & Data Systems');
    expect(RESUME_CONTENT.sections.map((section) => section.heading)).toEqual([
      'Selected Systems',
      'Professional Experience',
    ]);
  });

  it('keeps HPS evidence measurable without turning local validation into production proof', () => {
    const hps = RESUME_CONTENT.sections[0].entries[0];
    const evidence = hps.bullets.join(' ');

    expect(hps.title).toBe('HPS Geospatial Platform');
    expect(hps.links).toContainEqual({
      label: 'Live',
      url: 'https://hydro-frontend-786228485832.us-central1.run.app/',
    });
    expect(evidence).toContain('17 pre-existing browser regressions');
    expect(evidence).toContain('33/33 browser matrix');
    expect(evidence).toContain(
      'live production-database behavior was outside the retained evidence',
    );
  });

  it('retains only the selected professional credentials', () => {
    expect(RESUME_CONTENT.certifications).toEqual([
      'Google Project Management Professional Certificate',
      'Google Data Analytics',
    ]);
  });
});
