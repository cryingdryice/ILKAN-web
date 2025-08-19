import { useParams } from "react-router-dom";

export default function JobsApplicationPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>{id}번 일거리 지원 페이지</h1>
      {/* id를 기반으로 상세 내용 불러오기 */}
    </div>
  );
}
