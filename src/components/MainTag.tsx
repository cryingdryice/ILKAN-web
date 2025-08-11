import progressingIlKanStyle from "../css/components/progressingIlKan.module.css";

type Props = {
  text: string;
};
export default function MainTag({ text }: Props) {
  return (
    <div className={progressingIlKanStyle.mainTag}>
      <span>{text}</span>
    </div>
  );
}
