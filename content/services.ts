export type Service = { title: string; body: string };

/* Order matters. The first five are the usual starting points, and the
   services section says so. */
export const services: Service[] = [
  {
    title: 'Brand Strategy',
    body: 'Positioning, audience and the argument for your brand. Everything else is built on this.',
  },
  {
    title: 'Naming & Tone of Voice',
    body: 'A name people remember, and a way of speaking that sounds like you rather than like your category.',
  },
  {
    title: 'Visual Identity',
    body: 'Logo, type, colour and imagery built as a system, so your brand looks like itself everywhere.',
  },
  {
    title: 'Packaging Design',
    body: 'Structure and artwork for products that need to get picked up.',
  },
  {
    title: 'Brand Refresh',
    body: 'Moving an existing identity forward without throwing away what your customers already recognise.',
  },
  {
    title: 'Brand Guidelines',
    body: 'Rules your team can follow without me in the room.',
  },
  {
    title: 'Art Direction',
    body: 'Photography, illustration and campaign work held to one standard, so nothing drifts off brand.',
  },
  {
    title: 'Web & Digital Design',
    body: 'Your identity carried onto a screen properly, not squeezed into a template.',
  },
  {
    title: 'Campaign & Social',
    body: 'Templates and artwork so your everyday output stays on brand without you thinking about it.',
  },
  {
    title: 'Presentation Design',
    body: 'Pitch and investor decks that argue clearly and look like they came from a real company.',
  },
  {
    title: 'Editorial & Print',
    body: 'Books, reports and journals where the layout has to carry the argument.',
  },
  {
    title: 'Workshops',
    body: 'Structured sessions to get you and your team unstuck on the decisions holding everything up.',
  },
];

export type Package = { title: string; who: string; leave: string };

export const packages: Package[] = [
  {
    title: 'Brand Strategy',
    who: 'For founders with a product but no clear point of view yet.',
    leave: 'You leave knowing what your brand says and why.',
  },
  {
    title: 'Visual Identity',
    who: 'For founders whose strategy is set but whose look doesn’t match it.',
    leave: 'You leave with an identity you can use without me.',
  },
  {
    title: 'Full Brand Identity',
    who: 'For founders starting from scratch.',
    leave: 'Strategy and identity together, done once, in order.',
  },
  {
    title: 'Packaging',
    who: 'For products that need to stand out on a shelf and on a screen.',
    leave: 'Priced per SKU.',
  },
];
