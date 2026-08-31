export const businessTypes = [
  {
    name: "Functional fitness",
    description:
      "Run the timetable, waitlists and check-ins, then send the day’s programming straight to the member app. Challenges and training history build from the work members already do.",
    capabilities: ["Timetable and waitlists", "Programming", "Challenges"],
  },
  {
    name: "Strength and conditioning",
    description:
      "Build sessions with movements, sets and loads. Members follow the program in the app and keep a clear history of what they trained and when they improved.",
    capabilities: ["Workout builder", "Movement history", "Personal bests"],
  },
  {
    name: "Pilates and yoga",
    description:
      "Keep class capacity, bookings, waitlists, memberships and class packs together. Members can book or cancel from their phone while your team works from one timetable.",
    capabilities: ["Class capacity", "Memberships and packs", "Member app"],
  },
  {
    name: "Boxing and martial arts",
    description:
      "Manage recurring memberships, scheduled sessions, waivers and check-ins without separating the front desk from the coaching floor.",
    capabilities: ["Memberships", "Waivers", "Check-in"],
  },
  {
    name: "Personal training",
    description:
      "Give each member a program they can follow and a record they can keep. Bookings, messages and training history stay connected to the same member profile.",
    capabilities: ["Individual programs", "Bookings", "Private messages"],
  },
  {
    name: "Multi-discipline gyms",
    description:
      "Offer different ways to train without stitching together different systems. Use one member record across disciplines, teams and locations.",
    capabilities: ["One member record", "Team roles", "Multiple locations"],
  },
] as const;

export const supportedDisciplines = [
  "CrossFit",
  "Functional Fitness",
  "Strength & Conditioning",
  "Strength & Bodybuilding",
  "Olympic Lifting",
  "Powerlifting",
  "Pilates",
  "Yoga",
  "Mobility & Recovery",
  "Boxing & Kickboxing",
  "Martial Arts",
  "Bootcamp",
  "Running & Endurance",
  "Cycling",
  "Swimming",
  "Dance & Movement",
  "Sports Performance",
  "Personal Training",
] as const;
