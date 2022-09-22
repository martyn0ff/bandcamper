import {
  IoVolumeMute,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
} from "react-icons/io5";
import VolumeIconProps from "../models/ui/volumeicon-props";

const VolumeIcon = (props: VolumeIconProps) => {
  const { volume, setShowVolume, muted, setMuted } = props;
  if (volume === 0 || muted) {
    return (
      <IoVolumeMute
        size="1.5rem"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        onClick={() => setMuted(!muted)}
      />
    );
  }
  if (volume <= 0.33) {
    return (
      <IoVolumeLow
        size="1.5rem"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        onClick={() => setMuted(!muted)}
      />
    );
  }
  if (volume <= 0.66) {
    return (
      <IoVolumeMedium
        size="1.5rem"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
        onClick={() => setMuted(!muted)}
      />
    );
  }
  return (
    <IoVolumeHigh
      size="1.5rem"
      onMouseEnter={() => setShowVolume(true)}
      onMouseLeave={() => setShowVolume(false)}
      onClick={() => setMuted(!muted)}
    />
  );
};

export default VolumeIcon;
