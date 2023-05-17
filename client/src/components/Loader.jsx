import React from 'react';

import { loader } from '../assets';

const Loader = ({ isTransaction }) => {
	return (
		<div
			className={`${
				isTransaction && 'inset-0 z-10 fixed bg-[rgba(0,0,0,0.7)]'
			} flex items-center justify-center flex-col h-screen w-full`}
		>
			<img src={loader} alt='loader' className='w-[100px] h-[100px] object-contain' />
			{isTransaction && (
				<p className='mt-[20px] font-epilogue font-bold text-[20px] text-white text-center'>
					Transaction is in progress <br /> Please wait...
				</p>
			)}
		</div>
	);
};

export default Loader;
