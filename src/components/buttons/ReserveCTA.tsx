import LinkButton from "@/components/buttons/LinkButton";
import { contact } from "@/utils/constent";

interface Props {
  className?: string;
}

const ReserveCTA = ({ className = "" }: Props) => {
  return (
    <LinkButton
      label="Reserve Table"
      href={contact.WhatsappCta}
      className={`bg-p1 text-white px-6 py-2 ${className}`}
    />
  );
};

export default ReserveCTA;