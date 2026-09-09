export type Question = { q: string; a: string };
export type FaqGroup = { title: string; questions: Question[] };

export const faq: FaqGroup[] = [
  {
    title: 'Services & offerings',
    questions: [
      {
        q: 'What kind of projects do you take on?',
        a: 'Brand strategy, identity and packaging for founder-led businesses. Product or service, pre-launch or already trading. If your brand needs deciding as much as it needs designing, that is the work I do best.',
      },
      {
        q: 'Can you help with just a logo?',
        a: 'No. A logo on its own doesn’t make a brand. It works next to the positioning, the colour, the type and the way all of it behaves together. On its own it’s just a mark. If a logo really is all you need, I’m not the right fit.',
      },
      {
        q: 'Do you design websites too?',
        a: 'Yes, as part of an identity project or on its own. The site should carry the brand, not reinterpret it.',
      },
    ],
  },
  {
    title: 'Process & workflow',
    questions: [
      {
        q: 'What is your design process like?',
        a: 'You book, we talk, we make the decisions together, then I design them. Every direction comes with its reasoning, so you always know why it looks the way it does.',
      },
      {
        q: 'How involved will I be?',
        a: 'I need you for the decisions and not much else. One working session at the start, honest answers when I ask for them. You do not need a brief. Making the brief is my job.',
      },
      {
        q: 'How do you handle revisions?',
        a: 'Three rounds of changes are included. Because every direction comes with its reasoning, feedback tends to be about the decision rather than about taste, which makes it faster for both of us.',
      },
    ],
  },
  {
    title: 'Pricing & collaboration',
    questions: [
      {
        q: 'How much does a project cost?',
        a: 'Each package has a fixed price. You get the exact number when you enquire, and it does not change once we start.',
      },
      {
        q: 'Do you work with hourly rates?',
        a: 'No. Fixed prices, agreed before anything begins. You should never feel nervous about sending me an email.',
      },
      {
        q: 'Do you take on retainers?',
        a: 'Yes, for ongoing design and art direction once a brand is established. It works best when there is a steady flow of applied work.',
      },
    ],
  },
  {
    title: 'Practicalities',
    questions: [
      {
        q: 'How long does a typical project take?',
        a: 'Identity projects usually run four to six weeks. Packaging depends on how many products. Your proposal will have the honest timeline before you commit to anything.',
      },
      {
        q: 'Will I own the final files?',
        a: 'Yes. On final payment, full ownership of the delivered work transfers to you, including editable source files.',
      },
      {
        q: 'Can you sign an NDA?',
        a: 'Yes. Send it over before we talk and I will sign it.',
      },
    ],
  },
];
