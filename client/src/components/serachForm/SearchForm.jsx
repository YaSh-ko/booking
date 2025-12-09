import { useEffect, useState } from 'react';
import './searchForm.scss';

export const SearchForm = ({onSearch, selectedType, searchData}) => {
    const [formData, setFormData] = useState({
        city: searchData?.city || '',
        checkIn: searchData?.checkIn || '',
        checkOut: searchData?.checkOut || '',
        guests: searchData?.guests || 1,
        type: selectedType || "hotel"
    });

    useEffect(()=>{
        setFormData(prev => ({...prev, type: selectedType})); 
    }, [selectedType])

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!formData.city.trim()) {
            alert('Введите город для поиска');
            return;
        }

        await onSearch(formData);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <form onSubmit={handleSubmit} className='search-form'>
            <div className="search-form__group search-form__group-city">
                <label className="search-form__label" htmlFor="cityValue">Город</label>
                <input 
                    type="text" 
                    name='city'
                    className='search-form__input'
                    id='cityValue'
                    placeholder='Введите город'
                    value={formData.city}
                    onChange={handleChange}
                    required    
                />
            </div>
            
            <div className="search-form__group search-form__group-checkin">
                <label className="search-form__label"  htmlFor="checkInValue">Заезд</label>
                <input 
                    type="date" 
                    name='checkIn'
                    id='checkInValue'
                    className='search-form__input'
                    placeholder='Заезд'
                    value={formData.checkIn}
                    onChange={handleChange}
                    required    
                />
            </div>

            
            <div className="search-form__group search-form__group-checkout">
                <label className="search-form__label" htmlFor="checkOutValue">Выезд</label>
                <input 
                    type="date" 
                    name='checkOut'
                    className='search-form__input'
                    id='checkOutValue'
                    placeholder='Выезд'
                    value={formData.checkOut}
                    onChange={handleChange}
                    required    
                />
            </div>

            
            <div className="search-form__group search-form__group-guests">
                <label className="search-form__label" htmlFor="guestsValue">Гости</label>
                <input 
                    type="number" 
                    name='guests'
                    className='search-form__input'
                    id='guestsValue'
                    placeholder='Введите количество гостей'
                    value={formData.guests}
                    onChange={handleChange}
                    required    
                />
            </div>

            <button
                type='submit'
                className='search-form__button'
            >
                Найти
            </button>

        </form>
    )
}