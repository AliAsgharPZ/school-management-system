# برنامه و ماتریس بازسازی رابط کاربری بهار — V5

**شاخه:** `ui-rebuild-v5`  
**مرجع طراحی:** `docs/design-system-v5.md`  
**مرجع کامپوننت:** `docs/component-catalog-v5.md`  
**هدف:** جایگزینی کامل presentation layer قدیمی با V5، بدون حذف منطق دامنه، routeها، APIها، permissionها یا داده‌ها.

## 1. محدودهٔ واقعی مخزن

بررسی درخت مخزن:
- ۱۴۴ صفحهٔ ماژولی زیر `src/app/app/**/page.tsx`.
- ۴۹ فایل primitive در `src/components/ui`.
- ۱۵ فایل مشترک در `src/components/shared`.
- پوستهٔ اصلی در `src/components/app-shell/app-shell.tsx`.
- منطق سمت سرور، API و DB خارج از scope بازطراحی بصری هستند، مگر تغییر مشخصی برای سازگاری لازم باشد.

## 2. راهبرد بازسازی

### لایهٔ اول — فعال‌سازی زبان جدید
- `src/app/bahar-v5.css`: توکن‌های V5، surfaceها، shell، دکمه‌ها، فرم‌ها، جدول‌ها، overlayها، responsive و print.
- `src/app/layout.tsx`: فعال‌سازی marker سراسری V5 و import stylesheet.
- `src/components/shared/bits.tsx`: بازسازی PageHeader، StatCard، LoadingBlock، EmptyState، ErrorBox و badgeها.
- این لایه ظاهر تمام routeهایی را که از root layout استفاده می‌کنند یکپارچه می‌کند.

### لایهٔ دوم — primitive migration
۴۹ primitive باید با API فعلی حفظ و از نظر visual states، keyboard، RTL و dark mode بازبینی شوند. CSS skin جایگزین تست behavior نیست.

### لایهٔ سوم — domain patterns
کامپوننت‌های مدرسه از primitiveها ساخته می‌شوند؛ هر صفحه از pattern مشترک خود استفاده می‌کند. صفحه نباید component مشابه محلی بسازد.

### لایهٔ چهارم — page-by-page
هر صفحه باید با data واقعی، permissionهای واقعی و تمام stateها بررسی شود. صفحهٔ صرفاً تحت تأثیر CSS، «مهاجرت کامل» محسوب نمی‌شود تا screenshot QA و تست workflow انجام شده باشد.

## 3. مرز حفظ رفتار

در بازسازی UI مجاز نیست:
- route حذف یا تغییر کند.
- API endpoint، payload یا response تغییر کند.
- schema دیتابیس تغییر کند.
- permission یا role gate حذف شود.
- validation دامنه حذف شود.
- فرم یا عملیات bulk ساده‌سازی و ناقص شود.
- متن/عدد ساختگی به‌جای دادهٔ واقعی نمایش داده شود.

مجاز است:
- markup presentation با حفظ event handlers و state بازنویسی شود.
- shared componentها با API سازگار بازطراحی شوند.
- classهای قدیمی با semantic tokens جایگزین شوند.
- layout و ترتیب بصری اطلاعات بهتر شود، اگر ترتیب عملیات و meaning حفظ شود.

## 4. صفحه‌ها و دامنه‌ها

### Dashboard و دسترسی
- `/app`
- `/app/accessibility`
- `/app/modules`
- `/app/modules/[slug]`

### دانش‌آموز، اولیا و ثبت‌نام
- `/app/students`
- `/app/students/[id]`
- `/app/children`
- `/app/admissions`
- `/app/alumni`
- `/app/student-goals`
- `/app/badges`
- `/app/birthdays`
- `/app/id-cards`
- `/app/id-reissue`
- `/app/yearbook`
- `/app/portfolio`
- `/app/observations`
- `/app/behavior`
- `/app/guidance`
- `/app/wellbeing`
- `/app/health`
- `/app/medication-log`

### آموزش، کلاس و ارزشیابی
- `/app/classes`
- `/app/class-roles`
- `/app/class-visits`
- `/app/subjects`
- `/app/lesson-plans`
- `/app/assignments`
- `/app/exams`
- `/app/exam-seats`
- `/app/grades`
- `/app/descriptive-report`
- `/app/grade-appeals`
- `/app/question-bank`
- `/app/quizzes`
- `/app/quizzes/[id]`
- `/app/study`
- `/app/study-groups`
- `/app/reading`
- `/app/revision-plan`
- `/app/makeup-classes`
- `/app/tracks`
- `/app/seating`
- `/app/timetable` (در صورت route موجود/ناوبری مرتبط)
- `/app/teaching` (در صورت route موجود/ناوبری مرتبط)

### حضور و غیاب و عملیات روزانه
- `/app/attendance`
- `/app/excuses`
- `/app/approvals`
- `/app/staff-attendance`
- `/app/duty-roster`
- `/app/duty-logs`
- `/app/drill-log`
- `/app/cleaning`
- `/app/keys-log`
- `/app/held-items`
- `/app/lost-found`
- `/app/lockers`
- `/app/facilities`
- `/app/asset-loans`
- `/app/safe-route`
- `/app/safety-reports`
- `/app/gate-passes`
- `/app/pickup`
- `/app/parking`

