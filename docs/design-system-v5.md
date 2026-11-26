# سیستم طراحی بهار — V5
نسخه: 5.0 · وضعیت: مرجع فعال طراحی و پیاده‌سازی

**محصول:** بهار، سامانهٔ چندمدرسه‌ای مدیریت آموزش و عملیات مدرسه  
**دامنه:** پنل مدیران و کارکنان، پرتال دانش‌آموز و والدین، صفحات عمومی، ورود و احراز هویت، فرم‌ها، جداول، گزارش‌ها، نمودارها، خروجی و چاپ، موبایل و دسکتاپ  
**مرجع کد:** `src/app/bahar-v5.css`، `src/components/shared/bits.tsx`، کامپوننت‌های محلی `src/components/ui`  
**قانون تایپوگرافی:** فقط Arad؛ بدون فونت دوم، fallback تایپوگرافی یا فونت monospace.

> V5 جایگزین زبان بصری V4 و V3 است. APIها، مسیرها، مجوزها، منطق فرم‌ها و گردش‌کارهای دامنه حفظ می‌شوند؛ لایهٔ ارائه باید از قراردادهای این سند پیروی کند. تغییر ظاهر به‌تنهایی به معنی مهاجرت کامل صفحه محسوب نمی‌شود؛ معیار پوشش در `docs/ui-rebuild-v5.md` ثبت می‌شود.

---

## 1. تعریف هویت و جهت هنری

### 1.1 هویت بصری

بهار باید یک محصول سازمانی بالغ و ممتاز به نظر برسد: جدی، مرتب، آرام، دقیق و مدرن. «سکسی» بودن رابط در این محصول از کیفیت تناسبات، تایپوگرافی، کنتراست، جزئیات و تعامل می‌آید؛ نه از گرادیان‌های نمایشی، blur، کارت‌های رنگی متعدد یا تزئینات پر سر و صدا.

**جهت هنری:** Premium Editorial Enterprise.

- پایهٔ بصری: سطوح خنثی سبز-خاکستری، متن تیره و مرزهای تمیز.
- رنگ اصلی: سبز بهار برای هویت و اقدام.
- رنگ ناوبری: سبز جنگلی عمیق برای سایدبار.
- رنگ امضای ثانویه: صورتی شکوفه، محدود به تأکیدهای هویتی.
- ساختار: هدر ساده، سایدبار واضح، عنوان صفحهٔ قوی، ابزارهای گروه‌بندی‌شده و محتوای داده‌محور.
- هندسه: گوشه‌های ۶ تا ۱۲ پیکسل برای کنترل‌ها و کارت‌ها؛ ۱۶ پیکسل فقط برای پنل‌های بزرگ.
- سایه: کم‌عمق و فقط برای تفکیک لایه‌ها.
- حرکت: کوتاه، هدفمند و قابل خاموش‌کردن.
- تراکم: متوسط در داشبورد، متوسط رو به بالا در صفحات عملیاتی و جداول.

### 1.2 شخصیت

| محور | تعریف V5 | ممنوع |
|---|---|---|
| سازمانی | منظم، معتبر، قابل پیش‌بینی | ظاهر نرم‌افزار قدیمی اداری |
| پریمیوم | جزئیات دقیق و سلسله‌مراتب | افکت طلایی، glow، glass دائمی |
| مدرن | کنترل‌های یکدست و واکنش سریع | trend-driven componentهای بی‌کاربرد |
| دوستانه | متن روشن و رنگ آرام | کارتونی یا کودکانه |
| مینیمال | حذف تزئینات بی‌کارکرد | حذف اطلاعات لازم |
| کاربردی | عملیات سریع و واضح | dashboard تزئینی |

### 1.3 اصول غیرقابل مذاکره

