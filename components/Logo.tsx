import Image from "next/image";

const Logo = () => {
  return (
    <div className="mt-2">
      <Image width={100} height={100} alt="Logo" src={"/logo.png"} />
    </div>
  );
};

export default Logo;
