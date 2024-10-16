const LoginInput = ({icon: Icon, ...props}) =>{
    return (
		<div className='relative mb-6 px-2'>
			<div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
				<Icon className='size-5 text-orange-500' />
			</div>
			<input
				{...props}
				className='w-full pl-10 pr-3 py-2 bg-white bg-opacity-50 rounded-lg border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500 text-orange-600 placeholder-orange-500 transition duration-200'
			/>
		</div>
	);
}

export default LoginInput;