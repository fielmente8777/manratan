import Accordion from "@/components/accordion/Accordion";
import LinkButton from "@/components/buttons/LinkButton";
import { SectionWithContainer } from "@/components/sectionComponants";
import { SectionHeading } from "@/components/typography";

interface FaqProps {
  tagline: string;
  title: string;
  description: string;
  items: {
    q: string;
    a: string;
  }[];
  buttons: {
    label: string;
    link: string;
  }[];
}
const Faq: React.FC<FaqProps> = ({
  tagline,
  title,
  description,
  items,
  buttons,
}) => {
  return (
    <SectionWithContainer sectionClassName="border-y border-p1 bg-background2">
      <div className="grid lg:grid-cols-[1.1fr_1fr] grid-cols-1 gap-8">
        <div className="lg:sticky lg:top-24 lg:self-start flex flex-col gap-2">
          <p className="uppercase text-p1 text-xs tracking-widest">{tagline}</p>
          <SectionHeading title={title} />
          <p className="text-light">{description}</p>
          <ul className="lg:grid hidden grid-cols-1 md:grid-cols-2 justify-center items-center gap-2 max-w-sm mt-4">
            {buttons.map((button, index) => (
              <li key={index}>
                <LinkButton
                  href={button.link}
                  label={button.label}
                  whatsAppIcon={index === 0}
                  calendarIcon={index === 1}
                  className={`rounded-md w-full text-nowrap text-sm! justify-center
                    ${
                      index === 0
                        ? "bg-transparent text-p1"
                        : "border border-primary text-white bg-p1"
                    }
                    `}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {items.map((item, index) => (
            <Accordion key={index} question={item.q} answer={item.a} />
          ))}
        </div>
        <ul className="grid lg:hidden grid-cols-1 md:grid-cols-2 w-full gap-2 max-w-sm mt-4">
            {buttons.map((button, index) => (
              <li key={index}>
                <LinkButton
                  href={button.link}
                  label={button.label}
                  whatsAppIcon={index === 0}
                  calendarIcon={index === 1}
                  className={`rounded-md w-full text-nowrap text-sm! justify-center
                    ${
                      index === 0
                        ? "bg-transparent text-p1"
                        : "border border-primary text-white bg-p1"
                    }
                    `}
                />
              </li>
            ))}
          </ul>
      </div>
    </SectionWithContainer>
  );
};

export default Faq;
