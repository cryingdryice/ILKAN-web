import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import api from "../api/api";

/** input/select/textarea 공통 타입 */
type Inputish = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type ValidatorCtx = {
  form: HTMLFormElement;
  name: string;
  val: string;
  get: (name: string) => string;
};
type Validator = (ctx: ValidatorCtx) => string | null;

export type RuleSet = Record<string, Validator[]>;

export type UseJobPostFormOptions = {
  onSuccess?: (resp: any) => void;
  onError?: (err: unknown) => void;
  onSubmitDataPreview?: (data: Record<string, any>) => void;
};

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

const isEmail: Validator = ({ val }) => {
  if (!val.trim()) return "이메일을 입력해 주세요.";
  // RFC 완전엄격 X, 실무 무난 패턴
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
    ? null
    : "이메일 형식이 올바르지 않습니다.";
};

// 010-1234-5678 / 01012345678 / 02-123-4567 등 한국형 느슨 검증
const isPhoneKR: Validator = ({ val }) => {
  const v = val.replace(/\s+/g, "");
  const ok = /^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(v) || /^0\d{8,10}$/.test(v);
  return ok ? null : "전화번호 형식이 올바르지 않습니다.";
};

const isISODateAfterToday: Validator = ({ val }) => {
  if (!val) return "공고 기한을 선택해 주세요.";
  const d = new Date(val);
  if (Number.isNaN(+d)) return "올바른 날짜가 아닙니다.";
  const now = new Date();
  const todayEnd = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  return d > todayEnd ? null : "마감일은 오늘 이후여야 합니다.";
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

const isInEnum =
  (values: string[], msg?: string): Validator =>
  ({ val }) =>
    values.includes(val) ? null : msg ?? "허용되지 않은 값입니다.";

export default function useJobPostForm(
  rules: RuleSet,
  options?: UseJobPostFormOptions
) {
  const { onSuccess, onError, onSubmitDataPreview } = options || {};
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);

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

  // 폼 전송 직전 값 정규화(타입 변환/트림 등)
  const normalizeForApi = useCallback(
    (raw: Record<string, FormDataEntryValue>) => {
      const obj: any = { ...raw };

      // 트림/공백제거
      if (typeof obj.title === "string") obj.title = obj.title.trim();
      if (typeof obj.workEmail === "string")
        obj.workEmail = obj.workEmail.trim();
      if (typeof obj.workPhoneNumber === "string")
        obj.workPhoneNumber = (obj.workPhoneNumber as string).replace(
          /\s+/g,
          ""
        );

      // 정수 변환
      if (obj.price !== undefined) obj.price = parseInt(String(obj.price), 10);
      if (obj.headCount !== undefined)
        obj.headCount = parseInt(String(obj.headCount), 10);

      // taskDuration은 스키마가 string이라 그대로 두되, 숫자형 문자열 보장용 트림
      if (typeof obj.taskDuration === "string")
        obj.taskDuration = obj.taskDuration.trim();

      return obj;
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      formRef.current = form;

      const pass = validateForm(form);
      if (!pass) return;

      const fd = new FormData(form);
      const raw = Object.fromEntries(fd.entries());
      const data = normalizeForApi(raw);

      onSubmitDataPreview?.(data);

      try {
        const resp = await api.post("/works", data);
        onSuccess?.(resp);
        alert("공고가 등록되었습니다!");
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          __FORM__: "등록 중 오류가 발생했습니다.",
        }));
        onError?.(err);
      }
    },
    [normalizeForApi, onError, onSubmitDataPreview, onSuccess, validateForm]
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
      isISODateAfterToday,
      isInt,
      isInEnum,
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
  };
}
