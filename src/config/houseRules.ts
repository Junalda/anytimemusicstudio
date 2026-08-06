/**
 * House rules content. Each rule is icon + title + one short line.
 * Add, remove or reorder freely — the page renders whatever is here.
 * `icon` maps to a key in src/components/Icon.astro.
 */

export interface HouseRuleItem {
  icon: string;
  title: string;
  body: string;
}

export const houseRules: HouseRuleItem[] = [
  {
    icon: 'space',
    title: 'Respect the space',
    body: 'Treat the studio, instruments, furniture and equipment with care.',
  },
  {
    icon: 'clock',
    title: 'Respect your booking',
    body: 'Your setup and cleanup time are part of your booked session. Please leave the studio on time for the next artist.',
  },
  {
    icon: 'equipment',
    title: 'Equipment',
    body: 'Do not unplug, move, rewire or change studio equipment unless instructed to. If you are unsure how something works, use the How To section instead.',
  },
  {
    icon: 'cup',
    title: 'Food & drinks',
    body: 'Food and drinks must be kept away from mixers, microphones, instruments and other studio equipment.',
  },
  {
    icon: 'sparkle',
    title: 'Leave it ready',
    body: 'Leave the studio clean and organized. Return equipment, cables, microphone stands and furniture to their original position.',
  },
  {
    icon: 'people',
    title: 'Your guests, your responsibility',
    body: 'The person who booked the studio is responsible for everyone they bring into the studio.',
  },
  {
    icon: 'no-smoking',
    title: 'No smoking, vaping or drugs',
    body: 'Smoking, vaping and drug use are not permitted inside the studio.',
  },
  {
    icon: 'privacy',
    title: 'Respect privacy',
    body: 'Do not photograph, film or record other artists, clients or sessions without their permission.',
  },
  {
    icon: 'report',
    title: 'Report problems',
    body: 'If equipment is damaged, missing or not working correctly, report it immediately. Do not attempt to repair studio equipment yourself.',
  },
  {
    icon: 'shield',
    title: 'Damage',
    body: 'Damage caused by misuse or negligence may be charged to the person responsible for the booking.',
  },
  {
    icon: 'bag',
    title: 'Personal belongings',
    body: 'Personal belongings are brought into the studio at your own risk. Anytime Music Studio is not responsible for lost, stolen or damaged property.',
  },
];
