# سیستم طراحی بهار — نسخهٔ 4.0

**وضعیت:** مشخصات مرجع پیشنهادی برای پیاده‌سازی  
**محصول:** بهار — سامانهٔ جامع مدیریت مدرسه  
**دامنه:** پنل سازمانی، مدیریت چندمدرسه‌ای، پرتال دانش‌آموز و والدین، صفحات عمومی، فرم‌ها، داده‌ها، گزارش‌ها، چاپ و موبایل  
**اصل قطعی تایپوگرافی:** تنها خانوادهٔ فونت مجاز در محصول Arad است.

> این سند مرجع نسخهٔ 4.0 است. در صورت تعارض با اسناد V3.1، این سند اولویت دارد. مشخصات حاضر زبان بصری و قرارداد محصول را تعریف می‌کند؛ اجرای کامل همهٔ موارد نیازمند مهاجرت تدریجی کامپوننت‌ها و صفحات است.

## 0. خلاصهٔ هویت طراحی

بهار یک ابزار عملیاتی روزمره برای مدرسه است؛ باید حس اعتماد، نظم، دقت، آرامش و کیفیت محصولی ممتاز را منتقل کند. طراحی نه باید شبیه نرم‌افزارهای اداری قدیمی باشد و نه به داشبوردهای پرزرق‌وبرق و کارت‌محور تبدیل شود.

### امضای بصری بهار

- **سبز بهار:** رنگ اصلی هویت، اعتماد، اقدام و پیشرفت.
- **صورتی شکوفه:** رنگ امضای ثانویه؛ برای نقاط محدود هویتی، نه وضعیت‌های عملیاتی.
- **خنثی‌های سبز-خاکستری:** برای پس‌زمینه‌ها، مرزها و متن.
- **Arad:** تنها خانوادهٔ تایپوگرافی، در تمام زبان‌ها و تمام سطوح.
- **هندسهٔ کنترل‌شده:** گوشه‌های نرم اما نه بیش‌ازحد گرد؛ سطوح واضح و سایه‌های کم.
- **تراکم متعادل:** اطلاعات کافی برای کار حرفه‌ای، بدون شلوغی و بدون فضای خالی تزئینی.

### شخصیت محصول

| بُعد | تصمیم بهار |
|---|---|
| رسمی‌بودن | سازمانی و قابل اعتماد، نه خشک و قدیمی |
| لوکس‌بودن | کیفیت از جزئیات، تناسب و نظم؛ نه افکت و گرادیان |
| مدرن‌بودن | سلسله‌مراتب دقیق، تعامل سریع، سطوح ظریف |
| صمیمیت | رنگ و کپی انسانی، بدون کارتونی‌شدن |
| تراکم | متوسط رو به بالا در جداول و عملیات؛ متوسط در داشبورد |
| حرکت | کوتاه، هدفمند و کم‌حواس‌پرتی |
| تزئین | حداقلی؛ فقط وقتی معنا یا جهت‌یابی ایجاد کند |

## 1. اصول طراحی (Design Principles)

1. **عملیات مقدم بر تزئین:** کاربر باید دانش‌آموز، کلاس، پرداخت، نمره یا گزارش را سریع پیدا کند.
2. **اطلاعات مقدم بر کروم رابط:** فضای صفحه را نوارها و کارت‌های غیرضروری اشغال نکنند.
3. **یک معنا، یک الگو:** یک وضعیت یا کنش در تمام ماژول‌ها ظاهر و رفتار ثابت داشته باشد.
4. **شفافیت سلسله‌مراتب:** عنوان صفحه، ابزارها، دادهٔ اصلی و اقدامات ثانویه از هم قابل تشخیص باشند.
5. **رنگ معنادار:** رنگ برند برای هویت و اقدام؛ رنگ وضعیت فقط برای وضعیت واقعی.
6. **دقت سازمانی:** اعداد، تاریخ‌ها، مبالغ، وضعیت‌ها و مجوزها باید بدون ابهام دیده شوند.
7. **پیش‌بینی‌پذیری:** کنترل‌ها در تمام صفحات در محل و اندازهٔ قابل انتظار قرار بگیرند.
8. **دسترس‌پذیری پیش‌فرض:** صفحه‌کلید، صفحه‌خوان، کنتراست و reduced motion بخشی از تعریف کامپوننت‌اند.
9. **پاسخ‌گویی بدون حذف قابلیت:** در موبایل قابلیت‌ها حذف نمی‌شوند؛ چیدمان متناسب می‌شود.
10. **عدم تخریب دامنه:** بازطراحی بصری نباید route، مجوز، API، منطق مدرسه، داده یا گردش‌کار را تغییر دهد.

### بایدها و نبایدها

