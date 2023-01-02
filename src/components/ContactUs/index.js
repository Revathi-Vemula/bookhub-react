import {IoLogoGoogle} from 'react-icons/io'
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineInstagram,
} from 'react-icons/ai'
import './index.css'

const ContactUs = () => (
  <div className="contact-us-container">
    <div className="social-icons-container">
      <IoLogoGoogle size={25} color="#3D3C3C" />
      <AiOutlineTwitter size={25} color="#3D3C3C" />
      <AiOutlineInstagram size={25} color="#3D3C3C" />
      <AiFillYoutube size={25} color="#3D3C3C" />
    </div>
    <p className="contact-us-heading">Contact Us</p>
  </div>
)

export default ContactUs
