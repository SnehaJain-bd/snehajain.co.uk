export type Stage = 'decide' | 'design' | 'deploy';

export type Service = { title: string; body: string; stage: Stage };

/* The services section groups these by when they happen rather than
   listing twelve equal things, because the whole argument of the site is
   that brands get designed before they get decided. Putting "decide"
   first as a column heading is that argument, made structural.

   Order within a stage is the order shown. */
export const stages: { id: Stage; name: string; blurb: string }[] = [
  {
    id: 'decide',
    name: 'Decide',
    blurb: 'What you stand for, who you are for, and why anyone should choose you.',
  },
  {
    id: 'design',
    name: 'Design',
    blurb: 'Those decisions made visible, and built as a system rather than a mood.',
  },
  {
    id: 'deploy',
    name: 'Deploy',
    blurb: 'Everything that has to hold together once other people start using it.',
  },
];

export const services: Service[] = [
  {
    title: 'Brand Strategy',
    stage: 'decide',
    body: 'Positioning, audience and the argument for your brand. Everything else is built on this.',
  },
  {
    title: 'Naming & Tone of Voice',
    stage: 'decide',
    body: 'A name people remember, and a way of speaking that sounds like you rather than like your category.',
  },
  {
    title: 'Visual Identity',
    stage: 'design',
    body: 'Logo, type, colour and imagery built as a system, so your brand looks like itself everywhere.',
  },
  {
    title: 'Packaging Design',
    stage: 'design',
    body: 'Structure and artwork for products that need to get picked up.',
  },
  {
    title: 'Brand Refresh',
    stage: 'design',
    body: 'Moving an existing identity forward without throwing away what your customers already recognise.',
  },
  {
    title: 'Brand Guidelines',
    stage: 'deploy',
    body: 'Rules your team can follow without me in the room.',
  },
  {
    title: 'Art Direction',
    stage: 'design',
    body: 'Photography, illustration and campaign work held to one standard, so nothing drifts off brand.',
  },
  {
    title: 'Web & Digital Design',
    stage: 'deploy',
    body: 'Your identity carried onto a screen properly, not squeezed into a template.',
  },
  {
    title: 'Campaign & Social',
    stage: 'deploy',
    body: 'Templates and artwork so your everyday output stays on brand without you thinking about it.',
  },
  {
    title: 'Presentation Design',
    stage: 'deploy',
    body: 'Pitch and investor decks that argue clearly and look like they came from a real company.',
  },
  {
    title: 'Editorial & Print',
    stage: 'deploy',
    body: 'Books, reports and journals where the layout has to carry the argument.',
  },
  {
    title: 'Workshops',
    stage: 'decide',
    body: 'Structured sessions to get you and your team unstuck on the decisions holding everything up.',
  },
];

export type Package = {
  title: string;
  who: string;
  leave: string;
  /* What actually arrives. A founder cannot judge a package without it.

     EVERY LINE BELOW IS A DRAFT I DID NOT WRITE FROM YOUR PROCESS. They
     are inferred from the service descriptions so the layout could be
     built and judged at real length. Replace them with what you really
     hand over before this goes live, and delete this note when you do.
     An empty array simply renders no list. */
  deliverables: string[];
};

export const packages: Package[] = [
  {
    title: 'Brand Strategy',
    who: 'For founders with a product but no clear point of view yet.',
    leave: 'You leave knowing what your brand says and why.',
    deliverables: [
      'Positioning statement',
      'Audience and category map',
      'Messaging framework',
      'Two working sessions',
    ],
  },
  {
    title: 'Visual Identity',
    who: 'For founders whose strategy is set but whose look doesn’t match it.',
    leave: 'You leave with an identity you can use without me.',
    deliverables: [
      'Logo suite and marks',
      'Type and colour system',
      'Art direction for imagery',
      'Guidelines document',
    ],
  },
  {
    title: 'Full Brand Identity',
    who: 'For founders starting from scratch.',
    leave: 'Strategy and identity together, done once, in order.',
    deliverables: [
      'Everything in Brand Strategy',
      'Everything in Visual Identity',
      'Applied across your first touchpoints',
    ],
  },
  {
    title: 'Packaging',
    who: 'For products that need to stand out on a shelf and on a screen.',
    leave: 'Priced per SKU.',
    deliverables: [
      'Structure and dieline artwork',
      'Front of pack design',
      'Print ready files per SKU',
    ],
  },
];
