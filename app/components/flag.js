import Image from "next/image";
const Flag = ({ flagUrl }) => {
  return (
    <div>
      <Image src={flagUrl} width={140} height={140} alt="Bandeira" />
    </div>
  );
};

export default Flag;