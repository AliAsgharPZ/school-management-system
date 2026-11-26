# قرارداد کامپوننت‌های طراحی بهار
نسخه: 3.0 · مکمل `docs/design-language.md`

این سند قرارداد رفتاری و بصری کامپوننت‌های مشترک است. کامپوننت فقط وقتی «آماده» است که ظاهر، API، دسترس‌پذیری، حالت‌های خطا و رفتار موبایل آن مشخص باشد.

## 1. قواعد مشترک

- از TypeScript دقیق استفاده شود؛ `any` برای props عمومی ممنوع.
- `className` برای extension مجاز است، اما نباید invariantهای دسترس‌پذیری یا اندازهٔ لمس را حذف کند.
- props بومی HTML تا حد ممکن forward شوند؛ `ref` و data attributes حفظ شوند.
- action با `button` و navigation با `a/Link`.
- هر icon-only button دارای accessible name.
- حالت loading باید از double submit جلوگیری کند.
- در تمام کنترل‌ها focus-visible، disabled و invalid تعریف شود.
- کامپوننت‌ها باید با RTL/LTR و هر دو تم کار کنند.
- primitiveهای Radix موجود حفظ شوند؛ focus trap، keyboard handling و collision positioning نباید با div سفارشی جایگزین شوند.

## 2. Button

### Variants
- `primary`: یک کنش اصلی؛ زمینهٔ سبز برند و متن با کنتراست مناسب.
- `secondary`: زمینهٔ خنثی و مرز ظریف.
- `outline`: زمینهٔ شفاف با مرز قابل مشاهده.
- `ghost`: بدون زمینهٔ دائمی؛ hover/focus واضح.
- `destructive`: عملیات مخرب.
- `link`: navigation یا action متنی با affordance روشن.

### Sizes
- `sm`: ارتفاع 36px دسکتاپ؛ در touch container حداقل 44px hit-area.
- `default`: ارتفاع 40–44px.
- `lg`: ارتفاع 48px.
- `icon`: مربع 40px دسکتاپ و 44px موبایل.

### Behavior
- رفتار بومی type حفظ شود؛ درون فرم برای کنش‌های غیرارسال حتماً `type="button"` و برای ارسال `type="submit"` صریحاً تعیین شود.
- loading، spinner را همراه label نشان دهد؛ متن اصلی حذف نشود.
- disabled با aria-disabled یا native disabled مطابق semantics.
- همهٔ دکمه‌های داخل فرم باید type صریح داشته باشند تا submit ناخواسته رخ ندهد.
- variant/size از CVA و توکن‌های مرکزی؛ رنگ مستقیم hex ممنوع.

## 3. Input / Textarea / Select

- label مستقل، description و error با id و aria-describedby متصل شوند.
- focus ring با :focus-visible؛ invalid با border و متن خطا، نه فقط قرمز.
- اندازهٔ فونت موبایل حداقل 16px برای جلوگیری از zoom ناخواسته در مرورگرهای موبایل.
- placeholder فقط نمونه؛ نه label.
- paste و autofill مجاز.
- number/date/time از نوع و inputMode درست استفاده کنند.
- select بومی در Windows/High Contrast دارای foreground/background صریح.
- مقدار controlled همیشه onChange داشته باشد؛ hydration value ثابت و معتبر باشد.

## 4. Checkbox / Radio / Switch

- کل label hit-area باشد.
- keyboard مطابق نوع کنترل: Space برای checkbox/switch، arrow keys برای radio group.
- checked/indeterminate/disabled/focus-visible/invalid تعریف شوند.
- state بصری با shape/checkmark و متن همراه باشد؛ رنگ تنها کافی نیست.
- Switch فقط برای setting دوحالته؛ انتخاب چندگزینه‌ای با checkbox.

## 5. Card / StatCard

- Card به‌طور پیش‌فرض semantic container است و clickable نیست.
- اگر کل کارت لینک است از Link با focus-visible و accessible name استفاده شود.
- CardHeader، CardContent و CardFooter فاصلهٔ منسجم داشته باشند.
- StatCard باید label، value، optional comparison و period را از هم تفکیک کند.
- CountUp برای دادهٔ مالی/حیاتی یا reduced-motion باید بدون تأخیر مقدار واقعی را قابل دسترس نگه دارد؛ screen reader نباید صدها مقدار میانی بشنود.

## 6. Table / DataTable

- caption یا نام قابل دسترس، thead/tbody و th scope صحیح.
- row selection و sort با aria-sort و keyboard.
- عملیات ردیف در منوی آشکار و قابل دسترس؛ hover-only ممنوع.
- sticky header فقط در scroll container درست.
- pagination، page size و sort/filter state باید URL/state پایدار داشته باشند، در صورت پشتیبانی الگوی فعلی.
- عرض ستون‌ها با دادهٔ طولانی، زبان‌های مختلف و viewport باریک تست شود.
- چاپ جدول با screen table style یکی نیست؛ چاپ باید header تکراری و شکست صفحهٔ کنترل‌شده داشته باشد.

