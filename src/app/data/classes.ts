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
    intensity: 50,
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
        title: "Perfect for all experience levels",
        desc: "Learn proper lifting technique in a safe, supportive environment.",
      },
      {
        title: "30 Minutes of Strength Training",
        desc: "Replace the cardio warm-up with guided weightlifting focused on building strength and confidence.",
      },
      {
        title: "Expert Instruction",
        desc: "Learn correct form, proper movement, and how to safely train different muscle groups.",
      },
      {
        title: "Variety in Every Workout",
        desc: "Experience different lifting styles and exercises designed to keep your workouts challenging and effective.",
      },
      {
        title: "Build a Strong Foundation",
        desc: "Increase strength, improve muscle tone, and gain confidence that carries over into everyday life.",
      },
    ],
  },
  {
    id: "elevate",
    num: "02",
    name: "ELEVATE 60",
    tagline: "Foundation and Fire",
    time: "MON · WED (5:30 AM & 5:30 PM) · FRI (4:00 PM)",
    desc: "The core of our system. 60 minutes of authentic boxing combinations, bag work, and athletic conditioning that rewires how you move and how you think under pressure.",
    intensity: 90,
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
        title: "Perfect for Anyone",
        desc: "No boxing experience needed.",
      },
      {
        title: "15 Minutes of Boxing Fundamentals",
        desc: "Learn proper stance, footwork, punches, and technique through a fun icebreaker and guided instruction.",
      },
      {
        title: "15 Minutes of Cardio Conditioning",
        desc: "Warm up at your own pace while building endurance and preparing your body for the workout.",
      },
      {
        title: "30 Minutes of Bag Work",
        desc: "Complete 8 rounds on our state-of-the-art punch-tracking bags. Followed by a 1 minute break between rounds",
      },
      {
        title: "Track Your Progress",
        desc: "Every punch is scored from 0–100 and displayed live, showing your total punches, punch power, and overall performance after each class.",
      },
      {
        title: "Burn 800–1,000 Calories",
        desc: "Enjoy a fun, full-body workout that builds confidence, strength, endurance, and resilience.",
      },
    ],
  },
  {
    id: "form",
    num: "03",
    name: "FORM AND FOUNDATION",
    tagline: "Learn the Basics",
    time: "TUE · SAT — 5:30 PM & 9:00 AM",
    desc: "Perfect for beginners* or anyone looking to improve their technique.",
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
        title: "30 Minutes of Boxing Fundamentals",
        desc: "Learn proper stance, footwork, defense, and punch mechanics to maximize power and help prevent injury.",
      },
      {
        title: "Skill Development",
        desc: "Build confidence through partner drills, defensive movements, punch combinations, and footwork exercises.",
      },
      {
        title: "30 Minutes of Bag Work",
        desc: "Complete 8 rounds on our state-of-the-art punch-tracking bags with active recovery between rounds.",
      },
      {
        title: "Train Smarter",
        desc: "Develop better technique, move with confidence, and build a strong boxing foundation.",
      },
    ],
  },
  {
    id: "faithoverfear",
    num: "04",
    name: "FAITH OVER FEAR",
    tagline: "Gloves on, God leads",
    time: "THURSDAY — 5:30 PM",
    desc: "Every Thursday at 5:30 PM – Grow in faith, build community, and strengthen your body and spirit.",
    intensity: 50,
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
        title: "Faith Before Fitness",
        desc: "We believe in a relationship with Jesus Christ and that you are loved, created with purpose, and made for more.",
      },
      {
        title: "Bread Breaker & Bible Study",
        desc: "Start with a conversation, a short Bible study, and open discussion.",
      },
      {
        title: "Prayer Together",
        desc: "Share prayer requests and encourage one another.",
      },
      {
        title: "30 Minutes of Bag Work",
        desc: "Finish with an energizing boxing workout set to Christian music.",
      },
      {
        title: "Everyone Is Welcome",
        desc: "No matter where you are in your faith journey, there's a place for you here.",
      },
    ],
  },
  {
    id: "fightcamp",
    num: "05",
    name: "FIGHT CAMP",
    tagline: "Beyond the Basics and Sparring",
    time: "TUE · SAT — 6:30 PM & 10:00 AM",
    desc: "Controlled sparring, counter-punching, advanced footwork, and tactical ring generalship. For those ready to move beyond the basics and think like a fighter.",
    intensity: 80,
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
        title: "Take Your Skills Beyond the Basics",
        desc: "Learn advanced boxing techniques, footwork, head movement, defense, and counter punching.",
      },
      {
        title: "Real Fight Training",
        desc: "Practice partner drills, defensive movements, ring strategy, and controlled sparring to build confidence and sharpen your skills.",
      },
      {
        title: "Controlled Sparring",
        desc: "Sparring is optional and always supervised with a trainer at a safe, controlled pace designed to help you learn—not get hurt.",
      },
      {
        title: "Progress at Your Pace",
        desc: "Whether your goal is fitness, self-defense, or stepping into the ring, we'll help you advance as your confidence and skills grow.",
      },
      {
        title: "Experienced Coaching",
        desc: "Train under Emil, who brings over 20 years of boxing experience and a passion for developing confident, skilled boxers.",
      },
    ],
  },
];