1. صحت عملیات و داده از ظاهر مهم‌تر است.
2. هر صفحه باید عنوان، زمینه، اقدام اصلی و محتوای اصلی مشخص داشته باشد.
3. هر معنا در تمام محصول فقط یک قرارداد رنگی و تعاملی دارد.
4. هیچ route، permission، API، مدل داده، فیلد، عملیات یا سناریویی صرفاً برای ساده‌سازی UI حذف نمی‌شود.
5. هر فرم باید label، validation، خطای قابل فهم و حالت ارسال داشته باشد.
6. هر جدول باید حالت loading، empty، no-results، error و data داشته باشد.
7. هیچ اقدام مهمی فقط با hover قابل کشف نیست.
8. رنگ به‌تنهایی حامل وضعیت نیست؛ متن یا نشانهٔ مکمل لازم است.
9. صفحهٔ موبایل نسخهٔ فشردهٔ قابل استفاده است، نه نسخهٔ ناقص.
10. UI جدید باید در RTL و LTR، Light و Dark، صفحه‌کلید و touch قابل استفاده باشد.

---

## 2. توکن‌های رنگ

### 2.1 سبز بهار (Spring)

| Token | Hex | کاربرد |
|---|---|---|
| spring-50 | #EAF5F0 | سطح بسیار ملایم |
| spring-100 | #D5EADF | سطح انتخاب |
| spring-200 | #B2D9C8 | border انتخاب |
| spring-300 | #83C3A9 | نمودار و marker |
| spring-400 | #4DAA86 | accent متوسط |
| spring-500 | #00825E | امضای اصلی برند |
| spring-600 | #006B4E | اقدام اصلی Light |
| spring-700 | #00553F | hover/pressed |
| spring-800 | #064433 | متن عمیق |
| spring-900 | #0D352A | سطح عمیق |
| spring-950 | #08251D | بیشترین عمق |

رنگ پایهٔ هویت #00825E است. دکمهٔ اصلی در Light از #006B4E استفاده می‌کند تا متن سفید کنتراست مناسبی داشته باشد. در Dark رنگ اقدام #20C58C است.

### 2.2 صورتی شکوفه (Blossom)

| Token | Hex | کاربرد |
|---|---|---|
| blossom-50 | #FFF1F6 | سطح خیلی ملایم |
| blossom-100 | #FDE1EC | سطح ثانویه |
| blossom-200 | #FAC4D9 | مرز/نمودار |
| blossom-300 | #F49BBE | accent |
| blossom-400 | #EC729F | تأکید متوسط |
| blossom-500 | #E5548B | امضای برند |
| blossom-600 | #C83C72 | accent عمیق |
| blossom-700 | #A52C5B | متن/آیکون |
| blossom-800 | #7F234A | سطح عمیق |
| blossom-900 | #581A37 | بیشترین عمق |

Blossom رنگ وضعیت نیست. استفاده از آن برای success، warning، danger یا primary action ممنوع است. مصرف آن محدود به هویت، دسته‌بندی ثانویه و visualizationهای خاص است.

### 2.3 خنثی‌ها — Light

| Token | Hex | نقش |
|---|---|---|
| canvas | #F5F7F5 | پس‌زمینهٔ workspace |
| surface-1 | #FFFFFF | سطح اصلی |
| surface-2 | #F0F4F1 | toolbar و سطح فرعی |
| surface-3 | #E8EFEA | hover و سطح فرورفته |
| text-primary | #17231D | متن اصلی |
| text-secondary | #52665B | توضیحات |
| text-tertiary | #718278 | metadata |
| text-disabled | #9AA79F | غیرفعال |
| border-subtle | #E5ECE7 | جداکننده |
| border-default | #D5E0D8 | مرز عادی |
| border-strong | #B9C9BF | مرز تأکیدی |
| sidebar | #10231B | ناوبری |
| sidebar-hover | #1A3328 | hover |
| sidebar-active | #234535 | آیتم فعال |

### 2.4 خنثی‌ها — Dark

