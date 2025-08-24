import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../api/api";
import { useLoading } from "../context/LoadingContext"; // ⬅️ setLoading 사용

type Inputish = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type ValidatorCtx = {
  form: HTMLFormElement;
  name: string;
  val: string;
  get: (name: string) => string;
};
type Validator = (ctx: ValidatorCtx) => string | null;
export type RuleSet = Record<string, Validator[]>;
export type UseBuildingPostFormOptions = {
  onSuccess?: (resp: any) => void;
  onError?: (err: unknown) => void;
  onSubmitDataPreview?: (data: Record<string, any>) => void;
};

/** ───── 기본 규칙 */
const required =
  (msg = "필수 입력입니다."): Validator =>
  ({ val }) =>
    val.trim() ? null : msg;
const minLen =
  (n: number, msg?: string): Validator =>
  ({ val }) =>
    val.trim().length >= n ? null : msg ?? `${n}자 이상 입력해 주세요.`;
const maxLen =
  (n: number, msg?: string): Validator =>
  ({ val }) =>
    val.trim().length <= n ? null : msg ?? `${n}자 이내로 입력해 주세요.`;
const isEmail: Validator = ({ val }) =>
  val.trim()
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
      ? null
      : "이메일 형식이 올바르지 않습니다."
    : "이메일을 입력해 주세요.";
const isPhoneKR: Validator = ({ val }) => {
  const v = val.replace(/\s+/g, "");
  return /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v) || /^0\d{8,10}$/.test(v)
    ? null
    : "전화번호 형식이 올바르지 않습니다.";
};
const isInt =
  (opts?: { min?: number; max?: number; msg?: string }): Validator =>
  ({ val }) => {
    const t = val.trim();
    if (!/^-?\d+$/.test(t)) return opts?.msg ?? "숫자만 입력해 주세요.";
    const n = parseInt(t, 10);
    if (opts?.min !== undefined && n < opts.min)
      return `${opts.min} 이상 입력해 주세요.`;
    if (opts?.max !== undefined && n > opts.max)
      return `${opts.max} 이하로 입력해 주세요.`;
    return null;
  };
const isUpperEnum =
  (msg = "대문자(언더스코어 포함)만 입력해 주세요."): Validator =>
  ({ val }) =>
    /^[A-Z][A-Z_]*$/.test(val) ? null : msg;
const isInEnum =
  (values: string[], msg?: string): Validator =>
  ({ val }) =>
    values.includes(val) ? null : msg ?? "허용되지 않은 값입니다.";

/** ───── 파일 규칙(단일/다중) */
const fileRequired =
  (msg = "파일을 선택해 주세요."): Validator =>
  ({ form, name }) => {
    const f = (form.elements.namedItem(name) as HTMLInputElement)?.files?.[0];
    return f ? null : msg;
  };
const fileExt =
  (exts: string[], msg?: string): Validator =>
  ({ form, name }) => {
    const f = (form.elements.namedItem(name) as HTMLInputElement)?.files?.[0];
    if (!f) return null;
    return exts.some((e) =>
      f.name.toLowerCase().endsWith("." + e.toLowerCase())
    )
      ? null
      : msg ?? `${exts.join(", ")} 형식만 가능합니다.`;
  };
const fileMaxSizeMB =
  (mb: number, msg?: string): Validator =>
  ({ form, name }) => {
    const f = (form.elements.namedItem(name) as HTMLInputElement)?.files?.[0];
    if (!f) return null;
    return f.size <= mb * 1024 * 1024
      ? null
      : msg ?? `${mb}MB 이하 파일만 업로드 가능합니다.`;
  };
// 다중 파일 전용
const filesMinCount =
  (n: number, msg?: string): Validator =>
  ({ form, name }) => {
    const files = (form.elements.namedItem(name) as HTMLInputElement)?.files;
    return files && files.length >= n
      ? null
      : msg ?? `이미지를 최소 ${n}개 업로드해 주세요.`;
  };
const filesAllExt =
  (exts: string[], msg?: string): Validator =>
  ({ form, name }) => {
    const files = (form.elements.namedItem(name) as HTMLInputElement)?.files;
    if (!files || files.length === 0) return null;
    const ok = Array.from(files).every((f) =>
      exts.some((e) => f.name.toLowerCase().endsWith("." + e.toLowerCase()))
    );
    return ok ? null : msg ?? `${exts.join(", ")} 형식만 가능합니다.`;
  };
