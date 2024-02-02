const users = [
  {
    firstname: "trina",
    username: "t@123",
    lastname: "hennah",
    email: "abc@gmail.com",
    password: "obuprufi",
  },
  {
    username: "e@123",
    firstname: "estela",
    lastname: "sharp",
    email: "xyz@gmail.com",
    password: "tynal",
  },
  {
    username: "d@123",
    firstname: "dylan",
    lastname: "Wicker",
    email: "dyl@gmail.com",
    password: "qwerty",
  },
  {
    username: "ta@123",
    firstname: "tanvi",
    lastname: "patel",
    email: "qwe@gmail.com",
    password: "theralu",
  },
];

const plants = [
  {
    name: "bay",
    color: "green",
    growth_level: "70",
    birth_date: "2023-12-06",
    userId: 1,
  },
  {
    name: "arfaj ",
    color: "blue",
    growth_level: "50",
    birth_date: "2024-01-15",
    userId: 2,
  },
  {
    name: "cedar ",
    color: "red",
    growth_level: "20",
    birth_date: "2024-02-01",
    userId: 3,
  },
  {
    name: "dindle",
    color: "orange",
    growth_level: "80",
    birth_date: "2023-06-20",
    userId: 4,
  },
];

const habits = [
  {
    name: "hydrate",
    description: {
      desc1:
        "Similar to flowers and plants, water helps us grow. Have you watered yourself today?",
      desc2:
        "Cacti are more hydrated than the soil they grow in.Absorb tiny sponges!",
      desc3:
        "Warer is essential to all living organisms on earth.Even you, tiny human",
    },
    image: {
      img1: "https://t3.ftcdn.net/jpg/04/46/09/68/360_F_446096863_mbuNBq46AZQETaTY0V8nLH2DcpxNFW9M.jpg",
      img2: "https://img.freepik.com/free-vector/hand-drawn-cactus-cartoon-illustration_52683-126695.jpg",
      img3: "https://cdn.pixabay.com/photo/2022/01/10/08/30/orange-juice-6927663_1280.png",
    },
    checkIn: true,
  },
  {
    name: "breathe",
    description: {
      desc1: "Breathe in for 4.",
      desc2: "Just Breathe",
      desc3: "What's activity that helps you stay present?",
    },
    image: {
      img1: "https://t3.ftcdn.net/jpg/04/46/09/68/360_F_446096863_mbuNBq46AZQETaTY0V8nLH2DcpxNFW9M.jpg",
      img2: "https://img.freepik.com/free-vector/hand-drawn-cactus-cartoon-illustration_52683-126695.jpg",
      img3: "https://cdn.pixabay.com/photo/2022/01/10/08/30/orange-juice-6927663_1280.png",
    },
    checkIn: false,
  },
];

const goals = [
  {
    name: "Stay Hydrated",
    frequency: "Daily",
    achivements: "Drank 8 glasses of water",
    habitId: 1,
  },
  {
    name: "Mindful Breathing",
    frequency: "Daily",
    achivements: "Practiced deep breathing exercises",
    habitId: 2,
  },
];

const journals = [
  {
    entry: "Productive Work Day",
    date: "2024/02/02",
    userId: 1,
  },
  {
    entry: "Family Reunion",
    date: "2024/01/12",
    userId: 2,
  },
  {
    entry: "Learning a New Skill",
    date: "2023/12/10",
    userId: 1,
  },
];

module.exports = { users, plants, habits, goals, journals };
