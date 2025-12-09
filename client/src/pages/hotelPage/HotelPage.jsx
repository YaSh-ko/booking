import { useLocation, useParams } from 'react-router-dom';

export function HotelPage() {
  const { id } = useParams();

  return <h1>Страницы отеля</h1>;
}
