import Certificate from "../../../../interfaces/certificate.interface";

const webCertificates: Certificate[] = [
  {
    _id: "1",
    name: "Belajar Dasar Pemrograman Web",
    slug: "belajar-dasar-pemrograman-web",
    shortDescriptionEN: "lorem ipsu",
    descriptionEN: "lorem ipsu",
    shortDescriptionID: "belajar-dasar-pemrograman",
    descriptionID: "belajar-dasar-pemrograman-",
    views: 123123,
    likes: 1234,
    image: "/images/certificates/web-dasar-dicoding.png",
    categoryIds: ["2"],
    madeAt: new Date("Dec 30, 2022").toUTCString(),
    certificateLink: "https://www.dicoding.com/certificates/6RPN6YEERP2M",
  },
];

export default webCertificates;
