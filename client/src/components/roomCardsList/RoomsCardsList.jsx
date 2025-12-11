// RoomList.jsx - список карточек
import { RoomCard } from '../roomCard/roomCard';
import './roomsCardsList.scss';

export const RoomsCardsList = ({ rooms }) => {
  if (!rooms.length) {
    return (
      <div className="room-list__empty">
        <p>Нет доступных номеров</p>
      </div>
    );
  }

  return (
    <div className="room-list">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};
