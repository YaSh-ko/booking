import './hotelCard.scss';

export const HotelCard = ({hotel}) => {
    console.log("Отель", hotel);
    return (
        <div className="hotel-card">
            <img src={hotel.img} alt="Фото отеля" />
            <div className="hotel-card__desrciption">
                <div className='hotel-card__description-top'>
                    <h1>{hotel.name}</h1>
                    <h2>{hotel.city}</h2>
                </div>

                <p>{hotel.description}</p>
                
                <div className="hotel-card__desrciption-bottom">
                    <span className="hotel-card__price">От {hotel.price.toFixed(3)} Р</span>
                    <button>Выбрать места</button>
                </div>
            </div>
        </div>
    )
}