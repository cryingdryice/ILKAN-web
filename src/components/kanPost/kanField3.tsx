import { useEffect, useMemo, useRef, useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField3.module.css";
import addHexagonIcon from "../../assets/kanPost/add-hexagon.png";
import cameraIcon from "../../assets/kanPost/camera-polaroid.png";

type ImgItem = { id: string; file: File; url: string };

const MAX = 3;

export default function KanField3() {
  const [items, setItems] = useState<ImgItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // 이미 선택된 파일들의 FileList를 실제 input에 동기화 (폼 전송용)
  const syncInputFiles = (files: File[]) => {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
  };

  // 오브젝트 URL 정리
  useEffect(() => {
    return () => {
      items.forEach((it) => URL.revokeObjectURL(it.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const remaining = MAX - items.length;

  const onAddClick = () => inputRef.current?.click();

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) return;

    // 중복 방지 키
    const existKeys = new Set(
      items.map(
        (it) => `${it.file.name}_${it.file.size}_${it.file.lastModified}`
      )
    );

    const allowed = files
      .filter((f) => !existKeys.has(`${f.name}_${f.size}_${f.lastModified}`))
      .slice(0, remaining);

    const next = [
      ...items,
      ...allowed.map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        url: URL.createObjectURL(f),
      })),
    ];

    setItems(next);
    syncInputFiles(next.map((n) => n.file));

    // 여러 번 선택해도 같은 input 재사용할 수 있게 값 초기화
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeAt = (id: string) => {
    const next = items.filter((it) => it.id !== id);
    const removed = items.find((it) => it.id === id);
    if (removed) URL.revokeObjectURL(removed.url);
    setItems(next);
    syncInputFiles(next.map((n) => n.file));
  };

  // 접근성용 라벨
  const addLabel = useMemo(() => `사진추가 (${remaining}/${MAX})`, [remaining]);

  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={cameraIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        사진 첨부
      </div>

      <div className={kanFieldStyle.fieldList}>
        {/* 업로드된 썸네일들 */}
        {items.map((it) => (
          <figure key={it.id} className={kanFieldStyle.card}>
            <img
              src={it.url}
              alt="업로드한 이미지 미리보기"
              className={kanFieldStyle.img}
            />
            <button
              type="button"
              aria-label="이미지 삭제"
              className={kanFieldStyle.removeBtn}
              onClick={() => removeAt(it.id)}
            >
              X
            </button>
          </figure>
        ))}

        {/* 추가 버튼 (남은 자리가 있을 때만) */}
        {items.length < MAX && (
          <button
            type="button"
            className={kanFieldStyle.addCard}
            onClick={onAddClick}
            aria-label={addLabel}
            title={addLabel}
          >
            <span className={kanFieldStyle.addIcon} aria-hidden="true">
              <img
                src={addHexagonIcon}
                alt="new document"
                className={kanFieldStyle.icon}
              />
            </span>
            <span className={kanFieldStyle.addText}>
              사진추가 ({items.length}/{MAX})
            </span>
          </button>
        )}

        {/* 실제 폼 전송용 파일 인풋 (숨김) */}
        <input
          ref={inputRef}
          className={kanFieldStyle.hiddenInput}
          type="file"
          name="photos"
          accept="image/*"
          multiple
          onChange={onFilesSelected}
        />
      </div>
    </section>
  );
}
