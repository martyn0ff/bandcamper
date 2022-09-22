export default interface VolumeIconProps {
  volume: number;
  muted: boolean;
  setShowVolume: React.Dispatch<React.SetStateAction<boolean>>;
  setMuted: React.Dispatch<React.SetStateAction<boolean>>;
}
