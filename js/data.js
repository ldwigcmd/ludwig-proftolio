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
      tech: ["Linux", "Excel"]
    }
  ],

  projects: [
    {
      title: "WetWare",
      subtitle: "Real-time water quality monitoring",
      role: "Software Leader",
      year: "2025",
      kind: "site",
      description:
        "An ESP32-based IoT system that monitors water pH, TDS and temperature in real time. " +
        "A responsive web dashboard with secure controls shows the readings, and CSV data " +
        "logged to the ESP32's LittleFS storage feeds the graphs and reports.",
      thumb: "",
      url: "",
      video: "",
      tech: ["ESP32", "C++", "JavaScript (ES6)", "LittleFS", "HTML5 Canvas"]
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
      thumb: "",
      url: "https://youtu.be/tp2VrH9mEes",
      video: "",
      tech: ["Raspberry Pi 4B", "Flutter", "PCF8575 I2C", "PWM solenoids", "TCP"]
    }
  ],

  skills: [
    { title: "Languages and frameworks", items: ["C++", "Python", "Flutter"] },
    { title: "Databases", items: ["MySQL", "PostgreSQL"] },
    { title: "Hardware", items: ["ESP32", "Raspberry Pi 4B", "Arduino UNO", "KiCad"] },
    { title: "Data and AI", items: ["Excel", "Power BI", "Artificial Intelligence", "Computer Vision", "Prompt Engineering"] },
    { title: "AI assistants", items: ["Claude", "Gemini", "ChatGPT", "DeepSeek"] },
    { title: "Systems and tools", items: ["Windows", "Linux", "Git", "GitHub"] }
  ],

  education: [
    {
      school: "Pampanga State University",
      degree: "Bachelor of Science in Computer Engineering",
      period: "2022–2026",
      detail: "Formerly Don Honorio Ventura State University."
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