- هر صفحه یک اقدام اصلی مشخص داشته باشد.
- جدول، فیلتر و ابزارهای مرتبط در یک گروه بصری واحد قرار بگیرند.
- متن خطا، راه‌حل یا اقدام بعدی را توضیح دهد.
- حالت خالی، loading، خطا، موفقیت و دسترسی‌نداشتن از ابتدا طراحی شوند.
- عملیات خطرناک تأیید صریح و متن روشن داشته باشند.
- از رنگ صورتی برای success، warning یا destructive استفاده نشود.
- گرادیان تزئینی در فرم‌ها و جدول‌های عملیاتی ممنوع باشد.
- هر بخش کوچک به کارت مستقل تبدیل نشود.
- blur، glass، glow، parallax و 3D در صفحات پرتراکم استفاده نشود.
- placeholder جایگزین label نباشد.
- برای یک صفحه بدون دلیل دامنه‌ای کامپوننت موازی ساخته نشود.

## 2. سیستم رنگ (Color System)

### 2.1 رنگ‌های هویتی

دو رنگ موجود برند حفظ می‌شوند؛ مقیاس‌های پیرامونی برای استفادهٔ کنترل‌شده ساخته شده‌اند.

#### Spring — سبز بهار

| Token | Hex | کاربرد |
|---|---|---|
| spring-50 | #EAF5F0 | پس‌زمینهٔ انتخاب بسیار ملایم |
| spring-100 | #D5EADF | سطح انتخاب |
| spring-200 | #B2D9C8 | مرز انتخاب و نمودار کم‌رنگ |
| spring-300 | #83C3A9 | نمودار و نشانگر |
| spring-400 | #4DAA86 | تأکید بصری |
| spring-500 | #00825E | رنگ اصلی هویت بهار |
| spring-600 | #006B4E | دکمهٔ اصلی و لینک روی سطح روشن |
| spring-700 | #00553F | hover و pressed |
| spring-800 | #064433 | متن سبز تیره و عناصر قوی |
| spring-900 | #0D352A | سطوح بسیار تیره |
| spring-950 | #08251D | عمق و ناوبری |

spring-500 رنگ امضای برند است؛ spring-600 رنگ پیش‌فرض اقدام اصلی روی زمینهٔ روشن است تا کنتراست متن سفید حفظ شود.

#### Blossom — صورتی شکوفه

| Token | Hex | کاربرد |
|---|---|---|
| blossom-50 | #FFF1F6 | پس‌زمینهٔ بسیار ملایم |
| blossom-100 | #FDE1EC | سطح انتخاب ثانویه |
| blossom-200 | #FAC4D9 | مرز و نمودار |
| blossom-300 | #F49BBE | تأکید نرم |
| blossom-400 | #EC729F | accent |
| blossom-500 | #E5548B | رنگ هویتی موجود |
| blossom-600 | #C83C72 | تأکید تیره |
| blossom-700 | #A52C5B | متن/آیکون روی سطح روشن |
| blossom-800 | #7F234A | سطح عمیق |
| blossom-900 | #581A37 | کنتراست بالا و جزئیات تاریک |

صورتی برای امضای برند، دسته‌بندی‌های ثانویه و نمودارهای خاص است؛ نه برای موفقیت، هشدار، خطا یا اقدام اصلی.

### 2.2 خنثی‌های اختصاصی بهار

#### Light theme

| Token | Hex | نقش |
|---|---|---|
| canvas | #F5F7F5 | پس‌زمینهٔ کل workspace |
| surface-1 | #FFFFFF | سطح اصلی محتوا |
| surface-2 | #F0F4F1 | نوار ابزار و بخش فرعی |
| surface-3 | #E8EFEA | hover، انتخاب و سطح فرورفته |
| surface-inverse | #10231B | سطوح معکوس |
| text-primary | #17231D | متن اصلی |
| text-secondary | #52665B | توضیحات و metadata |
| text-tertiary | #718278 | متن کم‌اهمیت |
| text-disabled | #9AA79F | متن غیرفعال |
| border-subtle | #E5ECE7 | جداکنندهٔ کم‌رنگ |
| border-default | #D5E0D8 | مرز استاندارد |
| border-strong | #B9C9BF | مرز پررنگ |
| sidebar | #10231B | ناوبری اصلی |
| sidebar-hover | #1A3328 | hover لینک |
| sidebar-active | #234535 | آیتم فعال |
| overlay | #07120D با opacity 52% | پشت دیالوگ |

#### Dark theme

| Token | Hex | نقش |
|---|---|---|
| canvas | #0B1510 | پس‌زمینهٔ workspace |
| surface-1 | #111F17 | سطح اصلی |
| surface-2 | #17271E | ابزار و سطح فرعی |
| surface-3 | #203329 | hover و انتخاب |
| surface-inverse | #F0F5F1 | سطح معکوس |
| text-primary | #E8F0EA | متن اصلی |
| text-secondary | #B0C0B5 | توضیحات |
| text-tertiary | #8FA397 | metadata |
| text-disabled | #65776B | متن غیرفعال |
| border-subtle | #24372C | مرز کم‌رنگ |
| border-default | #304639 | مرز استاندارد |
| border-strong | #496253 | مرز پررنگ |
| sidebar | #08110C | ناوبری |
| sidebar-hover | #14251B | hover |
| sidebar-active | #1D392A | آیتم فعال |
| overlay | #000000 با opacity 64% | پشت دیالوگ |

