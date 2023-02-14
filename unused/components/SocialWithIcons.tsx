// import Link from "next/link";
// import IconWithTooltip from "src/components/IconWithTooltip";
// import { FaGithub, FaGithubSquare } from "react-icons/fa";
// import { AiFillInstagram, AiFillLinkedin } from "react-icons/ai";
// import Show from "src/utils/client/jsx/Show";
// import { TextSizes } from "src/types/types";
// import { MdEmail } from "react-icons/md";

// export default function SocialsWithIcon({
//   textSize,
//   smTextSize,
//   mdTextSize,
//   lgTextSize,
//   xlTextSize,
//   xxlTextSize,
//   redirectToEmailAddress = false,
// }: TextSizes & {
//   redirectToEmailAddress?: boolean;
// }) {
//   const sizeClasses = `${textSize} ${smTextSize || ""} ${mdTextSize || ""} ${
//     lgTextSize || ""
//   } ${xlTextSize || ""} ${xxlTextSize || ""}`.trim();

//   return (
//     <>
//       <Show when={!redirectToEmailAddress}>
//         <Link aria-label="Email link" href="/contacts" className="block">
//           <IconWithTooltip
//             isButton
//             placement="top"
//             aria-label="Email link button"
//             icon={
//               <MdEmail
//                 className={`${sizeClasses} text-green-400 dark:text-green-300`}
//               />
//             }
//             text="Email"
//           />
//         </Link>
//       </Show>
//       <Show when={redirectToEmailAddress}>
//         <a
//           aria-label="Email link"
//           href="mailto:vallenatwork@gmail.com"
//           className="block"
//         >
//           <IconWithTooltip
//             isButton
//             placement="top"
//             aria-label="Email link button"
//             icon={
//               <MdEmail
//                 className={`${sizeClasses} text-green-400 dark:text-green-300`}
//               />
//             }
//             text="Mail me through an email service instead."
//           />
//         </a>
//       </Show>
//       <Link
//         aria-label="Instagram link"
//         href="https://instagram.com/vallendra_"
//         target="_blank"
//         className="block"
//       >
//         <IconWithTooltip
//           isButton
//           placement="top"
//           aria-label="Instagram link button"
//           icon={<AiFillInstagram className={`${sizeClasses} text-pink-300`} />}
//           text="Instagram"
//         />
//       </Link>
//       <Link
//         aria-label="Github link"
//         href="https://github.com/vallendraa"
//         target="_blank"
//         className="block"
//       >
//         <IconWithTooltip
//           isButton
//           placement="top"
//           aria-label="Github link button"
//           icon={
//             <FaGithubSquare
//               className={`${sizeClasses} text-gray-800 dark:text-gray-100`}
//             />
//           }
//           text="Github"
//         />
//       </Link>
//       <Link
//         aria-label="Linkedin link"
//         href="https://www.linkedin.com/in/vallendra/"
//         target="_blank"
//         className="block"
//       >
//         <IconWithTooltip
//           isButton
//           placement="top"
//           aria-label="Linkedin link button"
//           icon={<AiFillLinkedin className={`${sizeClasses} text-blue-600`} />}
//           text="LinkedIn"
//         />
//       </Link>
//     </>
//   );
// }

export {};
