import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['Все', 'Фрукты', 'Напитки', 'Хлеб', 'Молочные', 'Мясо'];
  const brands = ['Organic Farm', 'Fresh Market', 'Premium Choice', 'Daily Goods'];

  const products = [
    {
      id: 1,
      name: 'Органические яблоки',
      price: 299,
      brand: 'Organic Farm',
      category: 'Фрукты',
      image: '/img/6f7d493f-6909-453f-b068-68322a203847.jpg',
      description: 'Свежие органические яблоки высшего качества'
    },
    {
      id: 2,
      name: 'Премиум кофе',
      price: 899,
      brand: 'Premium Choice',
      category: 'Напитки',
      image: '/img/2aa441e2-65f3-4111-8fdf-aaf3274f4c8c.jpg',
      description: 'Элитные зерна арабики прямо от производителя'
    },
    {
      id: 3,
      name: 'Свежий хлеб',
      price: 159,
      brand: 'Daily Goods',
      category: 'Хлеб',
      image: '/img/3b5b9f90-72bf-4d20-b9f7-e11d3b9948ca.jpg',
      description: 'Ароматный хлеб, выпеченный сегодня утром'
    },
    {
      id: 4,
      name: 'Фермерское молоко',
      price: 89,
      brand: 'Fresh Market',
      category: 'Молочные',
      image: '/img/6f7d493f-6909-453f-b068-68322a203847.jpg',
      description: 'Натуральное молоко от фермерских хозяйств'
    },
    {
      id: 5,
      name: 'Говядина премиум',
      price: 1299,
      brand: 'Premium Choice',
      category: 'Мясо',
      image: '/img/2aa441e2-65f3-4111-8fdf-aaf3274f4c8c.jpg',
      description: 'Мраморная говядина высшего сорта'
    },
    {
      id: 6,
      name: 'Апельсиновый сок',
      price: 199,
      brand: 'Fresh Market',
      category: 'Напитки',
      image: '/img/3b5b9f90-72bf-4d20-b9f7-e11d3b9948ca.jpg',
      description: '100% натуральный сок без добавок'
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'Все' || product.category === selectedCategory;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const searchMatch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && priceMatch && brandMatch && searchMatch;
  });

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white font-['Helvetica'] text-black">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold">STORE</div>
          <nav className="hidden md:flex space-x-8">
            <a href="#catalog" className="text-black hover:text-gray-600 transition-colors">Каталог</a>
            <a href="#about" className="text-black hover:text-gray-600 transition-colors">О нас</a>
            <a href="#delivery" className="text-black hover:text-gray-600 transition-colors">Доставка</a>
            <a href="#contacts" className="text-black hover:text-gray-600 transition-colors">Контакты</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-black text-white text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Качественные продукты</h1>
          <p className="text-xl text-gray-600 mb-8">Свежие и натуральные продукты с доставкой на дом</p>
          <div className="max-w-md mx-auto relative">
            <Input
              placeholder="Поиск продуктов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-12 h-12 text-lg border-2 border-black"
            />
            <Icon name="Search" size={20} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="catalog" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Каталог</h2>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4 space-y-6">
              <div>
                <h3 className="font-bold mb-4">Категории</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "ghost"}
                      className={`w-full justify-start ${selectedCategory === category ? 'bg-black text-white' : ''}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Цена (₽)</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1500}
                    step={50}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0]} ₽</span>
                    <span>{priceRange[1]} ₽</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-4">Бренды</h3>
                <div className="space-y-3">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={brand}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandToggle(brand)}
                      />
                      <label htmlFor={brand} className="text-sm cursor-pointer">{brand}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="mb-2">{product.brand}</Badge>
                      <h3 className="font-bold mb-2">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{product.price} ₽</span>
                        <Button onClick={addToCart} className="bg-black text-white hover:bg-gray-800">
                          <Icon name="Plus" size={16} className="mr-2" />
                          В корзину
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">О нас</h2>
          <p className="text-lg text-gray-600 mb-8">
            Мы — команда профессионалов, которая уже более 10 лет поставляет качественные продукты. 
            Наша миссия — обеспечить каждую семью свежими и натуральными продуктами по доступным ценам.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Icon name="Truck" size={48} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем в день заказа</p>
            </div>
            <div>
              <Icon name="Shield" size={48} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Гарантия качества</h3>
              <p className="text-gray-600">100% качественные продукты</p>
            </div>
            <div>
              <Icon name="Heart" size={48} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Забота о клиентах</h3>
              <p className="text-gray-600">Персональный подход</p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section id="delivery" className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Доставка</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-bold mb-4">Условия доставки</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Бесплатная доставка от 1500 ₽</li>
                <li>• Доставка в день заказа</li>
                <li>• Время доставки: 2-4 часа</li>
                <li>• Работаем с 8:00 до 22:00</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Зоны доставки</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• В пределах МКАД — 200 ₽</li>
                <li>• До 10 км от МКАД — 300 ₽</li>
                <li>• До 20 км от МКАД — 400 ₽</li>
                <li>• Самовывоз — бесплатно</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <Icon name="Phone" size={32} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Телефон</h3>
              <p className="text-gray-600">+7 (495) 123-45-67</p>
            </div>
            <div>
              <Icon name="Mail" size={32} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-gray-600">info@store.ru</p>
            </div>
            <div>
              <Icon name="MapPin" size={32} className="mx-auto mb-4" />
              <h3 className="font-bold mb-2">Адрес</h3>
              <p className="text-gray-600">г. Москва, ул. Примерная, д. 1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 STORE. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;