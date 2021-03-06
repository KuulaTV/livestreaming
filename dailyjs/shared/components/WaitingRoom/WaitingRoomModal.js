import React from 'react';
import Modal from '@dailyjs/shared/components/Modal';
import { useWaitingRoom } from '@dailyjs/shared/contexts/WaitingRoomProvider';
import PropTypes from 'prop-types';
import { Button } from '../Button';
import { WaitingParticipantRow } from './WaitingParticipantRow';

export const WaitingRoomModal = ({ onClose }) => {
  const { denyAccess, grantAccess, waitingParticipants } = useWaitingRoom();

  const handleAllowAllClick = (close) => {
    grantAccess('all');
    close();
  };
  const handleDenyAllClick = (close) => {
    denyAccess('all');
    close();
  };

  return (
    <Modal
      title="Waiting room"
      isOpen
      onClose={() => onClose()}
      actions={[
        <Button fullWidth onClick={handleAllowAllClick} variant="success">
          Allow all
        </Button>,
        <Button fullWidth onClick={handleDenyAllClick} variant="warning">
          Deny all
        </Button>,
      ]}
    >
      {waitingParticipants.map((p) => (
        <WaitingParticipantRow participant={p} key={p.id} />
      ))}
    </Modal>
  );
};

WaitingRoomModal.propTypes = {
  onClose: PropTypes.func,
};

export default WaitingRoomModal;