| Token | Hex | نقش |
|---|---|---|
| canvas | #0B1510 | workspace |
| surface-1 | #111F17 | سطح اصلی |
| surface-2 | #17271E | سطح فرعی |
| surface-3 | #203329 | hover/sunken |
| text-primary | #E8F0EA | متن اصلی |
| text-secondary | #B0C0B5 | توضیحات |
| text-tertiary | #8FA397 | metadata |
| text-disabled | #65776B | غیرفعال |
| border-subtle | #24372C | جداکننده |
| border-default | #304639 | مرز عادی |
| border-strong | #496253 | مرز تأکیدی |
| sidebar | #08110C | ناوبری |
| sidebar-hover | #14251B | hover |
| sidebar-active | #1D392A | آیتم فعال |

در Dark نام توکن‌ها ثابت است و مقدارشان متناسب با زمینه تغییر می‌کند. در کامپوننت‌ها hex مستقیم ممنوع است.

### 2.5 رنگ معنایی

| Role | Light text | Light tint | Dark text | Dark tint |
|---|---|---|---|---|
| success | #176B42 | #E8F5ED | #65D69A | #153425 |
| warning | #8A4C0B | #FFF4DF | #F5C36A | #3A2B16 |
| danger | #B42318 | #FDECEB | #FF8D86 | #421F1D |
| info | #175EA8 | #EAF3FC | #7DBBFA | #172E46 |
| neutral | #52665B | #EEF2EF | #B0C0B5 | #26352C |

هر وضعیت باید حداقل دو نشانه داشته باشد: رنگ + متن، یا رنگ + آیکون و متن. وضعیت‌های پرداخت، حضور، تأیید و مجوز باید واژگان مستقل دامنه‌ای داشته باشند ولی از همین semantic roles استفاده کنند.

### 2.6 نمودار

پالت سری‌ها به ترتیب: #006B4E، #3B82A0، #E5548B، #B7791F، #6B63A8، #64836D، #C45B4D، #82909A. بیش از ۸ سری نیازمند grouping یا الگوی بصری دوم است. نمودار باید عنوان، واحد، بازه، legend و tooltip داشته باشد. رنگ success/danger برای سری‌های عادی مصرف نشود.

### 2.7 کنتراست

- متن عادی: WCAG AA، حداقل 4.5:1.
- متن بزرگ: حداقل 3:1.
- مرز و نشانگر ضروری: حداقل 3:1 در برابر سطح مجاور.
- متن سفید روی Spring-600 در Light مجاز است.
- Blossom-500 با متن تیره مصرف شود.
- هر تغییر رنگ باید Light و Dark را با هم بررسی کند.

---

## 3. تایپوگرافی

### 3.1 قانون Arad-only

- تنها خانوادهٔ مجاز: `Arad`.
- منبع: فایل‌های self-hosted در `public/fonts`.
- وزن‌ها: 300، 400، 500، 600، 700، 800.
- متن فارسی، لاتین، اعداد، کد، نمودار، جدول، کنترل native، tooltip، toast، print و PDF همگی Arad هستند.
- Vazirmatn، Inter، Manrope، Geist، Roboto، Segoe UI، system-ui و monospace به‌عنوان خانوادهٔ دوم ممنوع‌اند.
- برای اعداد از `font-variant-numeric: tabular-nums` استفاده شود؛ برای کد و شناسه از Arad با جهت LTR موضعی استفاده شود.
- شکست فونت باید به‌عنوان مشکل asset حل شود؛ fallback به فونت دیگر راه‌حل طراحی نیست.

فایل‌های مورد انتظار: AradFD-Light، Regular، Medium، SemiBold، Bold و ExtraBold با فرمت WOFF2. مجوز SIL OFL 1.1 در `public/fonts/OFL.txt` نگهداری شود.

### 3.2 مقیاس

| Role | Size | Weight | Line height |
|---|---:|---:|---:|
| display | 36px | 700 | 1.25 |
| page title | 28px | 700/800 | 1.35 |
| section title | 20px | 700 | 1.45 |
| card title | 15–16px | 600/700 | 1.5 |
| body large | 16px | 400 | 1.8 |
| body | 14px | 400 | 1.8 |
| control | 13–14px | 500/600 | 1.5 |
| table | 13px | 400 | 1.65 |
| caption | 12px | 400 | 1.6 |
| overline | 11px | 600 | 1.5 |
| metric | 25–30px | 700/800 | 1.2 |