## 7. Dialog / AlertDialog / Drawer / Popover

- focus هنگام بازشدن به نقطهٔ منطقی منتقل شود و بعد از بستن به trigger برگردد.
- Escape و کلیک بیرون مطابق اهمیت عملیات؛ برای فرم dirty بستن باید guard داشته باشد.
- AlertDialog برای حذف و اقدام غیرقابل بازگشت.
- اندازه و موقعیت با viewport و safe area سازگار؛ محتوای بلند scroll داخلی داشته باشد.
- z-indexها از scale مرکزی؛ stacking context تصادفی ممنوع.

## 8. Tabs / Menus / Command

- Tabs برای جابه‌جایی بین panelهای هم‌سطح؛ arrow keys و roving tabindex.
- Menu برای actionها؛ arrow keys، Escape، Enter/Space و typeahead.
- Command search برای یافتن ماژول/عملیات؛ نتیجهٔ خالی، loading و no permission.
- هیچ آیتمی صرفاً به‌خاطر ظاهر در منو قرار نگیرد؛ action باید واقعاً کار کند.
- مسیر فعال در navigation با aria-current=page.

## 9. Badge / Toast / Tooltip

- Badge فقط وضعیت یا دسته‌بندی؛ رنگ همراه label.
- Toast برای بازخورد کوتاه و غیرمسدودکننده؛ پیام خطای مهم inline نیز بماند.
- Toastهای success فقط پس از پاسخ موفق سرور.
- Tooltip اطلاعات تکمیلی است؛ label ضروری نباید فقط در tooltip باشد.
- Tooltip با focus نیز فعال شود و در موبایل جایگزین قابل لمس داشته باشد.

## 10. Loading / Empty / Error

- Loading skeleton باید ساختار نهایی را تقلید کند.
- EmptyState توضیح و action معتبر داشته باشد.
- ErrorBox پیام قابل فهم، کد/جزئیات فنی در سطح مناسب و retry امن.
- retry نباید عملیات غیر idempotent را کورکورانه دوباره اجرا کند.

## 11. Charts

- عنوان، بازهٔ زمانی، واحد و خلاصهٔ متنی.
- legend قابل استفاده و رنگ‌های ثابت.
- نمودارهای بدون داده empty state؛ خطاهای fetch error state.
- برای داده‌های حساس به color contrast و الگوی غیررنگی توجه شود.

## 12. PrintSurface

- کامپوننت/قالب چاپی باید دادهٔ آماده و snapshot مشخص داشته باشد.
- toolbar و controls با کلاس مشترک `.no-print` مخفی شوند.
- فقط محتوای چاپی در `.print-surface` قرار گیرد.
- `@page`، اندازهٔ کاغذ و margin در سطح سند چاپی تعیین شود.
- تصاویر/فونت‌ها قبل از فراخوانی print آماده شوند.
- محتوای صفحه نباید از طریق CSS پنهان‌سازی ناقص یا selectorهای سراسری حذف شود.
- چاپ به صفحهٔ سفید، محتوای ناقص یا چند صفحهٔ ناخواسته تبدیل نشود.
- popup blocked، دادهٔ خالی، خطای fetch و بستن preview باید حالت مشخص داشته باشند.

## 13. Component QA Matrix

برای هر کامپوننت و هر صفحهٔ استفاده‌کننده، موارد زیر بررسی شود:

| حوزه | سناریو |
|---|---|
| Rendering | دادهٔ عادی، خالی، طولانی، null و غیرمنتظره |
| Input | تایپ، paste، autofill، IME فارسی، ارقام فارسی/لاتین |
| Keyboard | Tab، Shift+Tab، Enter، Space، Escape، arrow keys |
| Screen reader | name، role، value، description، live announcement |
| Themes | Light، Dark، forced colors |
| Direction | RTL، LTR، متن مختلط |
| Responsive | 360، 390، 768، 1024، 1440px |
| Motion | reduced motion و تنظیم داخلی کاهش حرکت |
| Network | slow، offline، 4xx، 5xx، timeout، retry |
| Print | preview، PDF، چند صفحه، فونت و جدول |
| Security | HTML injection، URL نامعتبر، دسترسی غیرمجاز |

## 14. قوانین جلوگیری از regression

- تغییر API کامپوننت باید جست‌وجوی همهٔ call siteها و typecheck را به‌دنبال داشته باشد.
- تغییر CSS سراسری باید صفحات اصلی، فرم، جدول، modal، print و school public pages را بررسی کند.
- selectorهای `:has`، sticky، overflow و z-index باید روی Chromium و WebKit تست شوند.
- کلاس‌های قدیمی فقط پس از مهاجرت تمام مصرف‌کننده‌ها حذف شوند.
- اصلاح باگ باید با تست بازتولیدکننده همراه باشد؛ «به نظر درست می‌آید» معیار پذیرش نیست.
