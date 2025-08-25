import { useEffect, useMemo, useRef, useState } from "react";
import kanFieldStyle from "../../css/components/kanPost/kanField3.module.css";
import addHexagonIcon from "../../assets/kanPost/add-hexagon.png";
import cameraIcon from "../../assets/kanPost/camera-polaroid.png";

type ImgItem = { id: string; file: File; url: string };

const MAX = 3;

type Props = {
  register: (name: string) => Record<string, any>;
  getError: (name: string) => string;
};
export default function KanField3({ register, getError }: Props) {
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
    const input = e.currentTarget;

    // 이미지 파일만 골라내기 (type 비어있는 브라우저 대비 확장자도 체크)
    const picked = Array.from(input.files ?? []);
    const files = picked.filter(
      (f) =>
        f.type.startsWith("image/") ||
        /\.(png|jpe?g|webp|gif|bmp|heic)$/i.test(f.name)
    );
    if (files.length === 0) {
      input.value = ""; // 선택 초기화
      return;
    }

    // 중복 제거
    const existKeys = new Set(
      items.map(
        (it) => `${it.file.name}_${it.file.size}_${it.file.lastModified}`
      )
    );
    const deduped = files.filter(
      (f) => !existKeys.has(`${f.name}_${f.size}_${f.lastModified}`)
    );

    // 최대 개수 제한
    const allowed = deduped.slice(0, remaining);

    const next = [
      ...items,
      ...allowed.map((f) => ({
        id: crypto.randomUUID(),
        file: f,
        url: URL.createObjectURL(f),
      })),
    ];

    // ✅ 1) 먼저 네이티브 선택 비우기 (같은 파일 재선택 허용용)
    input.value = "";

    // ✅ 2) 그 다음, 우리가 유지할 파일 목록을 실제 input.files에 주입
    syncInputFiles(next.map((n) => n.file));

    // ✅ 3) 썸네일 상태 갱신
    setItems(next);
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

  const reg = register("photos");

  return (
    <section className={kanFieldStyle.postFieldContainer}>
      <div className={kanFieldStyle.fieldTitle}>
        <img
          src={cameraIcon}
          alt="new document"
          className={kanFieldStyle.icon}
        />
        <span>
          사진 첨부<span style={{ color: "red" }}>*</span>
        </span>
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
          // ⚠️ 여기 핵심: register의 onChange와 내 onFilesSelected를 모두 호출
          {...reg}
          onChange={(e) => {
            // 1) 훅의 clearValidity 등 유지
            if (typeof reg.onChange === "function") {
              // 타입 가드
              (reg.onChange as any)(e);
            }
            // 2) 내 파일 처리
            onFilesSelected(e);
          }}
        />
        {getError("photos") && (
          <p id="photos-error" className={kanFieldStyle.errorText}>
            {getError("photos")}
          </p>
        )}
      </div>
    </section>
  );
}