### 2.3 رنگ‌های معنایی (Semantic)

| Role | Light foreground | Light tint | Dark foreground | Dark tint |
|---|---|---|---|---|
| success | #176B42 | #E8F5ED | #65D69A | #153425 |
| warning | #8A4C0B | #FFF4DF | #F5C36A | #3A2B16 |
| danger | #B42318 | #FDECEB | #FF8D86 | #421F1D |
| info | #175EA8 | #EAF3FC | #7DBBFA | #172E46 |
| neutral | #52665B | #EEF2EF | #B0C0B5 | #26352C |

- رنگ وضعیت باید با متن، آیکون یا شکل مکمل شود؛ رنگ به‌تنهایی کافی نیست.
- success برای «عملیات انجام شد»، warning برای «نیازمند توجه»، danger برای «عملیات ناموفق/خطرناک» و info برای «اطلاعات» است.
- صورتی برند هرگز جایگزین رنگ معنایی نمی‌شود.

### 2.4 رنگ نمودارها

پالت پیش‌فرض داده‌ای: #006B4E، #3B82A0، #E5548B، #B7791F، #6B63A8، #64836D، #C45B4D، #82909A.

- ترتیب رنگ‌ها ثابت و از توکن مرکزی است.
- نمودار بیش از ۸ سری باید از الگو، خط، marker یا گروه‌بندی استفاده کند.
- وضعیت‌های success/danger برای رنگ‌بندی سری‌های عادی مصرف نشوند.
- Legend، tooltip، واحد، بازه و خلاصهٔ متنی الزامی‌اند.

### 2.5 قواعد کنتراست و مصرف

- متن عادی: حداقل نسبت کنتراست WCAG AA برابر 4.5:1.
- متن بزرگ: حداقل 3:1.
- مرز کنترل و نشانگر ضروری: حداقل 3:1 در برابر سطح مجاور.
- متن سفید روی spring-600 مجاز است؛ متن سفید روی spring-500 فقط پس از تست کنتراست واقعی مجاز است.
- روی blossom-500 متن تیره استفاده شود، نه سفید.
- hex مستقیم داخل کامپوننت ممنوع؛ فقط semantic token.
- گرادیان فقط در بخش معرفی/بازاریابی و با تأیید زبان بصری؛ نه در پنل روزمره.

## 3. تایپوگرافی (Typography)

### 3.1 قانون قطعی فونت

**تمام متن محصول، بدون استثنا، با خانوادهٔ Arad رندر می‌شود.**

- منبع فونت: فایل‌های self-hosted موجود در public/fonts.
- خانوادهٔ CSS: Arad.
- نسخهٔ استاندارد رابط: فایل‌های AradFD.
- وزن‌های مجاز: 300، 400، 500، 600، 700، 800.
- فونت جداگانه برای لاتین، عدد، کد، عنوان، جدول یا نمودار ممنوع.
- Vazirmatn، Manrope، Inter، Geist، Roboto، Segoe UI و system-ui نباید در stack تایپوگرافی تعریف شوند.
- فونت monospace جایگزین هم استفاده نمی‌شود؛ کد و شناسه با Arad و tabular numerals نمایش داده می‌شوند.
- تمام کنترل‌های native، ورودی‌ها، دکمه‌ها، tooltipها، toastها و محتوای چاپ باید Arad را به ارث ببرند.
- اگر فونت بارگذاری نشد، خطای asset باید رفع شود؛ جایگزین‌کردن خاموش با خانوادهٔ دیگری رفتار طراحی‌شده نیست.

