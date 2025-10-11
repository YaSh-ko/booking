import { useEffect, useState } from 'react';
import './searchForm.scss';

export const SearchForm = ({onSearch, selectedType}) => {
    
    const [formData, setFormData] = useState({
        city: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
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
        <form onSubmit={handleSubmit} className='searchForm'>
            <div className="form-group city">
                <label htmlFor="">Город</label>
                <input 
                    type="text" 
                    name='city'
                    id='cityValue'
                    placeholder='Введите город'
                    value={formData.city}
                    onChange={handleChange}
                    required    
                />
            </div>
            <span className='form-line'></span>
            
            <div className="form-group">
                <label htmlFor="checkInValue">Заезд</label>
                <input 
                    type="date" 
                    name='checkIn'
                    id='checkInValue'
                    placeholder='Заезд'
                    value={formData.checkIn}
                    onChange={handleChange}
                    required    
                />
            </div>
            <span className='form-line'></span>

            
            <div className="form-group">
                <label htmlFor="checkOutValue">Выезд</label>
                <input 
                    type="date" 
                    name='checkOut'
                    id='checkOutValue'
                    placeholder='Выезд'
                    value={formData.checkOut}
                    onChange={handleChange}
                    required    
                />
            </div>
            <span className='form-line'></span>

            
            <div className="form-group guests">
                <label htmlFor="guestsValue">Гости</label>
                <input 
                    type="number" 
                    name='guests'
                    id='guestsValue'
                    placeholder='Введите количество гостей'
                    value={formData.guests}
                    onChange={handleChange}
                    required    
                />
            </div>

            <button
                type='submit'
                className='search-button'
            >
                Найти
            </button>

        </form>
    )
}