### ارتباطات، محتوا و جامعه
- `/app/announcements`
- `/app/messages`
- `/app/call-log`
- `/app/consents`
- `/app/events`
- `/app/assembly`
- `/app/blog`
- `/app/campaigns`
- `/app/clubs`
- `/app/club-proposals`
- `/app/elections`
- `/app/kindness-wall`
- `/app/fame`
- `/app/meetings`
- `/app/minutes`
- `/app/help-board`
- `/app/tickets`
- `/app/tasks`
- `/app/volunteer`
- `/app/podcast`
- `/app/tv`
- `/app/virtual-sessions`

### مالی، خرید و منابع
- `/app/finance`
- `/app/fee-installments`
- `/app/payroll`
- `/app/wallet`
- `/app/shop`
- `/app/supply-requests`
- `/app/resources`
- `/app/library`
- `/app/book-exchange`
- `/app/book-suggestions`
- `/app/meals`
- `/app/meal-orders`
- `/app/uniforms`

### حمل‌ونقل، خدمات و فضا
- `/app/transport`
- `/app/transport-requests`
- `/app/carpool`
- `/app/shuttle-delays`
- `/app/bike-registry`
- `/app/dormitory`
- `/app/preschool`
- `/app/venues`
- `/app/sports-league`
- `/app/sports-records`
- `/app/science-fair`

### مدیریت، تنظیمات و یکپارچه‌سازی
- `/app/audit`
- `/app/automation`
- `/app/bots`
- `/app/countries`
- `/app/imports`
- `/app/insights`
- `/app/journal`
- `/app/labs`
- `/app/languages`
- `/app/leads`
- `/app/leaves`
- `/app/locale-settings`
- `/app/mcp`
- `/app/network`
- `/app/plugins`
- `/app/profile`
- `/app/reports`
- `/app/report-comments`
- `/app/rollover`
- `/app/schedule`
- `/app/schools`
- `/app/settings`
- `/app/shad`
- `/app/sms`
- `/app/substitutions`
- `/app/transfer-requests`
- `/app/tutor-offers`
- `/app/users`
- `/app/website`
- `/app/forms`
- `/app/forms/[id]`
- `/app/print-requests`
- `/app/languages`

> این دسته‌بندی برای برنامه‌ریزی QA است؛ routeهای دقیق و نهایی باید از filesystem و NAV خوانده شوند. مواردی که در کد وجود ندارند، به‌عنوان route جدید ایجاد نمی‌شوند.

## 5. صفحه‌های خارج از پنل

این صفحات نیز بخشی از تجربهٔ محصول‌اند و باید با V5 هماهنگ شوند: `/login`، `/`، `/checkin`، `/miniapp`، `/countries`، `/languages`، `/blog`، `/blog/[slug]`، `/s/[subdomain]`، `/verify/[code]` و صفحات چاپ/پوستر.

## 6. QA Matrix

| محور | دسکتاپ | موبایل | معیار |
|---|---|---|---|
| Shell/navigation | ✓ | ✓ | route، active، permission، keyboard |
| Page header | ✓ | ✓ | hierarchy، action wrap |
| Forms | ✓ | ✓ | label، validation، preserve input |
| Tables | ✓ | ✓ | sort/filter/pagination/overflow |
| Dialog/Sheet | ✓ | ✓ | focus trap، Escape، restore |
| Dashboard | ✓ | ✓ | data accuracy، hierarchy |
| Dark/Light | ✓ | ✓ | contrast و token consistency |
| RTL/LTR | ✓ | ✓ | order، icons، mixed content |
| Print | ✓ | N/A | document output |
| Reduced motion | ✓ | ✓ | no essential animation |

## 7. وضعیت اجرای فعلی در این شاخه

- [x] V5 token layer و aliasهای سازگاری اضافه شده است.
- [x] V5 stylesheet بعد از globals وارد می‌شود و marker سراسری روی root فعال شده است.
- [x] پوستهٔ موجود با skin جدید جنگلی/سازمانی، بدون دست‌کاری منطق NAV و permission، ظاهر تازه می‌گیرد.
- [x] shared PageHeader، KPI، Loading، Empty، Error و Badgeها بازسازی شده‌اند.
- [ ] بازبینی API و state تمام ۴۹ primitive.
- [ ] بازبینی و مهاجرت تمام ۱۵ shared component.
- [ ] page-by-page composition برای ۱۴۴ صفحه.
- [ ] screenshot QA واقعی برای Light/Dark، RTL/LTR، desktop/mobile.
- [ ] تست regression کامل فرم‌ها، جداول، مجوزها و عملیات.
- [ ] visual QA صفحات عمومی، login و print.
- [ ] merge و production deployment.

هیچ‌کدام از موارد ناتمام نباید به‌عنوان «کامل» گزارش شود. مهاجرت سراسری CSS، پایهٔ جدید است؛ جایگزین screenshot QA و بررسی تک‌تک workflowها نیست.

## 8. ترتیب اجرای پیشنهادی

1. Shell و shared components.
2. Primitiveهای پرمصرف: Button, Input, Select, Card, Table, Dialog, Tabs, Badge, Alert, Dropdown, Popover.
3. داشبورد و صفحات پرتردد: students, attendance, classes, grades, finance, schedule, messages, settings.
4. بقیهٔ routeها بر اساس گروه دامنه.
5. login، public portal، miniapp و print.
6. تست کامل و رفع regression.
