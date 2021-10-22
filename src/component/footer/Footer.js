import './Footer.scss'

export const Footer = () => {
    return (
        <div className='footer'>
            <ul className='footer-ul'>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="/" target="_blank" rel="noreferrer" className="link-text">
                           About Us
                        </a>
                    </p>
                </li>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="/" target="_blank" rel="noreferrer" className="link-text">
                            Contact Us
                        </a>
                    </p>
                </li>
                <li className="footer-li">
                    <p className='.link-text'>
                        <a href="/" target="_blank" rel="noreferrer" className="link-text">
                            Pley For Restaurants
                        </a>
                    </p>
                </li>
                <div>
                    <p>
                    Copyright Team Pley
                    </p>
                    </div>
            </ul>
            
            
        </div>
    )
}

export default Footer;