import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

function NavigationMenu() {
    const [select, setSelect] = useState<string>("Reports");

    return (
        <nav className="fixed top-8 left-0 pt-3 flex flex-col min-w-[270px] w-[270px] h-[95%] bg-[#1D1D27] rounded-r-[40px] items-center overflow-hidden">
            <div className='mt-2 self-start pl-8'>
                <img width={"120px"} src="src/assets/images/logo.png" alt="company logo" />
            </div>
            <div className="w-full h-full flex flex-col">
                <div className="w-full flex-1">
                    <ul className='mt-10 w-full pl-8 flex flex-col gap-10 mb-2'>
                        <NavItems logo='src/assets/images/navbar/layer1.svg' name='Reports' location='/dashboard' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Stock Phones.svg' name='Stock Phones' location='/StockPhones' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Return Phones.svg' name='Return Phones' location='/returnPhone' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Items.svg' name='Items' location='/item' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Return item.svg' name='Return Items' location='/returnItem' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Users.svg' name='Users' location='/user' selected={setSelect} isSelected={select} />
                        <NavItems logo='src/assets/images/navbar/Shops.svg' name='Shops' location='/shop' selected={setSelect} isSelected={select} />
                        {/*<NavItems logo='src/assets/images/navbar/Shops.svg' name='order' location='/order' selected={setSelect} isSelected={select} />*/}
                    </ul>
                </div>

                <div className='w-full px-8 mb-5'>
                    <NavLink to="/order" className="mt-5 flex text-[25px] w-full justify-center rounded-md bg-[#5356EC] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center gap-3">
                        <img src="src/assets/images/navbar/cart-svgrepo-com 1.svg" alt="" />
                        Place Order
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default NavigationMenu;

interface INavItems {
    name: string
    location: string
    selected: Function
    isSelected: string
    logo?: string
}

function NavItems({ name, selected, isSelected, location, logo }: INavItems) {
    return (
        <li className={clsx(isSelected === name ? "text-[#5356EC]" : "text-[#959595]")} onClick={() => selected(name)}>
            <Link to={location} className='gap-4 flex items-center'>
                <img width={"30px"} src={logo} alt="" />
                <p className='text-[19px] font-medium'>{name}</p>
            </Link>
        </li>
    );
}
