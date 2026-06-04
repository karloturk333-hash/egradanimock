import { InboxView } from "@/components/messages/InboxView";
import { getMessages } from "@/lib/mock-messages";

export const metadata = {
  title: "Poruke — eGrađani",
};

const sectionHeading: React.CSSProperties = {
  margin: "0 0 var(--space-md) 0",
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-2xl)",
  fontWeight: 600,
  color: "var(--color-text)",
};

export default async function PorukePage() {
  const messages = await getMessages();

  return (
    <section aria-label="Korisnički pretinac">
      <h2 style={sectionHeading}>Korisnički pretinac</h2>
      <InboxView messages={messages} />
    </section>
  );
}
