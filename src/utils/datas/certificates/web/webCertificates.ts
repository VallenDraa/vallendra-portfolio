import ICertificate from "../../../../interfaces/certificateInterface";

const webCertificates: ICertificate[] = [
  {
    _id: "1",
    name: "Belajar Dasar Pemrograman Web",
    slug: "belajar-dasar-pemrograman-web",
    shortDescription: "lorem ipsu",
    description: "lorem ipsu",
    views: 123123,
    likes: 1234,
    image: "/images/certificates/web-dasar-dicoding.png",
    categoryIds: ["2"],
    createdAt: new Date("Dec 30, 2022").toUTCString(),
    certificateLink: "https://www.dicoding.com/certificates/6RPN6YEERP2M",
  },
];

export default webCertificates;
