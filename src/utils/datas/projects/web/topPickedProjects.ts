import { Project } from "../../../../interfaces/project.interface";

const topPickedProjects: Project[] = [
  {
    _id: "1",
    name: "Konnect",
    slug: "konnect",
    shortDescriptionEN:
      "A chat web app built using React and Node.js with Socket.io for real-time connection",
    descriptionEN:
      "A chat web app built using React and Node.js. Web Socket technology was used in this project, enabling fast instant two way communication from client to the server.",
    shortDescriptionID:
      "A chat web app built using React and Node.js with Socket.io for real-time connection",
    descriptionID:
      "A chat web app built using React and Node.js. Web Socket technology was used in this project, enabling fast instant two way communication from client to the server.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/konnect.png",
    tech: ["react", "tailwind css", "node.js", "socket.io", "mongodb"],
    categoryIds: ["1"],
    madeAt: new Date("Oct 17, 2022").toISOString(),
    siteLink: "https://kon-nect.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/konnect",
    isTopPick: true,
  },
  {
    _id: "2",
    name: "Casera",
    slug: "casera",
    shortDescriptionEN: "A recipe finder web app built using React and Node.js",
    descriptionEN:
      "The purpose of this site is to assist individuals who are not familiar with cooking by providing them with an easy way to search for recipes. With this app, users can simply search for a recipe and the app will provide them with the necessary information to prepare it. Users can also save a certain recipe for later use as well.",
    shortDescriptionID: "A recipe finder web app built using React and Node.js",
    descriptionID:
      "The purpose of this site is to assist individuals who are not familiar with cooking by providing them with an easy way to search for recipes. With this app, users can simply search for a recipe and the app will provide them with the necessary information to prepare it. Users can also save a certain recipe for later use as well.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/casera.png",
    tech: ["react", "tailwind css", "node.js", "mongodb"],
    categoryIds: ["1"],
    madeAt: new Date("May 7, 2022").toISOString(),
    siteLink: "https://cas-era.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/casera",
    isTopPick: true,
  },
  {
    _id: "3",
    name: "Triquest",
    slug: "triquest",
    shortDescriptionEN:
      "A quiz game web app built using Node.js as the backend",
    descriptionEN:
      "A quiz game web app built using Node.js as the backend. This site was built for training my capabilty of using external API (OpenTDB) and integlikes it with my own personalized backend.",
    shortDescriptionID:
      "A quiz game web app built using Node.js as the backend",
    descriptionID:
      "A quiz game web app built using Node.js as the backend. This site was built for training my capabilty of using external API (OpenTDB) and integlikes it with my own personalized backend.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/triquest.png",
    tech: ["html", "tailwind css", "javascript", "node.js", "mongodb"],
    categoryIds: ["1"],
    madeAt: new Date("Mar 23, 2022").toISOString(),
    siteLink: "https://triquest.herokuapp.com/",
    gitLink: "https://github.com/VallenDraa/triquest",
    isTopPick: true,
  },
  {
    _id: "4",
    name: "Ultima Widget",
    slug: "ultima-widget",
    shortDescriptionEN:
      "A simple weather dashboard web app built using vanilla JS and CSS",
    descriptionEN:
      "A simple weather dashboard web app built using vanilla JS and CSS. By building this site I was introduced to the concept of  API and asynchronous Javascript.",
    shortDescriptionID:
      "A simple weather dashboard web app built using vanilla JS and CSS",
    descriptionID:
      "A simple weather dashboard web app built using vanilla JS and CSS. By building this site I was introduced to the concept of  API and asynchronous Javascript.",
    views: 69420,
    likes: 1231,
    image: "/images/projects/ultima-widget.png",
    tech: ["html", "css", "javascript"],
    categoryIds: ["1"],
    madeAt: new Date("Mar 2 2022").toISOString(),
    siteLink: "https://ultimawidget.cyclic.app/",
    gitLink: "https://github.com/VallenDraa/ultima_widget",
    isTopPick: true,
  },
];

export default topPickedProjects;
