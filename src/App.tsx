import { Typography, Navbar } from "@material-tailwind/react";
export default function App() {
  return (
    <div className="flex justify-center">
      <Navbar>
        <ul>
          <Typography
            as="li"
            variant="h3"
            color="blue-gray-800"
            className="font-sans font-extrabold"
          >
            Jestine Vallendra Dwi Putra
          </Typography>
          <Typography as="li" variant="lead" color=""></Typography>
        </ul>
      </Navbar>
    </div>
  );
}