const filesAllMaxSizeMB =
  (mb: number, msg?: string): Validator =>
  ({ form, name }) => {
    const files = (form.elements.namedItem(name) as HTMLInputElement)?.files;
    if (!files || files.length === 0) return null;
    const ok = Array.from(files).every((f) => f.size <= mb * 1024 * 1024);
    return ok ? null : msg ?? `각 파일은 ${mb}MB 이하여야 합니다.`;
  };

/** ───── 시간(HH:MM) 유효성 + 순서 */
const is24hTime: Validator = ({ val }) =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test(val)
    ? null
    : "시간 형식(HH:MM)이 올바르지 않습니다.";
const isEndAfterStart =
  (startField: string, msg = "퇴실 시간은 입실 이후여야 합니다."): Validator =>
  ({ form, val }) => {
    const s =
      (form.elements.namedItem(startField) as HTMLInputElement)?.value || "";
    if (!s || !val) return null; // 둘 다 있을 때만 검사
    const [sh, sm] = s.split(":").map(Number);
    const [eh, em] = val.split(":").map(Number);
    const startMin = sh * 60 + sm,
      endMin = eh * 60 + em;
    return endMin > startMin ? null : msg;
  };

/** ───── 지역(한글 → ENUM) 매핑: 필요 시 교체 */
export const REGION_KR_TO_ENUM: Record<string, string> = {
  서울: "SEOUL",
  부산: "BUSAN",
  대구: "DAEGU",
  인천: "INCHEON",
  광주: "GWANGJU",
  대전: "DAEJEON",
  울산: "ULSAN",
  세종: "SEJONG",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  전북: "JEONBUK",
  전남: "JEONNAM",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  제주: "JEJU",
};

const MIN_SHOW_MS = 200; // ⬅️ 스피너 최소 표시시간

