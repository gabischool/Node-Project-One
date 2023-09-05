import { useRef, useState } from 'react'
import {Users} from '../index'
import { MdClear } from 'react-icons/md'
const Home = () => {
	const userRef = useRef(null);
	const [ inputValues , setInputValues ] = useState('');
	const handleInput = () => {
		userRef.current.value= '';
		const close = document.querySelector('.close');
		close.classList = 'hidden';
		window.location.reload();
	}
  return (
	<div className='w-full mt-10 p-1 md:w-[73%] mx-auto md:p-5'>
		<div className='w-[90%] md:w-[50%] relative'>
			<input ref={userRef} className='p-3 w-full rounded shadow border-none outline-blue-500' type="text" placeholder='search for ... ' onChange={(e) => setInputValues(e.target.value)}/>
			<MdClear className={`absolute right-3 close top-3 ${inputValues == '' ? 'hidden' : 'block'} `}size={25} onClick={() => handleInput()}/>
		</div>
		<Users inputValues={inputValues}/>
	</div>
  )
}

export default Home