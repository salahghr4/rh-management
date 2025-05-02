import { Link } from "@inertiajs/react";
import img from "../../Assest/img/rhLogo.png";

export default function ApplicationLogo(props) {
    return (
        <Link href="/" className="flex items-center">
          <img {...props} src={img}/>
        </Link>
    );
}
