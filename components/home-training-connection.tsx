import { HomeProductWindow } from "./home-product-window";

const disciplines = [
  "CrossFit", "Functional Fitness", "Strength & Conditioning", "Strength & Bodybuilding",
  "Olympic Lifting", "Powerlifting", "Pilates", "Yoga", "Mobility & Recovery",
  "Boxing & Kickboxing", "Martial Arts", "Bootcamp", "Running & Endurance", "Cycling",
  "Swimming", "Dance & Movement", "Sports Performance", "Personal Training",
];

export function HomeTrainingDisciplines() {
  return (
    <section id="disciplines" aria-labelledby="home-disciplines-heading">
      <div className="wrap">
        <div className="sec-kicker"><span className="sec-num mono">03</span><span className="kicker">Your kind of gym</span></div>
        <h2 id="home-disciplines-heading">Built for how your gym trains.</h2>
        <p className="sec-lede">Eighteen disciplines, already set up. Programme any of them in the same builder.</p>
        <div className="chips">{disciplines.map(discipline => <span className="chip-d" key={discipline}>{discipline}</span>)}</div>
        <figure className="shot shot-wide">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/home-pilates/class-1600.jpg"
            srcSet="/home-pilates/class-900.jpg 900w, /home-pilates/class-1600.jpg 1600w"
            sizes="(max-width: 1800px) 100vw, 1720px" width="1600" height="900"
            loading="lazy" decoding="async" alt="A group Pilates class extending their arms with straps while kneeling on reformers" />
        </figure>
        <HomeTrainingConnection />
        <a className="link-arrow home-training-connection__link" href="/platform/">See the workout builder <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

export function HomeTrainingConnection() {
  return (
    <div className="home-training-connection" aria-labelledby="home-training-heading">
      <div className="home-training-connection__intro">
        <span className="kicker">From the coach to the member</span>
        <h3 id="home-training-heading">The session doesn’t end at the gym door.</h3>
        <p>Build the program. Record the movements, loads and results. The day’s training is there for members to follow in the app.</p>
      </div>
      <div className="home-training-connection__flow">
        <HomeProductWindow label="For the coach / Program builder"
          src="/product-screenshots/movena-program-builder.png" width={3352} height={1922}
          alt="Movena program builder showing a strength program with four training days" />
        <span className="home-training-connection__arrow" aria-hidden="true">→</span>
        <figure className="home-training-connection__member">
          <div className="home-product-phone">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/members-screens/1.8.0/workout-dark.png" width="1320" height="2868"
              loading="lazy" decoding="async" alt="The Movena member app workout screen showing movements, sets and repetitions in dark mode" />
          </div>
          <figcaption>For the member / Today’s workout</figcaption>
        </figure>
      </div>
    </div>
  );
}
