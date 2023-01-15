import ICertificate from "../../../interfaces/certificateInterface";
import progLangCertificates from "./progLang/progLangCertificates";
import webCertificates from "./web/webCertificates";

const allCertificates: ICertificate[] = [
  ...webCertificates,
  ...progLangCertificates,
];

export default allCertificates;
