const users = [
  {
    firstname: "trina",
    username: "t@123",
    lastname: "hennah",
    email: "abc@gmail.com",
    password: "obuprufi",
    growth_level: 23,
    plant_birth_date: "2024-02-01",
  },
  {
    username: "e@123",
    firstname: "estela",
    lastname: "sharp",
    email: "xyz@gmail.com",
    password: "tynal",
    growth_level: 40,
    plant_birth_date: "2024-02-14",
  },
  {
    username: "d@123",
    firstname: "dylan",
    lastname: "Wicker",
    email: "dyl@gmail.com",
    password: "qwerty",
    growth_level: 31,
    plant_birth_date: "2024-02-03",
  },
  {
    username: "ta@123",
    firstname: "tanvi",
    lastname: "patel",
    email: "qwe@gmail.com",
    password: "theralu",
    growth_level: 20,
    plant_birth_date: "2024-02-10",
  },
];

const growth_levels = [
  { growth_level: 1, plantImg: (src = "../plants/plantImg1.png") },
  { growth_level: 2, plantImg: (src = "../plants/plantImg2.png") },
  { growth_level: 3, plantImg: (src = "../plants/plantImg3.png") },
  { growth_level: 4, plantImg: (src = "../plants/plantImg4.png") },
  { growth_level: 5, plantImg: (src = "../plants/plantImg5.png") },
  { growth_level: 6, plantImg: (src = "../plants/plantImg7.png") },
  { growth_level: 7, plantImg: (src = "../plants/plantImg7.png") },
  { growth_level: 8, plantImg: (src = "../plants/plantImg8.png") },
  { growth_level: 9, plantImg: (src = "../plants/plantImg9.png") },
  { growth_level: 10, plantImg: (src = "../plants/plantImg10.png") },
  { growth_level: 11, plantImg: (src = "../plants/plantImg11.png") },
  { growth_level: 12, plantImg: (src = "../plants/plantImg12.png") },
  { growth_level: 13, plantImg: (src = "../plants/plantImg13.png") },
  { growth_level: 14, plantImg: (src = "../plants/plantImg14.png") },
  { growth_level: 15, plantImg: (src = "../plants/plantImg15.png") },
  { growth_level: 16, plantImg: (src = "../plants/plantImg16.png") },
  { growth_level: 17, plantImg: (src = "../plants/plantImg17.png") },
  { growth_level: 18, plantImg: (src = "../plants/plantImg18.png") },
  { growth_level: 19, plantImg: (src = "../plants/plantImg19.png") },
  { growth_level: 20, plantImg: (src = "../plants/plantImg20.png") },
  { growth_level: 21, plantImg: (src = "../plants/plantImg21.png") },
  { growth_level: 22, plantImg: (src = "../plants/plantImg22.png") },
  { growth_level: 23, plantImg: (src = "../plants/plantImg23.png") },
  { growth_level: 24, plantImg: (src = "../plants/plantImg24.png") },
  { growth_level: 25, plantImg: (src = "../plants/plantImg25.png") },
  { growth_level: 26, plantImg: (src = "../plants/plantImg26.png") },
  { growth_level: 27, plantImg: (src = "../plants/plantImg27.png") },
  { growth_level: 28, plantImg: (src = "../plants/plantImg28.png") },
  { growth_level: 29, plantImg: (src = "../plants/plantImg29.png") },
  { growth_level: 30, plantImg: (src = "../plants/plantImg30.png") },
  { growth_level: 31, plantImg: (src = "../plants/plantImg31.png") },
  { growth_level: 32, plantImg: (src = "../plants/plantImg32.png") },
  { growth_level: 33, plantImg: (src = "../plants/plantImg33.png") },
  { growth_level: 34, plantImg: (src = "../plants/plantImg34.png") },
  { growth_level: 35, plantImg: (src = "../plants/plantImg35.png") },
  { growth_level: 36, plantImg: (src = "../plants/plantImg36.png") },
  { growth_level: 37, plantImg: (src = "../plants/plantImg37.png") },
  { growth_level: 38, plantImg: (src = "../plants/plantImg38.png") },
  { growth_level: 39, plantImg: (src = "../plants/plantImg39.png") },
  { growth_level: 40, plantImg: (src = "../plants/plantImg40.png") },
  { growth_level: 41, plantImg: (src = "../plants/plantImg41.png") },
  { growth_level: 42, plantImg: (src = "../plants/plantImg42.png") },
  { growth_level: 43, plantImg: (src = "../plants/plantImg43.png") },
  { growth_level: 44, plantImg: (src = "../plants/plantImg44.png") },
  { growth_level: 45, plantImg: (src = "../plants/plantImg45.png") },
  { growth_level: 46, plantImg: (src = "../plants/plantImg46.png") },
  { growth_level: 47, plantImg: (src = "../plants/plantImg47.png") },
  { growth_level: 48, plantImg: (src = "../plants/plantImg48.png") },
  { growth_level: 49, plantImg: (src = "../plants/plantImg49.png") },
  { growth_level: 50, plantImg: (src = "../plants/plantImg50.png") },
  { growth_level: 51, plantImg: (src = "../plants/plantImg51.png") },
];

