import React, { useState } from 'react';
import { logo, menu, search, thirdweb } from '../assets';
import { navlinks } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import CustomButton from './CustomButton';
import { useStateContext } from '../context';

function Navbar() {
	const navigate = useNavigate();
	const [isActive, setIsActive] = useState('dashboard');
	const [toggleDrawer, setToggleDrawer] = useState(false);
	const { address, connect } = useStateContext();
	const handleButtonClick = () => {
		if (address) {
			navigate('/create-campaign');
		} else {
			connect();
		}
	};

	return (
		<div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
			<div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-full'>
				<input
					type='text'
					placeholder='Search campaigns'
					className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none'
				/>
				<div className='w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer'>
					<img src={search} alt='search' className='w-[15px] h-[15px] object-contain' />
				</div>
			</div>
			<div className='sm:flex hidden flex-row justify-end gap-4 items-center'>
				<CustomButton
					btnType='button'
					title={address ? 'Create a campaign' : 'Connect'}
					styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
					handleClick={handleButtonClick}
				/>
				<Link to='/profile'>
					<div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
						<img src={thirdweb} alt='user' className='w-[60%] h-[60%] object-contain' />
					</div>
				</Link>
			</div>

			{/* Small screen navigation */}
			<div className='sm:hidden flex justify-between items-center relative'>
				<div className='w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
					<img src={logo} alt='user' className='w-[60%] h-[60%] object-contain' />
				</div>
				<img
					src={menu}
					alt='menu'
					className='w-[34px] h-[34px] object-contain cursor-pointer'
					onClick={() => setToggleDrawer(prev => !prev)}
				/>
				<div
					className={`absolute top-[60px] left-0 right-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
						!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-[0]'
					} transition-all duration-700`}
				>
					<ul className='mb-4'>
						{navlinks.map(link => (
							<li
								key={link.name}
								className={`flex items-center p-4 rounded-[10px] ${isActive === link.name ? 'bg-[#3a3a43]' : ''} ${
									link.disabled ? 'opacity-50' : 'cursor-pointer'
								}`}
								onClick={() => {
									if (!link.disabled) {
										navigate(link.link);
										setIsActive(link.name);
										setToggleDrawer(false);
									}
								}}
							>
								<div className='flex justify-center items-center gap-4'>
									<img src={link.imgUrl} alt={link.name} className='w-[20px] h-[20px] object-contain' />
									<p className=' ml-[20px] font-epilogue font-normal text-[14px] text-white'>{link.name}</p>
								</div>
							</li>
						))}
					</ul>

					<div className='flex mx-4'>
						<CustomButton
							btnType='button'
							title={address ? 'Create a campaign' : 'Connect'}
							styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
							handleClick={handleButtonClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Navbar;
