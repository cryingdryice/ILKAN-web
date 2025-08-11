import progressingIlKanStyle from "../css/components/progressingIlKan.module.css";

type Props = {
  text: string;
};
export default function BasicTag({ text }: Props) {
  return (
    <div className={progressingIlKanStyle.basicTag}>
      <span>{text}</span>
    </div>
  );
}
