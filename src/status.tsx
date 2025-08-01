import { type Status } from "./store";
export default function status({ value }: { value: Status }) {
  switch (value) {
    case "ok":
      return "ok"; //тут вёрстка
    case "fail":
      return "fail"; //тут вёрстка
    default:
      return null;
  }
}
