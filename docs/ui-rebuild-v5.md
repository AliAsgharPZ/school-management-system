# برنامه و ماتریس بازسازی رابط کاربری بهار — V5

**شاخهٔ انتشار:** `design-system-v4-arad-only` (PR #4)
**شاخهٔ کاری اولیه:** `ui-rebuild-v5`  
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

## 4. موجودی دقیق routeهای پنل

تعداد route pageهای موجود در filesystem شاخهٔ بازسازی: **145** شامل داشبورد اصلی. از این تعداد، 144 route صفحهٔ ماژولی و یک route داشبورد است. این فهرست از درخت واقعی مخزن تولید شده است؛ route جدیدی از روی حدس ساخته نشده است.

```text
//app/accessibility
//app/admissions
//app/alumni
//app/announcements
//app/approvals
//app/assembly
//app/asset-loans
//app/assignments
//app/attendance
//app/audit
//app/automation
//app/badges
//app/behavior
//app/bike-registry
//app/birthdays
//app/blog
//app/book-exchange
//app/book-suggestions
//app/bots
//app/call-log
//app/campaigns
//app/carpool
//app/certificates
//app/children
//app/class-roles
//app/class-visits
//app/classes
//app/cleaning
//app/club-proposals
//app/clubs
//app/consents
//app/countries
//app/descriptive-report
//app/document-requests
//app/dormitory
//app/drill-log
//app/duty-logs
//app/duty-roster
//app/elections
//app/engagement
//app/events
//app/exam-seats
//app/exams
//app/excuses
//app/facilities
//app/fame
//app/fee-installments
//app/finance
//app/forms/[id]
//app/forms
//app/gate-passes
//app/grade-appeals
//app/grades
//app/guidance
//app/health
//app/held-items
//app/help-board
//app/homework-balance
//app/id-cards
//app/id-reissue
//app/imports
//app/insights
//app/journal
//app/keys-log
//app/kindness-wall
//app/labs
//app/languages
//app/leads
//app/leaves
//app/lesson-plans
//app/library
//app/locale-settings
//app/lockers
//app/lost-found
//app/makeup-classes
//app/mcp
//app/meal-orders
//app/meals
//app/medication-log
//app/meetings
//app/mentoring
//app/messages
//app/minutes
//app/modules/[slug]
//app/modules
//app/network
//app/observations
//app/office-hours
//app
//app/parking
//app/payroll
//app/pickup
//app/plugins
//app/podcast
//app/portfolio
//app/preschool
//app/print-requests
//app/profile
//app/question-bank
//app/quizzes/[id]
//app/quizzes
//app/reading
//app/report-comments
//app/reports
//app/resources
//app/revision-plan
//app/rollover
//app/safe-route
//app/safety-reports
//app/schedule
//app/schools
//app/science-fair
//app/seating
//app/settings
//app/shad
//app/shuttle-delays
//app/sms
//app/sports-league
//app/sports-records
//app/staff-attendance
//app/student-goals
//app/students/[id]
//app/students
//app/study-groups
//app/study
//app/subjects
//app/substitutions
//app/supply-requests
//app/tasks
//app/tickets
//app/tracks
//app/transfer-requests
//app/transport-requests
//app/transport
//app/tutor-offers
//app/tv
//app/uniforms
//app/users
//app/venues
//app/virtual-sessions
//app/volunteer
//app/wallet
//app/website
//app/wellbeing
//app/yearbook
```

این فهرست مرجع QA و ردیابی صفحه‌هاست. برای هر route باید role/permission، دادهٔ واقعی، stateهای loading/empty/error، workflow، mobile layout و screenshot QA ثبت شود.

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