در موبایل page-title به 22–24px کاهش می‌یابد. متن فارسی letter-spacing تزئینی ندارد. متن طولانی عرض 65–75ch داشته باشد.

### 3.3 اعداد و جهت متن

- مبلغ، KPI، شناسه و جدول: tabular numerals.
- تاریخ، شماره تلفن، ایمیل، URL و کد: جهت LTR موضعی با isolate.
- انتخاب ارقام فارسی/لاتین از تنظیمات منطقه‌ای است؛ فونت تغییر نمی‌کند.
- در متن RTL از کلاس‌های logical و ویژگی‌های `dir`، `unicode-bidi` استفاده شود؛ ترتیب رشته با افزودن کاراکترهای جهت‌نما به‌صورت دستی دستکاری نشود.

---

## 4. هندسه و فاصله

### 4.1 فاصله‌ها

مبنای 4px: 4، 8، 12، 16، 20، 24، 32، 40، 48، 64 و 80px.

- label تا field: 6–8px.
- فاصلهٔ fieldها: 16px.
- گروه فرم: 24px.
- فاصلهٔ بخش‌های صفحه: 24–32px.
- padding کارت: 16–20px.
- padding workspace: دسکتاپ 28–36px، تبلت 20px، موبایل 12–16px.

### 4.2 ابعاد کنترل

| Size | Height | Use |
|---|---:|---|
| xs | 30px | کنترل فشردهٔ جدول |
| sm | 36px | toolbar فشرده |
| md | 42px | کنترل استاندارد |
| lg | 44px | touch-friendly |
| xl | 48px | اقدام شاخص |
| touch target | 44×44px | حداقل هدف لمس |

کنترل فشرده مجاز است، ولی hit-area آیکون و عملیات مهم نباید از 44×44 کمتر شود.

### 4.3 Radius

| Token | Value | Use |
|---|---:|---|
| xs | 4px | marker |
| sm | 6px | badge |
| md | 8px | input/button |
| lg | 10px | menu/popover |
| xl | 12px | card/panel |
| 2xl | 16px | dialog |
| full | 999px | avatar و pill واقعی |

کپسولی‌کردن همهٔ دکمه‌ها، کارت‌ها و ورودی‌ها ممنوع است.

### 4.4 Elevation

- Level 0: بدون shadow، فقط سطح و border.
- Level 1: کارت و پنل عادی.
- Level 2: dropdown و popover.
- Level 3: dialog و drawer.
- focus ring مستقل از shadow است.
- shadow جای border را نمی‌گیرد.

---

## 5. ساختار Layout

### 5.1 Application Shell

ترتیب دسکتاپ: Sidebar → Topbar → Page Header → Toolbar/Filters → Main Content → Contextual actions. در موبایل، topbar فشرده و navigation drawer جایگزین sidebar می‌شود.

- Sidebar expanded: 248px.
- Sidebar collapsed: 76px.
- Topbar: 60–64px.
- حداکثر عرض محتوای استاندارد: 1440px.
- صفحات جداول و گزارش‌ها می‌توانند تمام عرض workspace را بگیرند.
- یک صفحه نباید containerهای تودرتوی max-width متناقض داشته باشد.

### 5.2 Grid

- دسکتاپ: 12 ستون، gutter 20–24px.
- تبلت: 8 ستون، gutter 16px.
- موبایل: 4 ستون، gutter 12px.
- KPI: 4 ستون در نمایشگر عریض، 2 ستون در تبلت، 1 یا 2 ستون در موبایل.
- فرم ساده: حداکثر 2 ستون؛ فرم طولانی به گروه‌های معنایی تک‌ستونی تقسیم شود.

### 5.3 Breakpoints

| Token | Width |
|---|---:|
| xs | 360px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### 5.4 Responsive

