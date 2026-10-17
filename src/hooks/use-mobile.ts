import * as React from "react"

const MOBILE_BREAKPOINT = 768

/* matchMedia نظام خارجي عن React؛ نقرأه عبر useSyncExternalStore بدل
 * setIsMobile داخل useEffect. هذا يمنع التحديث المتزامن للحالة داخل الـ effect
 * (cascading renders) ويحافظ على نفس السلوك: false على الخادم، والقيمة الحقيقية
 * بعد الترطيب، مع الاستجابة لتغيّر حجم الشاشة. */
const subscribe = (onStoreChange: () => void) => {
  const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  mql.addEventListener("change", onStoreChange)
  return () => mql.removeEventListener("change", onStoreChange)
}

const getSnapshot = () => window.innerWidth < MOBILE_BREAKPOINT

const getServerSnapshot = () => false

export function useIsMobile() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
