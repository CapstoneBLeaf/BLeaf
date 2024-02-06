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

growth_level = [
  { img_url: "/path/to/file",
    key: 0,
  },
  { imag_url: "/path/to/second_file",
    key: 1,
  },
  { imag_url: "/path/to/second_file",
  key: 1,
  },
{ imag_url: "/path/to/second_file",
key: 1,
},
]

const habits = [
  {
    name: "hydrate",
    description:
        "Similar to flowers and plants, water helps us grow. Have you watered yourself today?",
    image: 
      "https://t3.ftcdn.net/jpg/04/46/09/68/360_F_446096863_mbuNBq46AZQETaTY0V8nLH2DcpxNFW9M.jpg", 
    checkIn: false,
  },
  {
    name: "breathe",
    description: 
      "Breathe in for 4.",
    image: 
      "https://t3.ftcdn.net/jpg/04/46/09/68/360_F_446096863_mbuNBq46AZQETaTY0V8nLH2DcpxNFW9M.jpg",
    checkIn: false,
  },
  {
    name: "health",
    description:
      "Taking our medication on time is one fo the best things we can do for ourselves",
    image: 
      "https://p1.hiclipart.com/preview/206/764/836/pixel-png-clipart.jpg",
    checkIn: false,
  },
  {
    name: "Make the bed",
    description:
      "Healthy soil beds grow healthy plants!",
    image: 
      "https://png.pngtree.com/png-clipart/20190617/original/pngtree-hand-painted-life-supplies-pink-pillow-png-image_3888310.jpg",
    checkIn: false,
  },
  {
    name: "Wash your face",
    description: 
      "Wipe the old dirt away.",
    image: 
      "https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e3/Bubble_Column_JE1_BE1.png/revision/latest?cb=20190518115608",
    checkIn: false,
  },
  {
    name: "Step outside of the house",
    description: 
      "Photosynthesize!",
    image: 
      "https://image.pngaaa.com/658/2101658-middle.png",
    checkIn: false,
  },
  {
    name: "Get out of bed",
    description: 
      "Embrace the new day.",
    image: 
      "https://i.redd.it/1yhw0o258o1z.png",
    checkIn: false,
  },
  {
    name: "Exercise",
    description: 
      "Getting some movement in can boost the mood!",
    image: 
      "https://w7.pngwing.com/pngs/167/230/png-transparent-dumbbell-bodybuilding-weightlifting-fitness-exercise-workout-icon-pixel-pixel-art-8-bit-thumbnail.png",
    checkIn: false,
  },
  {
    name: "Gratitude",
    description: 
      "Say one thing you're grateful for before bed",
    image: 
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0b7f079-2f3a-4895-8dda-4f6bdb7a6659/daz6ils-83d9e001-46cc-462e-bfeb-114409e0e8b4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2IwYjdmMDc5LTJmM2EtNDg5NS04ZGRhLTRmNmJkYjdhNjY1OVwvZGF6Nmlscy04M2Q5ZTAwMS00NmNjLTQ2MmUtYmZlYi0xMTQ0MDllMGU4YjQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.YhSoLbcK-KRu66nTUQ3B9PB-YmBZLIKl4RsCV8gG9Jk",
    checkIn: false,
  },
  {
    name: "Survive the day",
    description: 
      "You can do it. We all have those days.",
    image: 
      "https://t3.ftcdn.net/jpg/04/46/09/68/360_F_446096863_mbuNBq46AZQETaTY0V8nLH2DcpxNFW9M.jpg",
    checkIn: false,
  },
  {
    name: "Break",
    description: 
      "Taking a step back might give you just want you need to keep moving forward.",
    image: 
      "https://image.pngaaa.com/471/132471-middle.png",
    checkIn: false,
  },
  {
    name: "Rest",
    description: 
      "A good night's sleep can be a serious game changer.",
    image: 
      "https://as2.ftcdn.net/v2/jpg/02/96/46/51/1000_F_296465161_Rhwin3BrGI7QquCbWV3TOdnSuqT6NVUf.jpg",
    checkIn: false,
  },
  {
    name: "Fuel",
    description: 
      "Eating fruits and veggies is a simple way to stay hydrated and stabilize energy throughout the day.",
    image: 
      "https://png.pngtree.com/png-clipart/20210530/ourmid/pngtree-pixel-food-fruit-vegetable-apple-png-image_3373213.jpg",
    checkIn: false,
  },
  {
    name: "Refresh",
    description: 
      "Cold showers are beneficial for relieving stress, and warm promotes the relaxation of our muscles.",
    image: 
      "https://png.pngtree.com/png-clipart/20190118/ourmid/pngtree-hand-drawn-bathtub-bath-bathtub-cartoon-bathtub-png-image_456369.jpg",
    checkIn: false,
  },
  {
    name: "People",
    description: 
      "Fill your day with kindness. Whether it's forgiving yourself, or helping someone else. Do your bed, bud!",
    image: 
      "https://png.pngtree.com/png-clipart/20210216/ourmid/pngtree-heart-8-bit-pixel-png-image_2896183.jpg",
    checkIn: false,
  },
  {
    name: "Stimulate",
    description: 
      "Whether it's a novel, poetry, fan-fic or your favorite blog, reading is an adventure that never ends.",
    image: 
      "https://png.pngtree.com/png-clipart/20210623/ourmid/pngtree-pixel-art-game-supplies-cute-books-png-image_3429895.jpg",
    checkIn: false,
  },
  {
    name: "Motivate",
    description: 
      "Fast or slow, we all grow! Do the best you can today bud!",
    image: 
      "https://png.pngtree.com/png-clipart/20220714/original/pngtree-trophy-cup-winner-pixel-illustration-png-image_8357870.png",
    checkIn: false,
  },
  {
    name: "Study",
    description: 
      "Whether it's science, math, or literature, let's learn something new!",
    image: 
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/58c2773e-e856-416a-ba90-cab5127727b7/d6ruk77-21d73e7f-c04a-4ba8-8610-ad49969cb847.png/v1/fill/w_986,h_656/pixel_pencil__png__can_be_used_as_an_icon__by_marshallmallow_d6ruk77-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjU2IiwicGF0aCI6IlwvZlwvNThjMjc3M2UtZTg1Ni00MTZhLWJhOTAtY2FiNTEyNzcyN2I3XC9kNnJ1azc3LTIxZDczZTdmLWMwNGEtNGJhOC04NjEwLWFkNDk5NjljYjg0Ny5wbmciLCJ3aWR0aCI6Ijw9OTg2In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.fMqoBRdMI4l2_6GR5zkcvHtciUknS12Wk2yhwktmedE",
    checkIn: false,
  },
  {
    name: "Clean your room",
    description: 
      "Decluttering space can help with decluttering the mind.",
    image: 
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d09ac73d-eb31-448c-beb7-5cae85e4df26/dbr1mvp-602299f2-a052-4c76-95ef-906236b95d06.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QwOWFjNzNkLWViMzEtNDQ4Yy1iZWI3LTVjYWU4NWU0ZGYyNlwvZGJyMW12cC02MDIyOTlmMi1hMDUyLTRjNzYtOTVlZi05MDYyMzZiOTVkMDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.am2wkkdXhw2rNuVwdXmZdzjYq0Sd9D26ZzW4kMGxRXM",
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