- قابلیت‌ها در موبایل حذف نمی‌شوند.
- جدول: scroll افقی کنترل‌شده یا نمای کارت/ردیفی با حفظ همهٔ داده‌ها.
- toolbar بلند به گروه‌های قابل بازشدن تقسیم می‌شود.
- فرم‌ها در موبایل تک‌ستونی‌اند.
- dialog بلند به sheet/drawer تمام‌قد تبدیل می‌شود.
- action اصلی در محدودهٔ قابل دسترس باقی می‌ماند.
- fixed bottom action فقط وقتی محتوا را نپوشاند و safe-area را رعایت کند.

---

## 6. ناوبری

### Sidebar

- زمینهٔ جنگلی مستقل و ثابت.
- گروه‌ها با عنوان کم‌رنگ و فاصلهٔ مشخص.
- آیتم‌ها radius کوچک، آیکون Lucide، متن خوانا و hit-area مناسب.
- آیتم فعال با زمینهٔ سبز روشن‌تر و indicator خطی در inline-start.
- وضعیت active فقط با رنگ منتقل نمی‌شود؛ aria-current="page" الزامی است.
- collapsed mode باید tooltip/title قابل دسترس داشته باشد.
- منوها بر اساس role، permission، school context و country module موجود ساخته می‌شوند؛ CSS هیچ‌وقت مرجع مجوز نیست.

### Topbar

- سطح سفید/سبز بسیار تیره در Dark، بدون glass دائمی.
- جست‌وجوی سراسری، اعلان‌ها، چاپ، تنظیمات زمینه‌ای.
- هر action آیکونی accessible label دارد.
- ارتفاع و فاصلهٔ کنترل‌ها ثابت است.

### Mobile Navigation

- drawer با overlay قابل بستن، Escape و focus management.
- گروه‌بندی همان منبع NAV اصلی را مصرف می‌کند.
- بعد از انتخاب route drawer بسته می‌شود.
- badgeها و شمارنده‌ها از دادهٔ واقعی می‌آیند.

---

## 7. معماری کامپوننت

### 7.1 قرارداد عمومی

هر کامپوننت باید:
- API تایپ‌شده و پایدار داشته باشد.
- ظاهر را از tokenهای semantic بگیرد.
- stateهای default، hover، focus-visible، active، disabled، loading، invalid و selected را تعریف کند.
- RTL/LTR و Light/Dark را پشتیبانی کند.
- با keyboard و screen reader کار کند.
- native semantics را حفظ کند.
- بدون دلیل dependency جدید اضافه نکند.
- منطق مجوز، API و data fetching را در لایهٔ visual قرار ندهد.

### 7.2 قرارداد نام‌گذاری

- Primitive: `Button`, `Input`, `Dialog`.
- Domain: `StudentIdentity`, `AttendanceStatus`, `FeeInvoice`.
- Pattern: `ListManagementPage`, `EntityDetailLayout`.
- Token: `--v5-*` و aliasهای semantic؛ هیچ رنگ خام در صفحه.
- Data attributes: `data-slot` برای primitive و `data-bahar-*` برای hookهای سطح محصول.

### 7.3 ماتریس state

| Component family | Default | Hover | Focus | Disabled | Loading | Invalid |
|---|---|---|---|---|---|---|
| Action | ظاهر عادی | رنگ/سطح | ring | کم‌رنگ | spinner + متن | — |
| Input | border عادی | border تأکیدی | ring | سطح muted | — | border + message |
| Selection | unchecked | hover | ring | disabled | — | message در field |
| Data | row normal | row tint | outline | — | skeleton | error state |
| Overlay | closed | — | focus trap | — | async content | — |
| Feedback | visible | — | قابل خواندن | — | progress | error semantics |

---

## 8. فرم‌ها و ورودی‌ها

