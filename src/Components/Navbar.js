import Link from "next/link";

const Navbar = () => {

    const NavItems = ["Home","Search", "Edit", "Delete", "Image", "Blog"];

    return(<div id="Navbar">
        <ul className="flex flex-row justify-around">
        {NavItems && NavItems.map((single, index) => {
            return(
                <Link key={index} href={`/${single}` }>
                    <li>{single}</li>
                </Link>
            )
        })}
        </ul>
    </div>)
};

export default Navbar;