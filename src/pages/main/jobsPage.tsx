type WorkItem = {
  id: number;
  title: string;
  writer: string;
  price: string;
  image?: string;
};

const MOCK_LIST: WorkItem[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: "인스타 분위기 카페 BI 디자인 외주 의뢰",
  writer: "카페 반절 (개인 사업자)",
  price: "500,000원~",
}));

export default function JobsPage() {
  const list = MOCK_LIST;
  return (
    <div>
      <nav>
        <button type="button">디자인</button>
        <button type="button">사진/영상</button>
        <button type="button">개발</button>
        <button type="button">법률</button>
        <button type="button">기타</button>
      </nav>
      <section>
        {list.map((item) => (
          <article key={item.id}>
            <div>
              <h3 title={item.title}>{item.title}</h3>
              <div>
                <span />
                <span>{item.writer}</span>
              </div>
              <div>{item.price}</div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