- label همیشه visible است؛ placeholder صرفاً مثال/راهنماست.
- label، description، field و error به هم متصل‌اند.
- خطا با `aria-invalid` و `aria-describedby` به field وصل می‌شود.
- required، optional، read-only و disabled تفاوت بصری و معنایی دارند.
- validation در blur یا submit طبق نیاز دامنه؛ پیام قبل از بررسی بی‌دلیل نمایش داده نشود.
- در submit، دکمه loading و غیرقابل ارسال مجدد می‌شود.
- مقدار کاربر در خطای شبکه از بین نمی‌رود.
- تاریخ با Jalali/Gregorian و locale تنظیم‌شده سازگار است.
- شماره، کد ملی، مبلغ و درصد input mode مناسب دارند.
- انتخاب‌های طولانی با searchable select/command ارائه می‌شوند.
- فایل upload باید نوع، حجم، progress، خطا و امکان حذف را نمایش دهد.
- فرم چندمرحله‌ای باید step، پیشرفت، بازگشت و تأیید نهایی داشته باشد.

---

## 9. جداول و داده

- جدول ابزار عملیاتی است؛ نباید به کارت‌های جداگانه تبدیل شود.
- عنوان ستون، واحد، alignment، sorting و فیلتر باید مشخص باشد.
- ستون عددی tabular و معمولاً aligned end است.
- sticky header فقط در scroll container صحیح.
- row selection باید checkbox، selected state و bulk toolbar داشته باشد.
- actionها در inline-end و با label قابل دسترس‌اند.
- pagination باید state واقعی داشته باشد.
- empty، no-results، loading، error و permission-denied متفاوت‌اند.
- در موبایل scroll یا نمای جایگزین با حفظ فیلدها لازم است.
- دادهٔ حجیم نیازمند virtualization یا pagination است.
- sort/filter/export باید با دادهٔ واقعی و server query هماهنگ باشد.

---

## 10. Dashboard و KPI

- اولویت: context مدرسه/سال تحصیلی، KPI، بینش اصلی، اقدام‌های فوری، روند، فعالیت اخیر.
- KPI فقط عدد نیست: label، مقدار، واحد، بازه و در صورت وجود delta.
- رنگ KPI تزئینی نیست؛ tone معنا دارد.
- sparklines فقط وقتی trend واقعی وجود دارد.
- نمودارها خلاصهٔ متنی و tooltip دارند.
- «مرکز اقدامات» باید urgency، due date و اقدام بعدی را مشخص کند.
- هیچ عدد نمونه‌ای به‌جای دادهٔ API نمایش داده نشود.

---

## 11. وضعیت‌ها و Feedback

- success فقط پس از پاسخ موفق واقعی.
- خطا باید علت قابل فهم و راه‌حل یا retry امن داشته باشد.
- toast برای نتیجهٔ کوتاه؛ alert برای خطای ماندگار؛ inline validation برای field.
- destructive action نیازمند تأیید روشن با نام دقیق اثر است.
- undo فقط در صورت پشتیبانی واقعی عملیات.
- loading نباید spinner بی‌نهایت بدون context باشد.
- skeleton ساختار محتوای مورد انتظار را بازتاب دهد.

---

## 12. Dialog, Sheet, Popover, Menu

- Dialog برای تصمیم یا فرم مستقل.
- AlertDialog برای destructive/irreversible.
- Sheet برای تنظیمات جانبی و موبایل.
- Popover برای محتوای کوچک contextual.
- Tooltip برای توضیح کوتاه؛ نه جایگزین label.
- focus trap، Escape، restore focus و aria-labelledby الزامی.
- منو با arrow key و Home/End طبق الگوی ARIA.
- overlay از content جداست و کلیک بیرون فقط در صورت مجاز بودن رفتار می‌کند.

---

## 13. Iconography و Asset

- فقط Lucide React برای آیکون رابط.
- آیکون outline با stroke یکنواخت؛ fill فقط برای stateهای معنادار.
- آیکون 16px در کنترل، 18–20px در navigation، 24px در empty state.
- emoji به‌عنوان icon عملیاتی ممنوع.
- آیکون تنها باید aria-label/title داشته باشد.
- لوگو و نشان برند از assetهای رسمی پروژه می‌آیند؛ لوگو را با متن یا شکل جایگزین نکن.

---

## 14. Motion

