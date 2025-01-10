import type {Route} from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    {title: "New React Router App"},
    {name: "description", content: "Welcome to React Router!"},
  ];
}

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <h1 className="font-bold text-7xl"> PawPrint </h1>
      <h1> Coming Soon </h1>
    </div>
  );
}
