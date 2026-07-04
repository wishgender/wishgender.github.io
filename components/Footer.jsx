//= laz | wishgender
//= Tue, Jun 02, 2026
//= 16:35:22 UTC-04:00
//= components\Footer.jsx

//= Dependencies =//
import "../styles/Socials.css"

const SocialLink = (props) => {
    return (
        <a className={props.name} href={props.url}>
            <i className={props.iClass}></i>
        </a>
    )
}

const Footer = (props) => {
    return (
        <footer id="Footer">
            <div className="socialButtons">{props.socials.map((social, index) => <SocialLink name={social.name} url={social.url} iClass={social.iClass} />)}</div>
            <div>WishGender Development &copy; 2026</div>
        </footer>
    )
}

export default Footer;