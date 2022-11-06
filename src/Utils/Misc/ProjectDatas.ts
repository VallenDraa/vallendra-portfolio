import { IProject } from "../../Interfaces/Interfaces";
import konnect from "../../Images/projects/konnect.png";
import casera from "../../Images/projects/casera.png";
import triquest from "../../Images/projects/triquest.png";
import ultimaWidget from "../../Images/projects/ultima_widget.png";

const projects: IProject[] = [
  {
    _id: "1",
    name: "Ultima Widget",
    description:
      "A simple weather dashboard web app built using vanilla Javascript and CSS. By building this site I was introduced to the concept of  API and asynchronous Javascript.",
    rating: null,
    image: ultimaWidget,
    tech: ["javascript", "css"],
    categories: ["dynamic site"],
    comments: [],
    createdAt: new Date("Mar 2 2022"),
    link: "https://ultimawidget.herokuapp.com/",
  },
  {
    _id: "2",
    name: "Triquest",
    description:
      "A quiz game website built using ejs and Node.js. This site was built for training my capabilty of using external API(OpenTDB) and integrating it with my own personal backend.",
    rating: null,
    image: triquest,
    tech: ["javascript", "css", "node.js", "ejs", "tailwind css", "mongoDB"],
    categories: ["dynamic site", "games"],
    comments: [],
    createdAt: new Date("Mar 23, 2022"),
    link: "https://triquest.herokuapp.com/",
  },
  {
    _id: "3",
    name: "Casera",
    description:
      "A recipe finder web app built using React and Node.js. I built this website because often times i see my mother don't know what to cook. So this is my way to help her on that particular problem.",
    rating: null,
    image: casera,
    tech: ["javascript", "css", "node.js", "react", "tailwind css", "mongoDB"],
    categories: ["dynamic site"],
    comments: [],
    createdAt: new Date("May 7, 2022"),
    link: "https://cas-era.herokuapp.com/",
  },
  {
    _id: "4",
    name: "Konnect",
    description:
      "A chat web app built using React and Node.js. Web Socket technology was used in this project, enabling fast and instant two way communication from client to the server.",
    rating: null,
    image: konnect,
    tech: [
      "javascript",
      "css",
      "node.js",
      "react",
      "tailwind css",
      "socket.io",
    ],
    categories: ["dynamic site"],
    comments: [],
    createdAt: new Date("Oct 17, 2022"),
    link: "https://kon-nect.herokuapp.com/",
  },
];

export default projects;
