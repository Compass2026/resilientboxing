import { Shield, Zap, Activity, Heart, BookOpen, LucideIcon } from "lucide-react";

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
    id: "weight",
    num: "01",
    name: "IRON AND STRENGTH",
    tagline: "Weight Lifting",
    time: "MON · WED · FRI — 7:00 PM",
    desc: "The heavy iron behind the heavy hands. Compound lifts and functional physical training designed to build structural power, strength, and durability.",
    intensity: 75,
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
    id: "elevate",
    num: "02",
    name: "ELEVATE 60",
    tagline: "Foundation and Fire",
    time: "MON · WED · FRI — 5:30 AM & 5:30 PM",
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
    id: "form",
    num: "03",
    name: "FORM AND FOUNDATION",
    tagline: "Learn the Basics",
    time: "TUE · SAT — 5:30 PM & 9:00 AM",
    desc: "A class dedicated entirely to the sweet science's base. Focus on stance, footwork, punch execution, and defensive movements. Perfect for beginners and advanced fighters looking to refine their technique.",
    intensity: 65,
    icon: BookOpen,
    image: "/gym-photo.png",
    slug: "form",
    glowColor: "gold",
    scripture: {
      reference: "1 Corinthians 9:26",
      text: "Therefore I do not run like someone running aimlessly; I do not fight like a boxer beating the air.",
    },
    highlights: [
      {
        title: "Stance & Footwork",
        desc: "Build a rock-solid base to move with balance, speed, and confidence.",
      },
      {
        title: "Punch Mechanics",
        desc: "Master the jab, cross, hook, and uppercut with proper skeletal alignment.",
      },
      {
        title: "Defensive Basics",
        desc: "Learn how to slip, roll, and catch punches to protect yourself in the ring.",
      },
    ],
  },
  {
    id: "faithoverfear",
    num: "04",
    name: "FAITH OVER FEAR",
    tagline: "Gloves on God leads",
    time: "THURSDAY — 5:30 PM",
    desc: "Our signature session combining intense physical training with spiritual empowerment. Includes 60 minutes of high-intensity boxing conditioning and bag work, followed by 15 minutes of scripture reflection.",
    intensity: 90,
    icon: Zap,
    image: "/faith.png",
    slug: "faithoverfear",
    glowColor: "gold",
    scripture: {
      reference: "2 Timothy 1:7",
      text: "For God has not given us a spirit of fear — but of power, love, and a sound mind.",
    },
    highlights: [
      {
        title: "High-Intensity Boxing",
        desc: "60 minutes of bag work and athletic conditioning to push physical limits.",
      },
      {
        title: "Spiritual Empowerment",
        desc: "15 minutes of group scripture reflection and mental grounding to end the session.",
      },
      {
        title: "Purpose-Driven Training",
        desc: "Align your physical strength with your faith to prepare for life's daily battles.",
      },
    ],
  },
  {
    id: "fightcamp",
    num: "05",
    name: "FIGHT CAMP",
    tagline: "Beyond the Basics and Sparring",
    time: "TUE · SAT — 6:30 PM & 10:00 AM",
    desc: "Controlled sparring, counter-punching, advanced footwork, and tactical ring generalship. For those ready to move beyond the basics and think like a fighter. Coach invite only.",
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