منبع فایل‌ها: AradFD-Regular.woff2، AradFD-Medium.woff2، AradFD-SemiBold.woff2، AradFD-Bold.woff2 و وزن‌های Light/ExtraBold موجود. مرجع بالادستی فونت [مخزن رسمی Arad](https://github.com/MohamadDarvishi/Arad) است؛ مجوز SIL Open Font License 1.1 در public/fonts/OFL.txt نگهداری می‌شود. فونت‌های اصلی بدون تغییر توزیع می‌شوند و نام Reserved Font Name آن‌ها حفظ می‌شود.

### 3.2 مقیاس تایپوگرافی

| Token | اندازه | وزن | Line-height | کاربرد |
|---|---:|---:|---:|---|
| display | 36px | 700 | 1.25 | عنوان‌های معرفی محدود |
| page-title | 28px | 700 | 1.35 | عنوان صفحه |
| section-title | 20px | 700 | 1.45 | عنوان بخش |
| card-title | 16px | 600 | 1.5 | عنوان کارت |
| body-lg | 16px | 400 | 1.8 | متن توضیحی مهم |
| body | 14px | 400 | 1.8 | متن پایه |
| body-medium | 14px | 500 | 1.7 | متن تأکیدی |
| control | 14px | 500 | 1.5 | دکمه و فرم |
| table | 13px | 400 | 1.65 | دادهٔ جدولی |
| caption | 12px | 400 | 1.6 | metadata |
| overline | 11px | 600 | 1.5 | label کوچک محدود |
| metric | 30px | 700 | 1.2 | KPI و ارقام برجسته |

مقیاس responsive است؛ عنوان صفحه در موبایل می‌تواند به 23–24px برسد. متن فارسی letter-spacing تزئینی نمی‌گیرد.

### 3.3 اعداد و متن مختلط

- font-variant-numeric: tabular-nums برای مبلغ، KPI، شناسه، تاریخ و جدول.
- جهت اعداد، کد، ایمیل، URL و شماره تلفن به‌صورت موضعی LTR.
- انتخاب نمایش ارقام فارسی/لاتین از تنظیمات منطقه‌ای محصول؛ font-family تغییر نمی‌کند.
- کدها و شناسه‌ها از شکست نامناسب جلوگیری می‌کنند؛ در صورت نیاز با dir=ltr و unicode-bidi=isolate.
- متن انگلیسی با glyph لاتین خود Arad نمایش داده می‌شود.

## 4. هندسه، فاصله و اندازه (Geometry & Spacing)

### 4.1 مقیاس فاصله

مبنای 4px:

| Token | مقدار |
|---|---:|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 20px |
| space-6 | 24px |
| space-8 | 32px |
| space-10 | 40px |
| space-12 | 48px |
| space-16 | 64px |
| space-20 | 80px |

- داخل کنترل کوچک: 8–12px.
- فاصلهٔ بین label و field: 6–8px.
- فاصلهٔ بین fieldها: 16px.
- فاصلهٔ گروه‌های فرم: 24px.
- فاصلهٔ بخش‌های صفحه: 24–32px.
- فاصلهٔ عنوان صفحه تا toolbar: 16–20px.

### 4.2 ابعاد کنترل

| Token | مقدار |
|---|---:|
| control-xs | 30px |
| control-sm | 36px |
| control-md | 40px |
| control-lg | 44px |
| control-xl | 48px |
| touch-target | حداقل 44×44px |

کنترل‌های فشرده فقط در جدول‌های متراکم و محیط دسکتاپ مجازند؛ hit area باید مناسب باقی بماند.

### 4.3 Radius

| Token | مقدار | مصرف |
|---|---:|---|
| radius-xs | 4px | marker و جزئیات کوچک |
| radius-sm | 6px | badge و tag |
| radius-md | 8px | button و input |
| radius-lg | 10px | dropdown و popover |
| radius-xl | 12px | card و panel |
| radius-2xl | 16px | dialog و بخش‌های بزرگ |
| radius-full | 999px | avatar و pillهای واقعی |

گوشه‌های بزرگ و pill برای تمام اجزا ممنوع‌اند. هندسه باید جدی، نرم و منظم باشد.

### 4.4 Border و Elevation

- Border اصلی: 1px با semantic border.
- Divider: 1px با token مرز ظریف.
- Shadow 1: سطح کمی شناور، بسیار نرم.
- Shadow 2: dropdown/popover.
- Shadow 3: dialog/drawer.
- سایه جایگزین border نیست.
- از چندین سایهٔ رنگی و glow دائمی استفاده نمی‌شود.

## 5. Layout & Grid

### 5.1 ساختار اصلی پنل

Application Shell → Sidebar → Topbar → Page Header → Toolbar/Filters → Main Content → Contextual Panel

- Sidebar دسکتاپ: 248px باز، 76px فشرده.
- Topbar: 64px.
- فضای محتوای صفحه: 24px دسکتاپ؛ 16px تبلت؛ 12px موبایل.
- حداکثر عرض محتوای عادی: 1440px؛ صفحات داده‌محور می‌توانند تمام عرض workspace را مصرف کنند.
- عرض متن توضیحی بلند: 65–75ch.
- یک صفحه نباید چند container با max-width متناقض داشته باشد.

### 5.2 Grid

- 12 ستون دسکتاپ.
- 8 ستون تبلت.
- 4 ستون موبایل.
- gutter دسکتاپ 20–24px، تبلت 16px، موبایل 12px.
- KPIها در دسکتاپ 4 یا 3 ستون، تبلت 2 ستون، موبایل 1 یا 2 ستون.
- فرم‌های ساده حداکثر 2 ستون؛ فرم‌های طولانی تک‌ستونی یا گروه‌بندی‌شده.

### 5.3 Breakpoints

| نام | عرض |
|---|---:|
| xs | 360px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### 5.4 Responsive behavior

- Sidebar در موبایل به Drawer تبدیل می‌شود.
- toolbar طولانی به ردیف دوم یا پنل فیلتر تبدیل می‌شود.
- جدول: اولویت با ستون‌های حیاتی، سپس scroll افقی کنترل‌شده یا نمای ردیفی؛ ستون مهم بی‌صدا حذف نمی‌شود.
- dialogهای بلند در موبایل به Sheet/Drawer تمام‌قد یا نزدیک به تمام‌قد تبدیل می‌شوند.
- actionهای حیاتی در دسترس و با hit area مناسب باقی می‌مانند.
- نمودارها legend و tooltip قابل استفاده در touch دارند.

## 6. Navigation Architecture

### Sidebar

- سطح تیرهٔ مستقل با رنگ sidebar.
- لوگو و نام محصول در ناحیهٔ ثابت.
- گروه‌بندی بر اساس وظیفهٔ کاربر، نه ساختار فنی کد.
- آیتم فعال با سطح سبز روشن‌تر، نشانگر مکانی و متن خوانا.
- تعداد badgeها محدود به اعلان یا شمارندهٔ معنادار.
- آیکون‌ها یک خانواده و اندازهٔ ثابت دارند.
- hover به‌تنهایی نشانهٔ فعال‌بودن نیست.

### Topbar

- عنوان/مسیر صفحه، جست‌وجوی سراسری، اعلان‌ها، کمک و پروفایل.
- selector مدرسه/شعبه/سال تحصیلی در جایگاه پایدار.
- کنترل‌های پرتکرار در اولویت؛ ابزارهای کم‌مصرف در menu.
- topbar نباید با چند ردیف تزئینی ارتفاع زیادی بگیرد.

### Breadcrumbs, Tabs, Pagination

- Breadcrumb فقط برای سلسله‌مراتب واقعی.
- Tabs برای بخش‌های هم‌سطح و محدود؛ برای navigation اصلی استفاده نشود.
- Pagination تعداد کل، صفحهٔ فعلی و اندازهٔ صفحه را روشن می‌کند.
- وضعیت فیلتر و صفحه در URL یا state پایدار نگهداری شود، هرجا معماری فعلی اجازه می‌دهد.

## 7. Component Architecture

تمام کامپوننت‌ها در سه لایه قرار می‌گیرند:

1. **Primitive:** رفتار پایه و accessibility؛ مانند Dialog، Popover، Select و Tabs.
2. **Bahar UI:** پوستهٔ بصری و API واحد؛ مانند BaharButton، BaharField و BaharDialog.
3. **Domain Component:** مفهوم مدرسه‌ای؛ مانند AttendanceRegister و StudentIdentity.

### قوانین API

- TypeScript strict؛ props عمومی any ممنوع.
- className قابل توسعه است، اما نباید accessibility، اندازهٔ لمس یا state semantics را بشکند.
- action از button و navigation از a/Link استفاده می‌کند.
- icon-only control نام دسترس‌پذیر دارد.
- loading از submit دوباره جلوگیری می‌کند.
- هر دکمهٔ داخل فرم type صریح دارد.
- native form semantics حفظ می‌شود.
- controlled component باید state و callback سازگار داشته باشد.
- stateهای بصری از data attributes یا variant API پایدار می‌آیند، نه selectorهای شکنندهٔ DOM.
- رنگ و فاصله از token می‌آید؛ hex و arbitrary values در کامپوننت ممنوع مگر exception مستند.

### State Matrix مشترک

هر کامپوننت مرتبط باید stateهای مربوطه را تعریف کند:

default · hover · focus-visible · pressed · selected · disabled · loading · invalid · read-only · expanded · empty · success · error

همهٔ stateها برای همهٔ کامپوننت‌ها لازم نیستند؛ فقط stateهای معنایی مرتبط باید پیاده‌سازی شوند.

## 8. Interaction & Motion

| Token | Duration | کاربرد |
|---|---:|---|
| motion-instant | 80ms | press feedback |
| motion-fast | 120ms | hover و color |
| motion-normal | 180ms | tooltip و popover |
| motion-panel | 220ms | drawer و dialog |
| motion-page | 260ms | جابه‌جایی محدود محتوا |
| motion-emphasis | 320ms | تأکید کنترل‌شده |

Easing اصلی: cubic-bezier(0.2, 0, 0, 1).  
Easing خروج: cubic-bezier(0.4, 0, 1, 1).

مجاز: opacity و translate کوتاه برای ورود panel، تغییر رنگ و border برای hover/focus، حرکت محدود 1–2px برای سطوح تعاملی، progress animation برای عملیات واقعی، skeleton بدون shimmer شدید.

ممنوع: transition: all، حرکت دائمی عناصر عملیاتی، stagger روی فهرست‌های بلند، parallax/3D/glow در فرم و جدول، انیمیشن ضروری بدون prefers-reduced-motion و انیمیشن عددی برای مبالغ/نمرات حساس بدون دسترسی فوری به مقدار نهایی.

## 9. Iconography & Assets

- کتابخانهٔ فعلی: Lucide React.
- آیکون outline با stroke یکپارچه.
- اندازه‌های پایه: 16، 18، 20 و 24px.
- ضخامت stroke حدود 1.75–2px.
- آیکون کنار label از نظر alignment و baseline تنظیم شود.
- emoji جایگزین آیکون محصول نیست.
- آیکون بدون label در کنترل تعاملی نیازمند accessible name است.
- آیکون‌های برند و وضعیت نباید در یک سطح بصری رقابت کنند.
- تصویر پروفایل با Avatar و fallback اولیه/نشان عمومی نمایش داده می‌شود.

## 10. Data Visualization

- هر نمودار عنوان، توضیح، بازه، واحد و زمان به‌روزرسانی دارد.
- نمودارهای اصلی مدرسه: روند حضور، توزیع نمره، وضعیت پرداخت، ثبت‌نام، ظرفیت کلاس، عملکرد آموزشی و روند زمانی.
- از palette داده‌ای بخش رنگ استفاده شود.
- نمودار خلاصهٔ متنی یا جدول جایگزین قابل دسترسی داشته باشد.
- tooltip با keyboard/touch قابل دسترسی باشد.
- legend قابلیت خاموش/روشن‌کردن سری‌ها را توضیح دهد.
- pie/donut برای دسته‌های محدود؛ بیش از ۵ دسته به bar/list تبدیل شود.
- محور و واحد بدون ابهام؛ مقیاس گمراه‌کننده ممنوع.
- رنگ تنها عامل تمایز نیست؛ marker و الگوی خط نیز استفاده شود.

## 11. Accessibility

هدف پایه: WCAG 2.2 AA.

- تمام عملیات با صفحه‌کلید قابل انجام باشد.
- focus-visible واضح و در ترتیب منطقی باشد.
- focus trap فقط در modal واقعی و focus restore پس از بستن.
- label، description، error و hint به input متصل باشند.
- کنتراست متن و کنترل رعایت شود.
- target لمسی حداقل 44×44px در تجربهٔ موبایل.
- اطلاعات وضعیت با متن/آیکون همراه رنگ باشد.
- zoom تا 200% و reflow در عرض کم بررسی شود.
- aria-live برای پیام‌های ضروری، نه هر تغییر جزئی.
- جدول دارای caption یا نام قابل دسترس، th و scope صحیح باشد.
- نمودار خلاصهٔ متنی داشته باشد.
- reduced motion و forced-colors بررسی شود.
- ترتیب فوکوس در RTL و LTR منطقی باشد.

## 12. Localization, RTL & Date

- جهت صفحه از پروفایل زبان/کشور فعال تعیین می‌شود.
- از CSS logical properties استفاده شود: margin-inline، padding-inline، inset-inline.
- جهت متن مختلط با dir=auto یا unicode-bidi=isolate کنترل شود.
- شماره، URL، ایمیل، کد و زمان می‌توانند LTR باشند.
- تاریخ از formatter مرکزی و تقویم فعال منطقه‌ای می‌آید.
- متن‌های رابط از i18n؛ hardcode در کامپوننت چندزبانه ممنوع.
- فرمت عدد نمایشی و مقدار ذخیره‌شده در API از هم تفکیک شوند.
- فونت در همهٔ زبان‌ها همچنان Arad است.

## 13. Content Design — زبان نوشتاری رابط

- عنوان‌ها کوتاه، دقیق و مبتنی بر وظیفه.
- labelها اسم روشن؛ actionها فعل مستقیم.
- پیام خطا: مشکل + علت قابل فهم + اقدام اصلاحی.
- پیام موفقیت: نتیجهٔ واقعی، نه پیام مبهم.
- تأیید عملیات مخرب: نام موجودیت و پیامد را ذکر کند.
- empty state: چرا داده‌ای نیست + اقدام بعدی معتبر.
- متن‌های سیستمی حرفه‌ای و انسانی؛ شوخی، کنایه و ایموجی در عملیات سازمانی ممنوع.
- واژه‌های ثابت برای مفاهیم مدرسه‌ای در تمام ماژول‌ها حفظ شوند.

## 14. Patterns & Page Templates

### الگوهای عمومی

Search + Filter + Sort + Bulk Action؛ Data Table + Pagination؛ Create/Edit Form؛ Multi-step Wizard؛ Detail Header + Tabs؛ Master–Detail؛ Approval Workflow؛ Import/Export؛ Empty/Loading/Error/Offline؛ Confirmation & Undo؛ Notification Center؛ Audit Timeline؛ Permission Matrix؛ File Upload & Preview؛ Print Preview.

### قالب صفحات بهار

1. **Dashboard:** عنوان و context → KPIهای محدود → روند/تحلیل → اقدامات و رویدادهای مهم.
2. **List/Management:** عنوان → toolbar → filter summary → table/list → pagination.
3. **Create/Edit:** عنوان و breadcrumb → فرم گروه‌بندی‌شده → validation → action footer.
4. **Detail:** هویت موجودیت → status/actions → overview → tabs → activity.
5. **Report:** عنوان و بازه → فیلتر → summary → visualization/table → export/print.
6. **Settings:** navigation محلی → گروه تنظیمات → توضیح → controls → save feedback.
7. **Mobile workflow:** header فشرده → محتوای یک‌ستونی → actionهای اصلی در دسترس.

## 15. Domain Language — اجزای اختصاصی مدرسه

کامپوننت‌های زیر در لایهٔ Domain ساخته می‌شوند:

StudentIdentityCard، StudentProfileHeader، StudentEnrollmentStatus، GuardianContactCard، StaffProfileCard، TeacherAssignmentCard، ClassSummaryCard، ClassRoster، AttendanceRegister، AttendanceStatus، AttendanceTrend، GradeEntryGrid، GradeDistribution، ReportCardPreview، ExamSchedule، TimetableGrid، AssignmentCard، HomeworkSubmission، FeeInvoice، FeeBreakdown، PaymentStatus، PaymentHistory، ScholarshipIndicator، EnrollmentWizard، TransferWorkflow، SchoolSwitcher، BranchSwitcher، AcademicYearSelector، TermSelector، PermissionMatrix، RoleBadge، AnnouncementComposer، ParentCommunicationTimeline، MessageComposer، DocumentApproval، CertificatePreview، AuditLogEntry، ImportReviewTable و ExportJobStatus.

هر domain component باید با دادهٔ واقعی و semantics موجود کار کند؛ ظاهر مستقل از مدل داده و API باقی می‌ماند.

## 16. Print & Export

- صفحهٔ چاپی یک surface مستقل است.
- toolbar، sidebar، کنترل‌ها و عناصر تعاملی با print stylesheet حذف می‌شوند.
- فونت چاپ نیز Arad است.
- جدول‌ها header تکرارشونده و شکست ردیف کنترل‌شده دارند.
- اندازهٔ صفحه، margin و orientation مشخص است.
- تاریخ، واحد پول، نام مدرسه و هویت سند در خروجی ثابت‌اند.
- preview قبل از چاپ برای اسناد چندصفحه‌ای بررسی می‌شود.
- PDF export باید متن قابل انتخاب داشته باشد؛ تصویر تمام‌صفحه جایگزین سند متنی نیست.

## 17. Engineering & Implementation

### Source of truth

- Tokenها: CSS custom properties در لایهٔ مرکزی theme.
- Typography: فقط --font-sans: "Arad" و font-family: "Arad".
- Components: src/components/ui برای primitives و src/components/shared برای wrapperهای محصول.
- Domain components: در ماژول مربوط به دامنه یا src/components/bahar.
- Documentation: این سند و docs/component-catalog-v4.md.
- Icons: Lucide React.
- Charts: Recharts فعلی.
- Tables: TanStack Table فعلی.
- Accessible behavior: primitiveهای موجود Radix؛ استفاده از React Aria/Base UI فقط در صورت نیاز مستند و بدون مخلوط‌کردن دو primitive برای یک الگو.

### قوانین پیاده‌سازی

- tokenها باید برای Light و Dark جفت داشته باشند.
- کلاس‌های utility فقط برای layout محلی؛ رنگ، radius، shadow و typography از token.
- inline style و hex مستقیم فقط با دلیل فنی مستند.
- همهٔ component variants در یک محل تعریف شوند.
- componentها با Server/Client boundaries فعلی سازگار باشند.
- تغییرات visual-only منطق مجوز یا داده را دست‌کاری نکنند.
- برای هر component نمونهٔ story/state matrix ساخته شود.

## 18. Governance & Versioning

- نسخهٔ سیستم طراحی مستقل از نسخهٔ نرم‌افزار است.
- تغییر token عمومی نیازمند بررسی Light/Dark و تمام مصرف‌کننده‌هاست.
- component API با changelog و migration note تغییر می‌کند.
- حذف variant فقط پس از جست‌وجوی call siteها.
- deprecation حداقل یک چرخهٔ انتشار با هشدار مستند.
- component جدید فقط وقتی ساخته شود که الگوی تکرارشونده یا نیاز دامنه‌ای وجود دارد.
- fork/copy از کتابخانهٔ بیرونی باید source، نسخه، مجوز و تغییرات ثبت کند.
- مجوز هر component جداگانه بررسی می‌شود؛ وجود در یک سایت رایگان‌بودن استفادهٔ تجاری را ثابت نمی‌کند.

### Definition of Done

هر component وقتی Done است که ظاهر Light و Dark، RTL و LTR، stateهای مربوطه، keyboard و screen reader، mobile و desktop، دادهٔ خالی و طولانی و خطا و loading، reduced motion و forced colors، typecheck و lint و تست‌های مرتبط بررسی شده باشند؛ در یک صفحهٔ واقعی استفاده و مرور شده و مستنداتش به‌روز باشد.

## 19. پژوهش منابع و کتابخانه‌های مرجع

این فهرست مرور منابع عمومی مهم و قابل دسترسی در زمان تدوین است؛ ادعای فهرست‌کردن تک‌تک سایت‌های اینترنت نیست. هدف، پوشش خانواده‌های اصلی component، primitive، block، pattern و motion است.

### رفتار و accessibility

- [Radix Primitives](https://www.radix-ui.com/primitives/docs/components) — primitiveهای headless، منو، dialog، popover، select، tabs، slider و غیره.
- [Base UI](https://base-ui.com/) — primitiveهای React بدون استایل با تمرکز بر رفتار و دسترس‌پذیری.
- [React Aria](https://react-spectrum.adobe.com/react-aria/) — رفتار دسترس‌پذیر، keyboard، internationalization و collectionها.
- [Headless UI](https://headlessui.com/) — اجزای unstyled برای React و Vue.
- [Ark UI](https://ark-ui.com/) — primitiveهای مبتنی بر state machine.
- [Ariakit](https://ariakit.org/) — ابزارهای headless و دسترس‌پذیر.

### کتابخانه‌های کامل

- [shadcn/ui](https://ui.shadcn.com/) — source-first components و registry.
- [MUI](https://mui.com/material-ui/all-components/) — مجموعهٔ کامل و data-heavy.
- [Ant Design](https://ant.design/components/overview/) — الگوها و اجزای enterprise.
- [Mantine](https://mantine.dev/) — core components، hooks، dates، charts و notifications.
- [Chakra UI](https://chakra-ui.com/docs/components/concepts/overview) — componentهای themeable.
- [HeroUI](https://heroui.com/en/docs/react/components) — componentهای React و primitiveهای accessible.
- [Flowbite React](https://flowbite-react.com/) — اجزای Tailwind/React.
- [daisyUI](https://daisyui.com/components/) — componentهای CSS/Tailwind.
- [PrimeReact](https://primereact.org/) — اجزای گستردهٔ enterprise.
- [Fluent UI](https://react.fluentui.dev/) — زبان طراحی مایکروسافت.
- [Carbon](https://carbondesignsystem.com/) — سیستم IBM.
- [Primer](https://primer.style/) — سیستم GitHub.
- [Blueprint](https://blueprintjs.com/) — رابط‌های داده‌محور دسکتاپ.

### Source registries، blocks و الگوهای آماده

- [shadcn Registry Directory](https://ui.shadcn.com/docs/directory) — فهرست registryهای جامعه؛ در زمان بررسی صفحه 593 registry نشان می‌داد.
- [Aceternity UI](https://ui.aceternity.com/explore) — component، block، template و interaction؛ افکت‌ها باید با ماهیت عملیاتی بهار فیلتر شوند.
- [Magic UI](https://magicui.design/docs/components) — text, background, card, progress و motion.
- [Origin UI](https://originui.com/) — source components و الگوهای کاربردی.
- [Kibo UI](https://www.kibo-ui.com/) — اجزای مکمل برای React.
- [Park UI](https://park-ui.com/) — componentهای مبتنی بر Ark.
- [ReUI](https://reui.io/) — component و templateهای مبتنی بر Tailwind/shadcn.
- [21st.dev](https://21st.dev/) — discovery و ترکیب componentهای جامعه.
- [React Bits](https://reactbits.dev/) — افکت‌ها و اجزای تعاملی.
- [Motion Primitives](https://motion-primitives.com/) — الگوهای انیمیشن.
- [Preline](https://preline.co/) — componentها و patternهای Tailwind.
- [HyperUI](https://www.hyperui.dev/) — قطعات آمادهٔ Tailwind.
- [Float UI](https://floatui.com/) — blocks و sections.
- [Untitled UI](https://www.untitledui.com/) — Figma/UI reference و React components.
- [Tailwind Plus](https://tailwindcss.com/plus) — الگوهای تجاری؛ مجوز جداگانه لازم است.
- [Uiverse](https://uiverse.io/) — ایده‌های کوچک CSS؛ کیفیت و مجوز هر قطعه باید بررسی شود.

### روش استفاده در بهار

1. قابلیت و رفتار از چند منبع بررسی می‌شود؛ ظاهر نهایی از هیچ کتابخانه‌ای کپی نمی‌شود.
2. هر component به tokenهای بهار و Arad ترجمه می‌شود.
3. primitive موجود Radix برای رفتار حفظ می‌شود، مگر اینکه شکاف واقعی وجود داشته باشد.
4. کد بیرونی بدون بررسی license، security، dependency و accessibility وارد مخزن نمی‌شود.
5. componentهای نمایشی مانند 3D، glow و animated backgrounds فقط در marketing surface و در صورت توجیه استفاده می‌شوند.
6. dependency جدید صرفاً برای داشتن ظاهر متفاوت اضافه نمی‌شود.

## 20. مرجع مرتبط

- فهرست و مشخصات componentها: [component-catalog-v4.md](./component-catalog-v4.md)
- سند زبان طراحی نسخهٔ قبلی: [design-language.md](./design-language.md)
- قراردادهای نسخهٔ قبلی: [component-contracts.md](./component-contracts.md)
- پیاده‌سازی توکن‌ها: src/app/globals.css
- کتابخانهٔ primitiveها: src/components/ui
- wrapperهای مشترک: src/components/shared
