window.PORTFOLIO = {
  profile: {
    name: "Ludwig Adriane G. Intal",
    role: "Computer Engineer",
    tagline: "I develop functional software systems with the help of AI and integrate software with hardware to build practical and reliable systems.",
    location: "Pampanga, Philippines",
    avatar: "assets/img/portrait.jpg",
    avatarAlt: "Portrait of Ludwig Intal",
    available: true,
    availableLabel: "Open to full-time roles",
    links: [
      { label: "Email", href: "mailto:ludwigadrianeintal@gmail.com" },
      { label: "Résumé (PDF)", href: "assets/Ludwig-Intal-Resume.pdf" }
    ]
  },

  about: [
    "A Computer Engineer experienced in integrating software and hardware to develop functional systems with the " +
      "help of AI. Skilled in building and refining working programs while transforming messy and unstructured data " +
      "into clean, organized, and readable datasets for analysis and decision-making. ",

  ],

  experience: [
    {
      company: "Municipality of San Simon, Pampanga",
      role: "Intern",
      period: "Feb – Apr 2026",
      highlights: [
        "Installed and configured Linux on a kiosk system, ensuring proper system setup and functionality.",
        "Applied Excel formulas to automate data entry, identify and remove duplicate records, perform calculations, and compare datasets for improved data accuracy and efficiency."
      ],
      tech: ["Linux", "Excel"],
      art: "kiosk"
    }
  ],

  projects: [
    {
      title: "CAMote",
      subtitle: "Helmet-violation detection and plate lookup",
      role: "Solo Developer",
      year: "2026",
      kind: "site",
      description:
        "A real-time system that spots motorcycle riders without helmets on Philippine roads and " +
        "reads their plate numbers. A camera feed runs through YOLOv8 with ByteTrack to detect and " +
        "track riders, PaddleOCR reads the plates, and a FastAPI web app on Vercel lets the public " +
        "search plates while admins review captures, riders and appeals.",
      art: "camote",
      thumb: "",
      url: "https://ca-mote-project.vercel.app/",
      // Your demo video, e.g. "assets/video/camote-demo.mp4". Until set, the drawing shows.
      video: "assets/video/camote-demo.mp4",
      tech: ["YOLOv8", "ByteTrack", "PaddleOCR", "Python", "FastAPI", "Neon Postgres", "Vercel"],
      // How the system connects, top to bottom. `via` labels the link into a
      // part, `hub` marks the controller at the centre of the system.
      flow: [
        { part: "Camera", note: "Live road feed" },
        { part: "YOLOv8 + ByteTrack", note: "Detects and tracks riders", hub: true },
        { part: "PaddleOCR", note: "Reads the plate" },
        { part: "FastAPI + Postgres", note: "Stores each violation" },
        { part: "Web app", note: "Plate search, admin consoles" }
      ],
      // The "Read more" window; see BraiLingo below for the block format
      more: []
    },
    {
      title: "BraiLingo",
      subtitle: "Braille learning device, undergraduate thesis",
      role: "Software Leader",
      year: "2025–2026",
      kind: "video",
      description:
        "A tactile Braille learning device for blind and visually impaired users. A Raspberry Pi 4B " +
        "drives PWM-controlled solenoid actuators through a PCF8575 I2C GPIO expander, and a " +
        "companion Flutter Android app connects over TCP to deliver adaptive, spaced-repetition " +
        "Braille quizzes.",
      art: "brailingo",
      thumb: "",
      url: "",
      // Plays right on the page. A YouTube link uses YouTube's player; to serve
      // the file from this site instead, use e.g. "assets/video/brailingo-demo.mp4".
      video: "assets/video/brailingo-demo.mp4",  // backup copy: https://youtu.be/tp2VrH9mEes
      tech: ["Raspberry Pi 4B", "Flutter", "PCF8575 I2C", "PWM solenoids", "TCP"],
      flow: [
        { part: "Flutter app", note: "Android, spaced-repetition quizzes" },
        { part: "Raspberry Pi 4B", note: "Drives the device", via: "TCP", hub: true },
        { part: "PCF8575", note: "GPIO expander", via: "I2C" },
        { part: "Solenoid actuators", note: "Raise the Braille dots", via: "PWM" }
      ],
      // The "Read more" window. Each block is one of:
      //   { h: "Heading" }, { sub: "Smaller heading" }, { p: "Paragraph" },
      //   { list: ["item", ...] }, { table: [["Left", "Right"], ...] }
      more: [
        { p: "BraiLingo is a tactile Braille learning device built for visually impaired and blind individuals. It combines a Raspberry Pi-powered hardware unit with an Android mobile app to make learning Braille more accessible, structured, and adaptive." },

        { h: "What is it?" },
        { p: "BraiLingo is an undergraduate thesis project that addresses a real gap in Braille education: most people who lose their vision later in life, or are born with visual impairment, never learn to read Braille because teaching resources are scarce, expensive, or require a trained teacher to be physically present." },
        { p: "BraiLingo removes that dependency. It is a self-contained, interactive Braille learning system that a learner can use independently, at their own pace, from anywhere." },

        { h: "Why build this?" },
        { p: "You might wonder: if someone is blind, how do they use the app? That is exactly the point. BraiLingo is not designed to be used by looking at a screen. It is designed to be used by touch and sound." },
        { list: [
          "The hardware device physically raises and lowers pins to form Braille characters under the learner's fingertips, the same way a traditional Braille display works.",
          "The mobile app announces every character, instruction, and result out loud via text-to-speech (TTS).",
          "The physical buttons on the device let the learner navigate, answer, and control everything without ever needing to look at a screen."
        ] },
        { p: "A sighted assistant or teacher can use the phone screen to set up the session, but once the quiz starts the blind user can operate everything independently through audio and touch alone." },

        { h: "How it works" },
        { sub: "The hardware" },
        { p: "The device is built on a Raspberry Pi 4B and uses solenoid actuators, small electromagnetic pins, to physically push Braille dots up and down. There are two Braille cells (12 solenoids total), allowing single or double-cell characters to be displayed." },
        { p: "The solenoids use PWM (Pulse Width Modulation): full power for 120 ms to snap the pin up, then reduced to 35% to hold it in place without overheating the coils." },
        { p: "Vibration motors (via a PCF8575 I2C GPIO expander) provide haptic feedback when an answer is correct or wrong. A PAM8403 audio amplifier module drives the speaker for text-to-speech output." },
        { p: "Physical buttons on the device let the learner:" },
        { list: [
          "Next / Prev: browse Braille characters",
          "Dot buttons (1–6): enter quiz answers by pressing the correct dots",
          "Enter: submit an answer",
          "Backspace / Space: for the typing practice mode",
          "Hold Next (3 s): safely shut down the Pi",
          "Hold Enter (3 s): read all notes aloud"
        ] },
        { sub: "The mobile app" },
        { p: "The Flutter Android app connects to the Pi over a local WiFi TCP connection (port 5000). It serves as the control panel and learning interface. Features include:" },
        { list: [
          "17 Braille character categories: Grade 1 letters, numbers, punctuation, Grade 2 contractions, shortforms, wordsigns, and more",
          "Step-by-Step mode: learn each character one at a time with audio and physical display",
          "Randomized Quiz mode: adaptive quiz using the Leitner Spaced Repetition System",
          "Typing / Perkins Keyboard mode: practice typing Braille on the dot buttons with TTS reading back what was typed",
          "Tutorial overlay: guided walkthrough of the app on first use",
          "Onboarding screens: explain how to set up and use the device before first launch"
        ] },

        { h: "The learning algorithm" },
        { p: "BraiLingo uses the Leitner Spaced Repetition System to adapt quiz difficulty to each learner. Each of the 26 Braille letters is placed in one of 5 review boxes:" },
        { list: [
          "Correct answer: the letter advances to the next box (reviewed less often)",
          "Wrong answer: the letter resets to Box 1 (reviewed immediately)"
        ] },
        { p: "This ensures the learner spends more time on characters they struggle with and less time on characters they have already mastered." },

        { h: "Retention analysis" },
        { p: "After a study period, BraiLingo computes retention estimates using two established memory models:" },
        { list: [
          "Exponential Forgetting Curve (Ebbinghaus, 1885): estimates how long learned Braille will be retained without further practice",
          "Power Law of Learning (Newell & Rosenbloom, 1981): projects what retention would be under extended practice"
        ] },
        { p: "These models are personalized using each learner's Leitner box data, accuracy, repetition count, and learning trend across 7 days." },

        { h: "Tech stack" },
        { table: [
          ["Hardware", "Raspberry Pi 4B, solenoids, PCF8575, PAM8403"],
          ["Firmware", "Python, gpiozero, smbus3, lgpio"],
          ["Communication", "TCP sockets over local WiFi (port 5000)"],
          ["Mobile app", "Flutter / Dart (Android)"],
          ["Audio", "Text-to-speech via flutter_tts, PAM8403 amplifier"],
          ["Network discovery", "mDNS via avahi-daemon + multicast_dns"],
          ["Storage", "SharedPreferences (app settings)"]
        ] }
      ]
    }
  ],

  skills: [
    { icon: "code", title: "Languages and frameworks", items: ["C++", "Python", "Flutter"] },
    { icon: "database", title: "Databases", items: ["MySQL", "PostgreSQL"] },
    { icon: "chip", title: "Hardware", items: ["ESP32", "Raspberry Pi 4B", "Arduino UNO", "KiCad"] },
    { icon: "chart", title: "Data and AI", items: ["Excel", "Power BI", "Artificial Intelligence", "Computer Vision", "Prompt Engineering"] },
    { icon: "chat", title: "AI assistants", items: ["Claude", "Gemini", "ChatGPT", "DeepSeek"] },
    { icon: "terminal", title: "Systems and tools", items: ["Windows", "Linux", "Git", "GitHub"] }
  ],

  education: [
    {
      school: "Pampanga State University",
      degree: "Bachelor of Science in Computer Engineering",
      period: "2022–2026",
      detail: "Formerly Don Honorio Ventura State University.",
      logo: "assets/img/psu-logo.jpg",
      art: "degree"
    }
  ],

  certifications: [
    {
      name: "Data Analytics Essentials",
      issuer: "DICT-ITU DTC Initiative, through the Cisco Networking Academy program",
      year: "",
      url: "assets/certificates/data-analytics-essentials.jpg"
    },
    {
      name: "How Data Analytics Powers Strategic Decision-Making: Leveraging Power BI, SQL, Data Warehousing, and Python",
      issuer: "Institute of Computer Engineering of the Philippines, Region 3",
      year: "",
      url: "assets/certificates/data-analytics-decision-making.jpg"
    },
    {
      name: "Python-Powered Robotics: From Basic Circuits to Intelligent Systems",
      issuer: "Institute of Computer Engineering of the Philippines, Region 3",
      year: "",
      url: "assets/certificates/robotics.jpg"
    }
  ],


  contact: {
    email: "ludwigadrianeintal@gmail.com",
    blurb:
      "Hiring for an engineering role, or have a question about my work? Fill in the form " +
      "and it will open in your mail app, ready to send."
  },

  footer: {
    copyright: "Ludwig Intal"
  }
};
