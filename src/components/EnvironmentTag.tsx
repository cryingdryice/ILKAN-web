import progressingIlKanStyle from "../css/components/progressingIlKan.module.css";

type Props = {
  text: string;
};
export default function EnvironmentTag({ text }: Props) {
  return (
    <div className={progressingIlKanStyle.environmentTag}>
      <span>{text}</span>
    </div>
  );
}
