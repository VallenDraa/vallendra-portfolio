import Certificate from "../../../interfaces/certificate.interface";
import progLangCertificates from "./progLang/progLangCertificates";
import webCertificates from "./web/webCertificates";

const allCertificates: Certificate[] = [
  ...webCertificates,
  ...progLangCertificates,
];

export default allCertificates;
