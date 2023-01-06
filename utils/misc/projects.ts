import { IProject } from "../../interfaces/Interfaces";

const projects: IProject[] = [
  {
    _id: "1",
    name: "Konnect",
    shortDescription: "A chat web app built using React and Node.js",
    description:
      "A chat web app built using React and Node.js. Web Socket technology was used in this project, enabling fast instant two way communication from client to the server.",
    rating: null,
    image: "/images/projects/konnect.png",
    tech: [
      "html",
      "javascript",
      "css",
      "node.js",
      "react",
      "tailwind css",
      "socket.io",
      "mongodb",
    ],
    categories: ["dynamic site", "real time", "crud", "Web Socket"],
    comments: [],
    createdAt: new Date("Oct 17, 2022"),
    siteLink: "https://kon-nect.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/konnect",
  },
  {
    _id: "2",
    name: "Casera",
    shortDescription: "A recipe finder web app built using React and Node.js",
    description:
      "A recipe finder web app built using React and Node.js. I built this site to help those that don't know how to cook. Simply search a recipe and voila",
    rating: null,
    image: "/images/projects/casera.png",
    tech: [
      "html",
      "javascript",
      "css",
      "node.js",
      "react",
      "tailwind css",
      "mongodb",
    ],
    categories: ["dynamic site", "crud"],
    comments: [],
    createdAt: new Date("May 7, 2022"),
    siteLink: "https://cas-era.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/casera",
  },
  {
    _id: "3",
    name: "Triquest",
    shortDescription: "A quiz game web app built using Node.js as the backend",
    description:
      "A quiz game web app built using Node.js as the backend. This site was built for training my capabilty of using external API (OpenTDB) and integrating it with my own personalized backend.",
    rating: null,
    image: "/images/projects/triquest.png",
    tech: ["html", "javascript", "css", "node.js", "tailwind css", "mongodb"],
    categories: ["dynamic site", "games", "crud"],
    comments: [],
    createdAt: new Date("Mar 23, 2022"),
    siteLink: "https://triquest.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/triquest",
  },
  {
    _id: "4",
    name: "Ultima Widget",
    shortDescription:
      "A simple weather dashboard web app built using vanilla JS and CSS",
    description:
      "A simple weather dashboard web app built using vanilla JS and CSS. By building this site I was introduced to the concept of  API and asynchronous Javascript.",
    rating: null,
    image: "/images/projects/ultima_widget.png",
    tech: ["html", "javascript", "css"],
    categories: ["dynamic site"],
    comments: [],
    createdAt: new Date("Mar 2 2022"),
    siteLink: "https://ultimawidget.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/ultima_widget",
  },
];

export default projects;
