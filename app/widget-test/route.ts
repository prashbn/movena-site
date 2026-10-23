export const dynamic = "force-static";

const html = `<!doctype html>
<html lang="en-AU">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Giraween Strength Studio (test site)</title>
  <style>
    body { box-sizing: border-box; max-width: 1040px; margin: 0 auto; padding: 32px 20px 64px; color: #17191d; background: #fff; font: 16px/1.5 system-ui, sans-serif; }
    h1 { margin: 0 0 12px; font-size: clamp(1.75rem, 4vw, 2.5rem); line-height: 1.15; }
    p { margin: 0 0 28px; padding: 14px 18px; border: 1px solid #d7dce4; border-radius: 10px; background: #f6f8fb; }
    iframe { display: block; }
  </style>
</head>
<body>
  <main>
    <h1>Giraween Strength Studio (test site)</h1>
    <p>Test page only. This is not a real gym. Bookings and payments use Movena's UAT environment and the Stripe sandbox.</p>
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