- transition عمومی 120–180ms.
- dialog/drawer 160–220ms.
- page entrance در صورت نیاز حداکثر 220ms.
- فقط opacity/transform برای حرکت عادی.
- هیچ animation بی‌نهایت تزئینی در پنل عملیاتی.
- reduced-motion باید transition و animation غیرضروری را حذف کند.
- حرکت نباید focus، scroll position یا نتیجهٔ عملیات را مخفی کند.

---

## 15. Accessibility

هدف: WCAG 2.2 AA.

- semantic HTML و landmarkها.
- skip link به main.
- keyboard-only flow کامل.
- focus-visible با کنتراست و offset.
- label و description برای فرم.
- name/role/value برای کنترل‌های سفارشی.
- aria-live برای status، نتیجه و errorهای مهم.
- حداقل touch target 44×44px برای actionهای اصلی.
- zoom 200% بدون از دست رفتن محتوا/عملیات.
- رنگ تنها حامل معنا نیست.
- جدول دارای caption/header scope.
- dialog focus management.
- reduced motion.
- آزمون screen reader در مسیرهای کلیدی.

---

## 16. RTL، Localization و Calendar

- جهت پایه از CountryProfile/locale واقعی می‌آید.
- layout با CSS logical properties نوشته می‌شود.
- آیکون‌های جهت‌دار در صورت نیاز flip می‌شوند؛ آیکون‌های غیرجهت‌دار flip نمی‌شوند.
- تاریخ از formatter مرکزی و timezone مدرسه استفاده می‌کند.
- اعداد، ارز، درصد و واحد از formatter مرکزی استفاده می‌کنند.
- متن ترجمه‌شده نباید باعث overflow کنترل شود.
- متن لاتین، ایمیل، URL، کد و شناسه isolate می‌شوند.
- ترجمهٔ ثابت داخل shared component فقط در صورت نبودن key مجاز است؛ ترجیح با i18n.

---

## 17. نمودار، نقشه و Visualization

- نمودار باید هدف تحلیلی مشخص داشته باشد.
- مقیاس، واحد، محور و range صریح‌اند.
- رنگ‌ها از palette مرکزی می‌آیند.
- tooltip و legend باید با keyboard/touch قابل دسترس باشند.
- دادهٔ گمشده، صفر و null با هم یکی نیستند.
- نقشه باید legend، مقیاس و توضیح marker داشته باشد.
- نمودار تزئینی بدون insight در داشبورد ممنوع.

---

## 18. Print و Export

- چاپ، سند مستقل از shell است.
- navigation، toolbar و actionهای تعاملی حذف می‌شوند.
- header شامل نام مدرسه، عنوان، تاریخ و context گزارش است.
- فونت Arad و جهت متن حفظ می‌شود.
- table header در صفحه‌های بعد تکرار می‌شود.
- rowهای مهم تا حد امکان شکسته نمی‌شوند.
- رنگ چاپی با grayscale هم خوانا می‌ماند.
- CSV/XLSX/PDF باید فارسی، ارقام، null، چندخطی و چندصفحه‌ای را تست کند.

---

## 19. امنیت و مرزهای معماری

- UI permission را نمایش می‌دهد، ولی enforcement همیشه server/API است.
- مخفی‌کردن دکمه جایگزین authorization نیست.
- دادهٔ حساس نباید در DOM، log یا toast غیرضروری نمایش داده شود.
- HTML/Markdown ورودی sanitize می‌شود.
- URL و فایل validate می‌شوند.
- UI نمی‌تواند عملیات غیرمجاز را با route مستقیم ممکن کند.
- visual refactor حق تغییر API، role، permission، DB schema یا validation دامنه را ندارد.

---

## 20. Implementation Map

| لایه | Source of truth | مسئولیت |
|---|---|---|
| Tokens + global skin | `src/app/bahar-v5.css` | palette، surface، shell، primitive skin |
| Global reset/utility | `src/app/globals.css` | Tailwind، base، font faces و utility compatibility |
| Shared page primitives | `src/components/shared/bits.tsx` | PageHeader، KPI، Loading، Empty، Error، badges |
| Primitive components | `src/components/ui/*` | API و رفتار accessible |
| App shell | `src/components/app-shell/app-shell.tsx` | navigation، search، notifications، auth context |
| Domain pages | `src/app/app/**/page.tsx` | workflow، data fetching و domain composition |
| Domain patterns | `src/components/bahar/**` | reusable school components |

