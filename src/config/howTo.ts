/**
 * "How To" studio guides.
 *
 * Each guide renders as an expandable accordion. The `blocks` array
 * is intentionally flexible so you can drop in real content later
 * without touching any component code:
 *
 *   { type: 'text',  value: 'A paragraph of instructions.' }
 *   { type: 'steps', value: ['Step one', 'Step two'] }
 *   { type: 'note',  value: 'A highlighted tip or warning.' }
 *   { type: 'image', src: '/how-to/monitor.jpg', alt: 'Description' }
 *   { type: 'video', src: 'https://...', title: 'Tutorial' }
 *
 * Placeholders below are marked "TODO" — replace with the exact
 * technical steps for this studio.
 */

export type GuideBlock =
  | { type: 'text'; value: string }
  | { type: 'steps'; value: string[] }
  | { type: 'note'; value: string; variant?: 'tip' | 'warning' }
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; title?: string };

export interface HowToGuideItem {
  id: string;
  icon: string;
  title: string;
  summary: string;
  blocks: GuideBlock[];
}

export const howToGuides: HowToGuideItem[] = [
  {
    id: 'personal-monitor',
    icon: 'headphones',
    title: 'Personal Monitor',
    summary: 'Set up and adjust your own monitor mix.',
    blocks: [
      {
        type: 'note',
        value:
          'First connect to the studio WiFi, then install the MX-Q app — it’s what you use to control your personal mix. You need to be on the studio network for the app to find your mixer.',
        variant: 'tip',
      },
      {
        type: 'text',
        value:
          'The personal monitoring system lets each musician build their own mix — more of yourself, less of everything else, without affecting anyone else.',
      },
      {
        type: 'steps',
        value: [
          'TODO: How to power on / access the personal monitor unit.',
          'TODO: How to select your own instrument or channel.',
          'TODO: How to raise and lower each channel in your mix.',
          'TODO: How to save or reset your mix.',
        ],
      },
      {
        type: 'note',
        value: 'Placeholder for a short tutorial video and photos of the monitor unit.',
        variant: 'tip',
      },
      {
        type: 'text',
        value: 'Troubleshooting: TODO — what to check if you hear nothing in your monitor.',
      },
    ],
  },
  {
    id: 'in-ears',
    icon: 'earbud',
    title: 'In-Ears',
    summary: 'Connect and safely use in-ear monitors.',
    blocks: [
      {
        type: 'note',
        value:
          'Always start at a low volume and increase gradually. In-ears sit directly in your ear — sudden loud levels can damage your hearing.',
        variant: 'warning',
      },
      {
        type: 'steps',
        value: [
          'TODO: Where to plug in your in-ear pack / receiver.',
          'TODO: How to set your channel and starting volume.',
          'TODO: How to adjust the balance during your session.',
        ],
      },
    ],
  },
  {
    id: 'microphones',
    icon: 'mic',
    title: 'Microphones',
    summary: 'Use and connect the available microphones.',
    blocks: [
      {
        type: 'steps',
        value: [
          'TODO: Which microphones are available and what each is best for.',
          'TODO: How to connect a microphone to an input.',
          'TODO: How to enable phantom power (if required) — and when not to.',
        ],
      },
      {
        type: 'note',
        value: 'Handle microphones gently and return them to their stands or cases afterward.',
        variant: 'tip',
      },
    ],
  },
  {
    id: 'lighting',
    icon: 'bulb',
    title: 'Lighting',
    summary: 'Select or change the lighting scenes.',
    blocks: [
      {
        type: 'steps',
        value: [
          'TODO: Where the lighting controller / panel is located.',
          'TODO: How to select a preset lighting scene.',
          'TODO: How to adjust brightness or colour, if allowed.',
        ],
      },
    ],
  },
  {
    id: 'recording',
    icon: 'record',
    title: 'Recording',
    summary: 'Start, stop and access your recording.',
    blocks: [
      {
        type: 'steps',
        value: [
          'TODO: How to start a recording.',
          'TODO: How to stop a recording.',
          'TODO: Where recordings are saved and how to access or export them.',
        ],
      },
      {
        type: 'note',
        value: 'Always stop your recording before ending your session so nothing is lost.',
        variant: 'tip',
      },
    ],
  },
  {
    id: 'mixer',
    icon: 'sliders',
    title: 'Mixer',
    summary: 'The controls you are welcome to use.',
    blocks: [
      {
        type: 'text',
        value: 'You are welcome to adjust the following on the mixer:',
      },
      {
        type: 'steps',
        value: [
          'TODO: Channel levels you may control.',
          'TODO: Basic EQ or gain, if permitted.',
        ],
      },
      {
        type: 'note',
        value:
          'Please do not change advanced routing, patching or system settings. If a mix needs deeper changes, contact studio support.',
        variant: 'warning',
      },
    ],
  },
  {
    id: 'end-session',
    icon: 'check',
    title: 'End Your Session',
    summary: 'A quick checklist before you leave.',
    blocks: [
      {
        type: 'steps',
        value: [
          'Stop all recordings.',
          'Return microphones.',
          'Return cables.',
          'Return microphone stands.',
          'Remove personal belongings.',
          'Throw away waste.',
          'Check the room.',
          'Leave the studio ready for the next artist.',
        ],
      },
    ],
  },
];
