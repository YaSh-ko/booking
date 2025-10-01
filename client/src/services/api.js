const API_BASE_URL = 'http://localhost:3234/api'

const mockHotels = [
  { 
    id: 1, 
    name: 'Grand Hotel Moscow', 
    city: 'Moscow', 
    price: 4500, 
    rating: 4.5, 
    amenities: ['wifi', 'pool', 'spa'],
    image: '🏨',
    description: 'Роскошный отель в центре Москвы'
  },
  { 
    id: 2, 
    name: 'Red Square Hotel', 
    city: 'Moscow', 
    price: 3200, 
    rating: 4.2, 
    amenities: ['wifi', 'breakfast', 'gym'],
    image: '🏛️',
    description: 'Отель с видом на Красную площадь'
  },
  { 
    id: 3, 
    name: 'Neva River Hotel', 
    city: 'Saint Petersburg', 
    price: 2800, 
    rating: 4.3, 
    amenities: ['wifi', 'breakfast'],
    image: '🌉',
    description: 'Уютный отель на берегу Невы'
  },
  { 
    id: 4, 
    name: 'Black Sea Resort', 
    city: 'Sochi', 
    price: 4200, 
    rating: 4.4, 
    amenities: ['wifi', 'pool', 'beach', 'spa'],
    image: '🏖️',
    description: 'Курортный отель на берегу моря'
  },
  { 
    id: 5, 
    name: 'Mountain View', 
    city: 'Sochi', 
    price: 2900, 
    rating: 4.0, 
    amenities: ['wifi', 'breakfast', 'parking'],
    image: '⛰️',
    description: 'Отель с видом на горы'
  },
  { 
    id: 6, 
    name: 'Golden Ring Hotel', 
    city: 'Suzdal', 
    price: 2200, 
    rating: 4.1, 
    amenities: ['wifi', 'breakfast'],
    image: '⛪',
    description: 'Исторический отель в Золотом кольце'
  }
]

export const searchHotels = async (searchParams) => {
    try {
        const urlParams = new URLSearchParams({
            city: searchParams.city || '',
            checkIn: searchParams.checkIn || '',
            checkOut: searchParams.checkOut || '',
            guests: searchParams.guests || 1
        })
        const url = `${API_BASE_URL}/hotels?${urlParams}`;
        const response = await fetch(url)

        if(!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`)
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
    catch (error) {
        console.error("Ошибка подключения", error.message);
        return mockHotels;
    }
}