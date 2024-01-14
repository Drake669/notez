import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const AvatarComp = () => {
  return (
    <Avatar className="hover:cursor-pointer">
      <AvatarImage
        src="https://i.pinimg.com/564x/8d/96/24/8d962430064ea933b6cbd57f809d2af7.jpg"
        alt="@shadcn"
      />
      <AvatarFallback className=" bg-blue-500 text-white">EA</AvatarFallback>
    </Avatar>
  );
};

export default AvatarComp;