### قواعد اجرا

1. فایل `bahar-v5.css` تنها لایهٔ visual جدید است؛ selectorهای موقت و patchهای تکراری اضافه نشوند.
2. tokenها در همان فایل و با prefix `--v5-` تعریف می‌شوند؛ aliasهای legacy صرفاً برای سازگاری با صفحات موجودند.
3. primitiveهای Radix حفظ می‌شوند؛ رفتار را با div سفارشی بازنویسی نکن.
4. هر صفحه در نوبت مهاجرت، API و رفتار فعلی را ثبت و سپس composition را به الگوهای V5 منتقل می‌کند.
5. تمام routeها باید در route inventory پوشش داشته باشند.
6. تغییر هر shared primitive باید تمام call siteهای آن را تست کند.
7. docs و tests باید همراه implementation به‌روزرسانی شوند.

---

## 21. Definition of Done

یک کامپوننت یا صفحه فقط وقتی V5-complete است که:
- با tokenهای V5 ساخته شده باشد.
- ظاهر Light/Dark و RTL/LTR تأیید شده باشد.
- موبایل و دسکتاپ تست شده باشد.
- keyboard/focus و reduced motion بررسی شده باشد.
- loading/empty/error/success/disabled/permission states پوشش داده شده باشند.
- هیچ رنگ یا فونت غیرمجاز hardcode نشده باشد.
- lint، typecheck و build موفق باشند.
- console، hydration و network errors بررسی شده باشند.
- رفتار API، permission، data و workflow بدون regression باقی مانده باشد.
- screenshot review برای صفحهٔ واقعی انجام شده باشد.
- وضعیت مهاجرت در `docs/ui-rebuild-v5.md` به‌روزرسانی شده باشد.

---

## 22. منابع مرجع

منابع برای الگوی رفتار و accessibility هستند؛ ظاهر آن‌ها نباید بدون سفارشی‌سازی به محصول وارد شود:

- Radix Primitives — https://www.radix-ui.com/primitives/docs/components
- Base UI — https://base-ui.com/
- React Aria — https://react-spectrum.adobe.com/react-aria/
- Headless UI — https://headlessui.com/
- Ark UI — https://ark-ui.com/
- shadcn/ui — https://ui.shadcn.com/
- Material UI — https://mui.com/material-ui/all-components/
- Ant Design — https://ant.design/components/overview/
- Mantine — https://mantine.dev/
- Chakra UI — https://chakra-ui.com/docs/components/concepts/overview
- HeroUI — https://heroui.com/en/docs/react/components
- Flowbite React — https://flowbite-react.com/
- PrimeReact — https://primereact.org/
- Fluent UI — https://react.fluentui.dev/
- Carbon — https://carbondesignsystem.com/
- Primer — https://primer.style/
- Blueprint — https://blueprintjs.com/
- Aceternity UI — https://ui.aceternity.com/explore
- Magic UI — https://magicui.design/docs/components
- Origin UI — https://originui.com/
- Kibo UI — https://www.kibo-ui.com/
- Park UI — https://park-ui.com/
- ReUI — https://reui.io/
- 21st.dev — https://21st.dev/
- React Bits — https://reactbits.dev/
- Motion Primitives — https://motion-primitives.com/
- Preline — https://preline.co/
- HyperUI — https://www.hyperui.dev/
- Float UI — https://floatui.com/
- Tailwind Plus — https://tailwindcss.com/plus

انتخاب فنی بهار: Radix برای behavior، Tailwind و source محلی برای styling، Lucide برای icon، Recharts برای chart و Framer Motion فقط برای حرکت‌های لازم. پیش از هر اقتباس کد، license و dependency بررسی می‌شود.
