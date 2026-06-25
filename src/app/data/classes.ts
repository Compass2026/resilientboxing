import { Shield, Zap, Activity, Heart, LucideIcon } from "lucide-react";

export interface ClassHighlight {
  title: string;
  desc: string;
}

export interface GymClass {
  id: string;
  num: string;
  name: string;
  tagline: string;
  time: string;
  desc: string;
  intensity: number;
  icon: LucideIcon;
  image: string;
  slug: string;
  scripture: {
    reference: string;
    text: string;
  };
  highlights: ClassHighlight[];
  glowColor: "gold" | "red" | "white";
}

export const CLASSES: GymClass[] = [
  {
    id: "elevate",
    num: "01",
    name: "Elevate 60",
    tagline: "Foundation & Fire",
    time: "MON · WED · FRI — 5:30 AM & 6 PM",
    desc: "The core of our system. 60 minutes of authentic boxing combinations, bag work, and athletic conditioning that rewires how you move and how you think under pressure.",
    intensity: 85,
    icon: Shield,
    image: "/6831DF2B-018E-403B-899E-943DD2558B32.webp",
    slug: "elevate",
    glowColor: "red",
    scripture: {
      reference: "2 Timothy 1:7",
      text: "For God has not given us a spirit of fear — but of power, love, and a sound mind.",
    },
    highlights: [
      {
        title: "Authentic Combinations",
        desc: "Master real fight combinations and defensive mechanics on the heavy bag, building direct, practical skill.",
      },
      {
        title: "Athletic Conditioning",
        desc: "High-yield interval training to forge dynamic core stability, endurance, and functional body control.",
      },
      {
        title: "Mental Focus Under Pressure",
        desc: "Train your mind to remain calm, structured, and deliberate when fatigue sets in.",
      },
    ],
  },
  {
    id: "kick",
    num: "02",
    name: "Kick 60",
    tagline: "Dutch Style Kickboxing",
    time: "TUE · THU — 6 PM · SAT — 9 AM",
    desc: "Punches, knees, elbows and kicks woven into fast-paced Dutch combinations. Destroys calories. Builds explosive coordination you didn't know you had.",
    intensity: 93,
    icon: Zap,
    image: "/29B8F602-2D05-4900-B084-768B4492D8D1.webp",
    slug: "kick",
    glowColor: "gold",
    scripture: {
      reference: "Philippians 4:13",
      text: "I can do all things through Christ who strengthens me.",
    },
    highlights: [
      {
        title: "Dutch Style Combinations",
        desc: "Combine punches with low kicks, knees, and fluid defensive counters for a complete kickboxing skill set.",
      },
      {
        title: "Full-Body Agility & Power",
        desc: "Develop explosive legs, hips, and shoulders through continuous multi-directional kick combinations.",
      },
      {
        title: "High-Octane Cardio Burn",
        desc: "An aggressive fat-burning workout that maximizes aerobic and anaerobic capacity.",
      },
    ],
  },
  {
    id: "weight",
    num: "03",
    name: "Iron & Strength",
    tagline: "Functional Power Lifting",
    time: "MON · WED · FRI — 7 PM",
    desc: "The heavy iron behind the heavy hands. Compound lifts and functional movement to build the structural power that makes every punch matter more.",
    intensity: 72,
    icon: Activity,
    image: "/BF1FEE18-8739-47C8-A742-207063ACA9FC.webp",
    slug: "weight",
    glowColor: "white",
    scripture: {
      reference: "Proverbs 27:17",
      text: "As iron sharpens iron, so one person sharpens another.",
    },
    highlights: [
      {
        title: "Compound Strength Focus",
        desc: "Master key lifts (squats, deadlifts, presses) under direct guidance to build high-capacity skeletal muscle.",
      },
      {
        title: "Functional Boxing Carryover",
        desc: "Exercises specifically chosen to increase rotational torque, punch velocity, and overall durability.",
      },
      {
        title: "Iron Brotherhood",
        desc: "Train in an environment that prioritizes accountability, personal growth, and team encouragement.",
      },
    ],
  },
  {
    id: "fightcamp",
    num: "04",
    name: "Fight Camp",
    tagline: "Advanced Ring Craft",
    time: "SAT — 8 AM · By invite",
    desc: "Pad work, defensive mechanics, ring generalship and controlled sparring. For those ready to move beyond the basics and think like a fighter.",
    intensity: 98,
    icon: Heart,
    image: "/2FBE893A-8F4F-4CD5-B529-3CD041E7496F.webp",
    slug: "fightcamp",
    glowColor: "red",
    scripture: {
      reference: "1 Timothy 6:12",
      text: "Fight the good fight of faith, lay hold on eternal life, whereunto thou art also called.",
    },
    highlights: [
      {
        title: "Defensive Mechanics",
        desc: "Perfect slipping, ducking, catching punches, and executing footwork angles in live situations.",
      },
      {
        title: "Ring Generalship",
        desc: "Learn to command the space of the ring, controlling distances and managing corner strategies.",
      },
      {
        title: "Controlled Sparring",
        desc: "Apply skills under real, safe pressure with peers to refine timing and reaction speed.",
      },
    ],
  },
];
