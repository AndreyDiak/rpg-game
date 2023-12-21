import { Link } from "react-router-dom";

type Link = {
   title: string;
   to: string;
};

const LINKS: Link[] = [
   {
      title: "Карты",
      to: "/cards",
   },
   {
      title: "Играть",
      to: "/",
   },
   {
      title: "Магазин",
      to: "/shop",
   },
];

export const Header = () => {
   return (
      <div>
         {LINKS.map(({ title, to }) => (
            <Link to={to}>{title}</Link>
         ))}
      </div>
   );
};
