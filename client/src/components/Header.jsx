import { Link } from "react-router-dom"

const Header = () => {
  return (
	<div className="w-full md:w-[70%] mx-auto p-5 bg-blue-500 text-white">
		<div className="flex flex-row justify-between items-center">
			<h1 className="text-3xl tracking-tighter italic capitalize">crud</h1>
			<ul className="flex flex-row justify-evenly items-center gap-3">
				<Link className="text-xl tracking-widest italic" to='/'>Lists</Link>
				<span className="text-xl tracking-widest italic"> |  </span>
				<Link className="text-xl tracking-widest italic" to='/Add_Info'>AddNewUser</Link>
			</ul> 
		</div>
	</div>
  )
}

export default Header