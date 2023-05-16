import React from 'react';

const FormField = ({ labelName, placeholder, inputType, value, handleChange, required }) => {
	const isTextArea = inputType === 'textarea';

	return (
		<label className='flex-1 w-full flex flex-col'>
			{labelName && (
				<span className='font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]'>
					{labelName}
				</span>
			)}
			{isTextArea ? (
				<textarea
					required
					className='font-epilogue font-normal text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#3a3a43] border-[1px] border-[#3a3a43] focus:outline-none focus:border-[#3a3a43]'
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					rows={10}
				/>
			) : (
				<input
					required={required}
					type={inputType}
					className='font-epilogue font-normal text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] bg-[#3a3a43] border-[1px] border-[#3a3a43] focus:outline-none focus:border-[#3a3a43]'
					placeholder={placeholder}
					value={value}
					onChange={handleChange}
					step={0.1}
				/>
			)}
		</label>
	);
};

export default FormField;
