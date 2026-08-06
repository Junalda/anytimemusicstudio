/**
 * Troubleshooting quick-answers shown at the bottom of How To.
 * Each item is a common problem + editable placeholder steps.
 * Replace the "TODO" lines with the exact technical steps.
 */

export interface TroubleshootingEntry {
  id: string;
  question: string;
  steps: string[];
}

export const troubleshooting: TroubleshootingEntry[] = [
  {
    id: 'cant-hear-myself',
    question: 'I can’t hear myself',
    steps: [
      'TODO: Check your personal monitor / in-ear volume is up.',
      'TODO: Confirm your channel is selected in the monitor mix.',
      'TODO: Check your headphones / in-ears are connected to the right output.',
    ],
  },
  {
    id: 'mic-not-working',
    question: 'My microphone isn’t working',
    steps: [
      'TODO: Check the cable is fully connected at both ends.',
      'TODO: Confirm the channel is not muted and the level is up.',
      'TODO: Enable phantom power if the microphone requires it.',
    ],
  },
  {
    id: 'in-ears-not-working',
    question: 'My in-ears aren’t working',
    steps: [
      'TODO: Check the in-ear pack is powered on and the battery is charged.',
      'TODO: Confirm the correct channel is selected.',
      'TODO: Start at a low volume, then raise gradually.',
    ],
  },
  {
    id: 'cant-start-recording',
    question: 'I can’t start the recording',
    steps: [
      'TODO: Confirm the recording system is powered on.',
      'TODO: Check there is available storage space.',
      'TODO: Make sure an input / track is armed before pressing record.',
    ],
  },
  {
    id: 'lights-not-responding',
    question: 'The lights aren’t responding',
    steps: [
      'TODO: Check the lighting controller is powered on.',
      'TODO: Try selecting a different preset scene.',
      'TODO: If still unresponsive, contact studio support.',
    ],
  },
];
