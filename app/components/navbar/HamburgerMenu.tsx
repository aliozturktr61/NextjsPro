import { RxHamburgerMenu } from "react-icons/rx"


const HamburgerMenu = () => {
  return (/* normalde flex ama md ekranlarda gizlenecek */
    <div className="relative flex md:hidden"><RxHamburgerMenu size={25}/></div>
  )
}

export default HamburgerMenu