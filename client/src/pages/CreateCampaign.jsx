import React, { useState } from 'react';
import { ethers } from 'ethers';
import { money } from '../assets';
import { useStateContext } from '../context';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';
import { useNavigate } from 'react-router-dom';

function CreateCampaign() {
	const { createCampaign } = useStateContext();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [form, setForm] = useState({
		name: '',
		title: '',
		description: '',
		target: '',
		deadline: '',
		image: '',
	});
	const handleSubmit = async e => {
		e.preventDefault();

		checkIfImage(form.image, async exists => {
			if (exists) {
				setIsLoading(true);
				await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18) });
				setIsLoading(false);
				navigate('/');
			} else {
				alert('Invalid image URL');
				setForm(prevState => ({ ...prevState, image: '' }));
			}
		});
	};
	const handleFormFieldChange = (e, fieldName) => {
		setForm(prevState => ({ ...prevState, [fieldName]: e.target.value }));
	};

	return (
		<div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
			{isLoading && <Loader />}
			<div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
				<h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
					Start a campaign
				</h1>
			</div>

			<form onSubmit={handleSubmit} className='w-full mt-[65px] flex flex-col gap-[30px]'>
				<div className='flex flex-wrap gap-[40px]'>
					<FormField
						labelName='Your Name *'
						placeholder='Kirill Petunin'
						inputType='text'
						value={form.name}
						handleChange={e => handleFormFieldChange(e, 'name')}
						required
					/>
					<FormField
						labelName='Campaign Title *'
						placeholder='Write a title'
						inputType='text'
						value={form.title}
						handleChange={e => handleFormFieldChange(e, 'title')}
						required
					/>
				</div>

				<FormField
					labelName='Story *'
					placeholder='Tell your story'
					inputType='textarea'
					value={form.description}
					handleChange={e => handleFormFieldChange(e, 'description')}
					required
				/>
				<div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px]'>
					<img src={money} alt='money' className='w-[40px] h-[40px] object-contain ' />
					<h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>
						You will get 100% of the raised amount
					</h4>
				</div>
				<div className='flex flex-wrap gap-[40px]'>
					<FormField
						labelName='Goal *'
						placeholder='ETH 0.50'
						inputType='number'
						value={form.target}
						handleChange={e => handleFormFieldChange(e, 'target')}
						required
					/>
					<FormField
						labelName='End Date *'
						placeholder='End Date *'
						inputType='date'
						value={form.deadline}
						handleChange={e => handleFormFieldChange(e, 'deadline')}
						required
					/>
				</div>
				<FormField
					labelName='Campaign Image *'
					placeholder='Place image URL of your pretty campaign'
					inputType='text'
					value={form.image}
					handleChange={e => handleFormFieldChange(e, 'image')}
					required
				/>
				<div className='flex justify-center items-center mt-[40px]'>
					<CustomButton
						btnType='submit'
						title='Create Campaign'
						styles='bg-[#1dc071] w-[200px] h-[52px] text-[18px] leading-[26px] text-white'
						handleClick={() => {}}
					/>
				</div>
			</form>
		</div>
	);
}

export default CreateCampaign;
