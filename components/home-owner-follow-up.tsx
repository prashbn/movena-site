// Reuse the original two-card connections layout and its entrance/hover motion.
// Owner copy replaces provider promotion; the preserved homepage keeps the original.
export function HomeOwnerFollowUp() {
  return (
    <section id="owner-follow-up" className="ai-connections" aria-labelledby="owner-follow-up-heading">
      <div className="wrap">
        <div className="ai-connections__intro">
          <span className="kicker">Your leads. Your team.</span>
          <h2 id="owner-follow-up-heading">Keep the next step<br />in view.</h2>
          <p>See who needs a reply, who is following up and what is still open across your locations.</p>
        </div>
        <div className="ai-connections__cards">
          <article className="ai-connection">
            <div className="ai-connection__brand owner-copy-mark" aria-hidden="true">01</div>
            <div className="ai-connection__copy">
              <span className="ai-connection__provider">Enquiries</span>
              <h3>A follow-up you approve.</h3>
              <p>Movena drafts the email from the enquiry and the lead’s latest reply. You read it, edit it and approve it before anything is sent.</p>
              <a href="/contact/">See it in a demo <span aria-hidden="true">→</span></a>
            </div>
          </article>
          <article className="ai-connection">
            <div className="ai-connection__brand owner-copy-mark" aria-hidden="true">02</div>
            <div className="ai-connection__copy">
              <span className="ai-connection__provider">Your team</span>
              <h3>Tasks your team can see.</h3>
              <p>Assign staff by location. Move work across your task board, add comments and keep open and overdue tasks in view.</p>
              <a href="/contact/">See it in a demo <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
        <p className="ai-connections__privacy">Drafts wait for your approval. <a href="/legal/privacy/">Read how your information is used.</a></p>
        <p className="ai-connections__credit">Your team chooses the next step and approves the follow-up.</p>
      </div>
    </section>
  );
}
