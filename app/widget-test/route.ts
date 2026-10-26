export const dynamic = "force-static";

const html = `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Giraween Strength Studio (test site)</title>
  <style>
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { margin: 0; color: #202320; background: #faf9f5; font: 16px/1.5 system-ui, sans-serif; }
    .split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 100svh; }
    .intro { position: sticky; top: 0; display: flex; flex-direction: column; justify-content: center; min-height: 100svh; height: 100svh; padding: clamp(28px, 6vw, 88px); background: radial-gradient(circle at 20% 10%, #e3e9dc, transparent 48%), #f2f0e8; }
    .eyebrow { margin: 0 0 20px; color: #50634e; font-size: 12px; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
    h1 { max-width: 12ch; margin: 0; font-size: clamp(2.5rem, 5vw, 5rem); font-weight: 600; letter-spacing: -.055em; line-height: 1.04; }
    .lede { max-width: 38ch; margin: 24px 0; color: #4d554d; font-size: clamp(1rem, 1.5vw, 1.25rem); }
    .test-note { max-width: 42ch; margin: 0 0 24px; padding: 14px 16px; border: 1px solid #c4cec0; border-radius: 12px; background: #fffdf7; font-size: 13px; }
    .sample { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; max-width: 540px; margin-top: 36px; }
    .sample div { min-height: 105px; padding: 20px; border: 1px solid #d5dacf; border-radius: 18px; background: rgba(255, 255, 255, .65); }
    .sample strong, .sample span { display: block; }
    .sample span { margin-top: 8px; color: #5a625a; font-size: 14px; }
    .jump { align-self: flex-start; color: #243f2b; font-weight: 700; text-underline-offset: 4px; }
    .widget-pane { min-width: 0; padding: clamp(24px, 3vw, 48px); background: #fff; }
    .widget-pane h2 { margin: 0 0 6px; font-size: clamp(1.5rem, 2.2vw, 2rem); line-height: 1.15; }
    .widget-pane > p { margin: 0 0 24px; color: #626a63; }
    iframe { display: block; }
    @media (max-width: 800px) {
      .split { grid-template-columns: 1fr; }
      .intro { position: static; min-height: 50svh; height: auto; padding: 36px 24px; }
      .sample { margin-top: 20px; }
      .widget-pane { padding: 28px 16px 48px; }
    }
  </style>
</head>
<body>
  <main class="split">
    <section class="intro" aria-labelledby="studio-title">
      <p class="eyebrow">Giraween Strength Studio (test site)</p>
      <h1 id="studio-title">A place to get stronger, together.</h1>
      <p class="lede">Strength sessions, a friendly coaching team and room to work at your own pace. Explore the sample timetable alongside this fictional studio page.</p>
      <p class="test-note">Test page only. This is not a real gym. Bookings and payments use Movena's UAT environment and the Stripe sandbox.</p>
      <a class="jump" href="#book">Explore the timetable →</a>
      <div class="sample" aria-label="Sample studio information">
        <div><strong>Small group strength</strong><span>Train with a coach and a familiar crew.</span></div>
        <div><strong>Personal training</strong><span>One-to-one time built around your goals.</span></div>
      </div>
    </section>
    <section class="widget-pane" id="book" aria-label="Timetable and booking">
      <h2>Find your session</h2>
      <p>The Movena timetable is embedded directly in this half of the page.</p>
<iframe src="https://app.mvn-uat.net/gyms/movena-giraween/embed" title="Gym timetable and booking" style="width:100%;height:640px;border:0" referrerpolicy="no-referrer"></iframe>
<script>
(function () {
  var frame = document.currentScript.previousElementSibling;
  var origin = new URL(frame.src).origin;
  window.addEventListener("message", function (event) {
    if (event.origin !== origin || event.source !== frame.contentWindow) return;
    var value = event.data;
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    if (value.type === "movena:ready" && Object.keys(value).length === 1) return;
    if (value.type !== "movena:height" || Object.keys(value).length !== 2 ||
        !Object.prototype.hasOwnProperty.call(value, "px") ||
        !Number.isInteger(value.px) || value.px < 0 || value.px > 10000) return;
    frame.style.height = Math.max(420, value.px) + "px";
  });
})();
</script>
    </section>
  </main>
</body>
</html>`;

export function GET() {
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
