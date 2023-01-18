import ICertificate from "../../../../interfaces/certificateInterface";

const progLangCertificates: ICertificate[] = [
  {
    _id: "2",
    name: "Belajar Dasar Pemrograman Javascript",
    slug: "belajar-dasar-pemrograman-javascript",
    shortDescription: "lorem ipsu",
    description: "lorem ipsu",
    views: 123123,
    likes: 1234,
    image: "/images/certificates/js-dasar-dicoding.png",
    categoryIds: ["1"],
    createdAt: new Date("Jan 11, 2023").toUTCString(),
    certificateLink: "https://www.dicoding.com/certificates/07Z6G32GWXQR",
  },
];

export default progLangCertificates;