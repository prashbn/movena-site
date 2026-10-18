import Image from "next/image";
import Link from "next/link";

export function AiConnections({ ownerFirst = false }: { ownerFirst?: boolean } = {}) {
  return (
    <section id="ai-connections" className="ai-connections" aria-labelledby="ai-connections-heading">
      <div className="wrap">
        <div className="ai-connections__intro">
          <span className="kicker">Movena + ChatGPT + Claude</span>
          <h2 id="ai-connections-heading">Your gym.<br />A conversation away.</h2>
          <p>{ownerFirst ? "Ask ChatGPT or Claude about your gym’s bookings. Explore performance and trends in a conversation, using information you have permission to see." : "Ask about booking performance, explore trends and understand your approved training data through Movena’s connections with ChatGPT and Claude."}</p>
        </div>
        <div className="ai-connections__cards">
          <article className="ai-connection">
            <div className="ai-connection__brand ai-connection__brand--openai">
              <Image src="/integration-logos/openai-blossom.svg" width={716} height={716} alt="OpenAI" unoptimized />
            </div>
            <div className="ai-connection__copy">
              <span className="ai-connection__provider">OpenAI</span>
              <h3>ChatGPT</h3>
              <p>{ownerFirst ? "Ask about bookings and explore how your gym is performing, right in ChatGPT." : "Explore your gym’s performance and your own approved training information."}</p>
              <Link href="/help/ai-assistants/#chatgpt">Explore the ChatGPT connection <span aria-hidden="true">→</span></Link>
            </div>
          </article>
          <article className="ai-connection">
            <div className="ai-connection__brand ai-connection__brand--anthropic">
              <Image src="/integration-logos/anthropic-symbol.svg" width={92.2} height={65} alt="Anthropic" unoptimized />
            </div>
            <div className="ai-connection__copy">
              <span className="ai-connection__provider">Anthropic</span>
              <h3>Claude</h3>
              <p>{ownerFirst ? "Bring your gym’s booking questions to Claude, with answers drawn from your Movena information." : "Connect Claude with approved Movena information."}</p>
              <span className="ai-connection__status">Connector enabled · Directory listing in review</span>
              <Link href="/help/ai-assistants/#claude">Explore the Claude connection <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        </div>
        <p className="ai-connections__privacy">Access respects your role, permissions and member consent. AI connections provide read-only answers.</p>
        <p className="ai-connections__credit">Third-party names and marks identify compatibility, not endorsement.</p>
      </div>
    </section>
  );
}
