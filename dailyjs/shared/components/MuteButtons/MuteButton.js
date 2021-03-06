import React, { useState } from 'react';
import { ReactComponent as IconCameraOff } from '@dailyjs/shared/icons/camera-off-md.svg';
import { ReactComponent as IconCameraOn } from '@dailyjs/shared/icons/camera-on-md.svg';
import { ReactComponent as IconMicOff } from '@dailyjs/shared/icons/mic-off-md.svg';
import { ReactComponent as IconMicOn } from '@dailyjs/shared/icons/mic-on-md.svg';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallState } from '../../contexts/CallProvider';
import { Button } from '../Button';

export const MuteButton = ({ isMuted, mic = false, className, ...props }) => {
  const { callObject } = useCallState();
  const [muted, setMuted] = useState(!isMuted);

  const toggleDevice = (newState) => {
    if (mic) {
      callObject.setLocalAudio(newState);
    } else {
      callObject.setLocalVideo(newState);
    }

    setMuted(newState);
  };

  const Icon = mic
    ? [<IconMicOff />, <IconMicOn />]
    : [<IconCameraOff />, <IconCameraOn />];

  if (!callObject) return null;

  const cx = classNames(className, { muted: !muted });

  return (
    <Button
      size="large-circle"
      variant="blur"
      className={cx}
      {...props}
      onClick={() => toggleDevice(!muted)}
    >
      {Icon[+muted]}
    </Button>
  );
};

MuteButton.propTypes = {
  isMuted: PropTypes.bool,
  mic: PropTypes.bool,
  className: PropTypes.string,
};

export default MuteButton;