export default function useBuildingPostForm(
  rules: RuleSet,
  options?: UseBuildingPostFormOptions
) {
  const { onSuccess, onError, onSubmitDataPreview } = options || {};
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); // ⬅️ 버튼 보호
  const formRef = useRef<HTMLFormElement | null>(null);

  const { setLoading } = useLoading(); // ⬅️ 전역 로딩

  const clearValidity = useCallback((e: SyntheticEvent<Inputish>) => {
    const name = (e.currentTarget as Inputish).name;
    setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
  }, []);

  const setFieldValue = useCallback((name: string, value: string) => {
    const form = formRef.current;
    if (!form) return;
    const el = form.elements.namedItem(name) as HTMLInputElement | null;
    if (el) {
      el.value = value;
      setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
    }
  }, []);

  const validateField = useCallback(
    (form: HTMLFormElement, name: string) => {
      const el = form.elements.namedItem(name) as HTMLInputElement | null;
      const value = (el?.value ?? "").toString();
      const fieldRules = rules[name] || [];
      const ctx: ValidatorCtx = {
        form,
        name,
        val: value,
        get: (n) =>
          (form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "",
      };
      for (const v of fieldRules) {
        const msg = v(ctx);
        if (msg) {
          setErrors((prev) => ({ ...prev, [name]: msg }));
          return false;
        }
      }
      setErrors((prev) => (prev[name] ? { ...prev, [name]: "" } : prev));
      return true;
    },
    [rules]
  );

  const validateForm = useCallback(
    (form: HTMLFormElement) => {
      let ok = true;
      for (const name of Object.keys(rules)) {
        const passed = validateField(form, name);
        if (!passed) ok = false;
      }
      if (!ok) {
        const first = Object.keys(rules).find(
          (n) =>
            !!(
              form.elements.namedItem(n) &&
              (errors[n] || !validateField(form, n))
            )
        );
        (first
          ? (form.elements.namedItem(first) as HTMLElement | null)
          : null
        )?.focus?.();
      }
      return ok;
    },
    [errors, rules, validateField]
  );

  const normalizeText = (obj: Record<string, FormDataEntryValue>) => {
    const out: any = { ...obj };
    const trim = (k: string) =>
      typeof out[k] === "string" ? (out[k] = (out[k] as string).trim()) : null;

    [
      "phoneNumber",
      "buildingAddress",
      "buildingName",
      "email",
      "buildingRegion",
      "buildingTag",
      "buildingDescription",
      "checkIn",
      "checkOut",
    ].forEach(trim);

    if (out.buildingPrice !== undefined)
      out.buildingPrice = parseInt(String(out.buildingPrice), 10);
    if (typeof out.phoneNumber === "string")
      out.phoneNumber = (out.phoneNumber as string).replace(/\s+/g, "");
    return out;
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      formRef.current = form;

      if (submitting) return; // ⬅️ 중복 제출 방지

      // 1) 검증
      const pass = validateForm(form);
      if (!pass) return;

      // 2) 폼 값
      const fd = new FormData(form);
      const raw = Object.fromEntries(fd.entries());
      const textOnly = normalizeText(raw);

      const dataJson: any = {
        phoneNumber: textOnly.phoneNumber,
        buildingAddress: textOnly.buildingAddress,
        buildingName: textOnly.buildingName,
        buildingPrice: textOnly.buildingPrice,
        email: textOnly.email,
        buildingRegion: textOnly.buildingRegion,
        buildingTag: textOnly.buildingTag,
        buildingDescription: textOnly.buildingDescription,
      };
      if (textOnly.checkIn) dataJson.checkIn = textOnly.checkIn;
      if (textOnly.checkOut) dataJson.checkOut = textOnly.checkOut;

      // 3) multipart 조립: data(JSON) + files
      const out = new FormData();
      out.append(
        "data",
        new Blob([JSON.stringify(dataJson)], { type: "application/json" })
      );

      const main = (form.elements.namedItem("mainImage") as HTMLInputElement)
        ?.files?.[0];
      const sub1 = (form.elements.namedItem("subImage1") as HTMLInputElement)
        ?.files?.[0];
      const sub2 = (form.elements.namedItem("subImage2") as HTMLInputElement)
        ?.files?.[0];

      const photos = (form.elements.namedItem("photos") as HTMLInputElement)
        ?.files;

      if (main || sub1 || sub2) {
        if (main) out.append("mainImage", main);
        if (sub1) out.append("subImage1", sub1);
        if (sub2) out.append("subImage2", sub2);
      } else if (photos && photos.length) {
        out.append("mainImage", photos[0]);
        if (photos[1]) out.append("subImage1", photos[1]);
        if (photos[2]) out.append("subImage2", photos[2]);
      }

      onSubmitDataPreview?.(dataJson);

      // 4) 로딩 + 최소 표시시간 보장
      const startedAt = Date.now();
      setSubmitting(true);
      setLoading(true);

      let successResp: any | null = null;
      let errorObj: unknown = null;

      try {
        const resp = await api.post("/buildings", out, {
          headers: { "X-Role": "OWNER" },
        });
        successResp = resp;
      } catch (err) {
        errorObj = err;
        setErrors((prev) => ({
          ...prev,
          __FORM__: "등록 중 오류가 발생했습니다.",
        }));
      } finally {
        const elapsed = Date.now() - startedAt;
        if (elapsed < MIN_SHOW_MS) {
          await new Promise((r) => setTimeout(r, MIN_SHOW_MS - elapsed));
        }
        setLoading(false);
        setSubmitting(false);
      }

      // 5) 스피너 내린 뒤 후처리(렌더 블록 방지)
      if (successResp) {
        // alert("건물 등록이 완료되었습니다!"); // 필요시 토스트/모달 권장
        onSuccess?.(successResp);
      } else if (errorObj) {
        onError?.(errorObj);
      }
    },
    [
      normalizeText,
      onSubmitDataPreview,
      onSuccess,
      onError,
      setLoading,
      submitting,
      validateForm,
    ]
  );

  const register = useCallback(
    (name: string) => {
      const err = errors[name];
      return {
        name,
        "aria-invalid": !!err || undefined,
        "aria-describedby": err ? `${name}-error` : undefined,
        onInput: clearValidity as any,
        onChange: clearValidity as any,
      } as const;
    },
    [clearValidity, errors]
  );

  const getError = useCallback((name: string) => errors[name] || "", [errors]);

  const builtinRules = useMemo(
    () => ({
      required,
      minLen,
      maxLen,
      isEmail,
      isPhoneKR,
      isInt,
      isUpperEnum,
      isInEnum,
      fileRequired,
      fileExt,
      fileMaxSizeMB,
      filesMinCount,
      filesAllExt,
      filesAllMaxSizeMB,
      is24hTime,
      isEndAfterStart,
    }),
    []
  );

  return {
    handleSubmit,
    register,
    clearValidity,
    setFieldValue,
    errors,
    getError,
    builtinRules,
    submitting, // ⬅️ 페이지에서 버튼 비활성/레이블 제어
  };
}
