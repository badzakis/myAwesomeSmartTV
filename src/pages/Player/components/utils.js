import PlayerButtons from "./components/PlayerButtons/PlayerButtons";

export const formatTimeHMS = (seconds) => {
  const hours = floorStringPad(seconds / 3600);
  const minutes = floorStringPad((seconds % 3600) / 60);
  const remainingSeconds = floorStringPad(seconds % 60);
  return `${hours}:${minutes}:${remainingSeconds}`;
};

const floorStringPad = (number) =>
  Math.floor(number).toString().padStart(2, "0");

export const playerButtonsVOD = [
  {
    type: PlayerButtons,
    collision: true,
    props: {
      buttonInfo: {
        label: "backward",
        icon: `icons/player/commands/fast-backward.svg`,
        onLiveContent: false,
        position: 660,
      },
    },
  },
  {
    type: PlayerButtons,
    collision: true,
    props: {
      buttonInfo: {
        label: "pause",
        icon: `icons/player/commands/pause.svg`,
        onLiveContent: true,
        position: 690,
      },
    },
  },
  {
    type: PlayerButtons,
    collision: true,
    props: {
      buttonInfo: {
        label: "forward",
        icon: `icons/player/commands/fast-forward.svg`,
        onLiveContent: false,
        position: 720,
      },
    },
  },
];