const habits = [
  {
    name: "Hydrate",
    description:
      "Similar to flowers and plants, water helps us grow. Have you watered yourself today?",
    image:
      "https://opengameart.org/sites/default/files/water_bottle_32bit_img_preview.png",
    checkIn: false,
  },
  {
    name: "Breathe",
    description: "Breathe in for 4.",
    image: "https://art.pixilart.com/00df378d675e0f1.png",
    checkIn: false,
  },
  {
    name: "Health",
    description:
      "Taking our medication on time is one fo the best things we can do for ourselves",
    image:
      "https://cdn.pixabay.com/photo/2017/09/23/16/33/pixel-heart-2779422_1280.png",
    checkIn: false,
  },
  {
    name: "Make the bed",
    description: "Healthy soil beds grow healthy plants!",
    image: "https://cdn-icons-png.flaticon.com/512/6543/6543683.png",
    checkIn: false,
  },
  {
    name: "Wash your face",
    description: "Wipe the old dirt away.",
    image:
      "https://png.pngtree.com/png-clipart/20230112/original/pngtree-water-drop-pixels-png-image_8905892.png",
    checkIn: false,
  },
  {
    name: "Step outside of the house",
    description: "Photosynthesize!",
    image:
      "https://i.pinimg.com/originals/61/ff/a4/61ffa46d6942d7cca6165b63e9a18f95.png",
    checkIn: false,
  },
  {
    name: "Get out of bed",
    description: "Embrace the new day.",
    image: "https://i.redd.it/1yhw0o258o1z.png",
    checkIn: false,
  },
  {
    name: "Exercise",
    description: "Getting some movement in can boost the mood!",
    image:
      "https://png.pngtree.com/png-clipart/20220918/original/pngtree-tennis-ball-icon-in-pixel-style-png-image_8622907.png",
    checkIn: false,
  },
  {
    name: "Gratitude",
    description: "Say one thing you're grateful for before bed",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/028/149/414/small_2x/flower-pixel-art-png.png",
    checkIn: false,
  },
  {
    name: "Survive the day",
    description: "You can do it. We all have those days.",
    image:
      "https://png.pngtree.com/png-clipart/20230407/ourmid/pngtree-plant-in-pot-pixel-art-png-image_6681713.png",
    checkIn: false,
  },
  {
    name: "Break",
    description:
      "Taking a step back might give you just want you need to keep moving forward.",
    image:
      "https://i.pinimg.com/originals/98/d1/d6/98d1d629c079abd3c6443195d90f16d2.png",
    checkIn: false,
  },
  {
    name: "Rest",
    description: "A good night's sleep can be a serious game changer.",
    image:
      "https://static.vecteezy.com/system/resources/previews/027/190/648/original/pixel-art-sleeping-persain-cat-png.png",
    checkIn: false,
  },
  {
    name: "Fuel",
    description:
      "Eating fruits and veggies is a simple way to stay hydrated and stabilize energy throughout the day.",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/013/743/158/small_2x/apple-pixel-art-png.png",
    checkIn: false,
  },
  {
    name: "Refresh",
    description:
      "Cold showers are beneficial for relieving stress, and warm promotes the relaxation of our muscles.",
    image:
      "https://static.vecteezy.com/system/resources/previews/028/651/787/original/pixel-art-rubber-duck-icon-png.png",
    checkIn: false,
  },
  {
    name: "People",
    description:
      "Fill your day with kindness. Whether it's forgiving yourself, or helping someone else. Do your best, bud!",
    image:
      "https://images.vexels.com/media/users/3/246281/isolated/preview/44a75eec57302fb40f8458fb56ec2b7f-phone-pixel-art.png",
    checkIn: false,
  },
  {
    name: "Stimulate",
    description:
      "Whether it's a novel, poetry, fan-fic or your favorite blog, reading is an adventure that never ends.",
    image:
      "https://static.vecteezy.com/system/resources/previews/027/205/877/non_2x/isolated-simple-microscope-for-laboratory-in-pixel-art-free-png.png",
    checkIn: false,
  },
  {
    name: "Motivate",
    description: "Fast or slow, we all grow! Do the best you can today bud!",
    image: "https://cdn-icons-png.freepik.com/512/465/465269.png",
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
    description: "Decluttering space can help with decluttering the mind.",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/d09ac73d-eb31-448c-beb7-5cae85e4df26/dbr1mvp-602299f2-a052-4c76-95ef-906236b95d06.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2QwOWFjNzNkLWViMzEtNDQ4Yy1iZWI3LTVjYWU4NWU0ZGYyNlwvZGJyMW12cC02MDIyOTlmMi1hMDUyLTRjNzYtOTVlZi05MDYyMzZiOTVkMDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.am2wkkdXhw2rNuVwdXmZdzjYq0Sd9D26ZzW4kMGxRXM",
    checkIn: false,
  },
];

const goals = [
  {
    frequency: "Daily",
    statement: "Drank 8 glasses of water",
    habitId: 1,
    userId: 1,
  },
  {
    frequency: "Weekly",
    statement: "Practiced deep breathing exercises",
    habitId: 2,
    userId: 1,
  },
];

const activity = [
  {
    userId: 1,
    habitId: 1,
  },
  {
    userId: 2,
    habitId: 1,
  },
  {
    userId: 1,
    habitId: 3,
  },
];

module.exports = { users, habits, goals, activity, growth_levels };
