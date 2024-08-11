import Image from "next/image";

function Footer() {
  return (
    <footer className="footer justify-between bg-base-300/20 py-8 px-14 text-lg relative">
      <aside className="flex gap-28">
        <nav>
          <div className="grid gap-1">
            <h6 className="footer-title">Company</h6>
            <a className="cursor-pointer hover:text-secondary duration-200">
              About us
            </a>
            <a className="cursor-pointer hover:text-secondary duration-200">
              Contact
            </a>
            <a className="cursor-pointer hover:text-secondary duration-200">
              Jobs
            </a>
          </div>
        </nav>
        <nav>
          <h6 className="footer-title">Social</h6>
          <div className="grid grid-flow-col gap-4 ">
            <a className="cursor-pointer hover:text-secondary duration-200">
              <i className="fa-brands fa-facebook-f fa-xl"></i>
            </a>
            <a className="cursor-pointer hover:text-secondary duration-200">
              <i className="fa-brands fa-instagram fa-xl"></i>
            </a>
            <a className="cursor-pointer hover:text-secondary duration-200">
              <i className="fa-brands fa-x-twitter fa-xl"></i>
            </a>
            <a className="cursor-pointer hover:text-secondary duration-200">
              <i className="fa-brands fa-linkedin fa-xl"></i>
            </a>
          </div>
        </nav>
      </aside>
      <aside className="grid-flow-row justify-items-center items-center z-[1]">
        <Image
          src="/Mascot&Title.svg"
          width={200}
          height={200}
          alt="TaskTime"
        />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <Image
        className="absolute bottom-0 right-0 z-0"
        src="/static/deco3.png"
        height={900}
        width={900}
        alt="deco"
      />
    </footer>
  );
}

export default Footer;
