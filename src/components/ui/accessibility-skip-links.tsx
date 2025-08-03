export function AccessibilitySkipLinks() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus-ring"
      >
        ข้ามไปยังเนื้อหาหลัก
      </a>
      <a
        href="#navigation"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-32 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus-ring"
      >
        ข้ามไปยังเมนู
      </a>
    </>
  );
}