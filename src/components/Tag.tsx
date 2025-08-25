import progressingIlKanStyle from "../css/components/myPage/progressingIlKan.module.css";

type Props = {
  category: string;
  text: string;
};

export default function Tag({ category, text }: Props) {
  const tagClass =
    category === "main"
      ? progressingIlKanStyle.mainTag
      : progressingIlKanStyle.basicTag;

  return (
    <div className={tagClass}>
      <span>{text}</span>
    </div>
  );
}
