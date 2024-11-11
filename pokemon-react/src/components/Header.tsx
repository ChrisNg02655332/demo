import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, } from "@nextui-org/navbar";

export default function Header() {
  return <Navbar>
    <NavbarContent justify="start">
      <NavbarBrand className="mr-4 gap-3">
        <Image src="https://assets.pokemon.com/static2/_ui/img/favicon.ico" />
        <p className="hidden sm:block font-bold text-inherit">Pokemon</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-3">
      </NavbarContent>
    </NavbarContent>
    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link color="foreground" href="#">
          Blogs
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Features
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link href="#" aria-current="page">
          About
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="#">
          Integrations
        </Link>
      </NavbarItem>
    </NavbarContent>
    <NavbarContent justify="end">
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Explore
        </Button>
      </NavbarItem>
    </NavbarContent>
  </Navbar>
}
