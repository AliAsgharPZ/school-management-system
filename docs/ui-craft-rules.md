# قواعد اجرای رابط کاربری بهار — V5
نسخه: 5.0

مرجع بصری: `docs/design-system-v5.md`  
مرجع API و component: `docs/component-catalog-v5.md`  
مرجع route coverage و QA: `docs/ui-rebuild-v5.md`

## 1. ترتیب تصمیم‌گیری
1. صحت داده و عملیات
2. دسترس‌پذیری و امنیت
3. وضوح سلسله‌مراتب و سرعت
4. تراکم اطلاعات و responsive behavior
5. انسجام بصری
6. حرکت و تزئین

## 2. پیش از تغییر صفحه
- route، API، مدل داده، role/permission و تمام actionها را شناسایی کن.
- stateهای loading، empty، no-results، error، success، disabled و no-permission را ثبت کن.
- call siteهای shared component را پیدا کن.
- behavior فعلی را به‌عنوان regression baseline نگه دار.
- تغییر ظاهر نباید route، payload، validation دامنه یا access control را حذف کند.

## 3. ساختار صفحه
- PageHeader با عنوان روشن و action اصلی.
- toolbar و filterها در یک گروه بصری.
- دادهٔ اصلی در اولویت.
- کارت فقط برای گروه مستقل؛ نه برای هر بخش کوچک.
- عرض و spacing از tokenهای V5.
- RTL با logical properties و start/end.
- موبایل همهٔ عملیات را با layout جایگزین نگه می‌دارد.

## 4. کامپوننت و استایل
- از primitiveهای محلی و shared patternها استفاده کن.
- رنگ، radius، spacing، shadow و typography فقط از V5 tokenها.
- فونت فقط Arad.
- هیچ hex، رنگ status یا font family خام داخل صفحه اضافه نشود.
- button type صریح؛ icon-only accessible name دارد.
- Radix behavior را با div سفارشی جایگزین نکن.

## 5. فرم و داده
- label visible؛ placeholder فقط hint.
- error با aria-invalid و aria-describedby.
- input هنگام retry و network failure حفظ شود.
- success فقط پس از response واقعی.
- ارقام، تاریخ و ارز از formatter مرکزی.
- bulk operation تعداد و اثر خود را توضیح می‌دهد.

## 6. جدول و گزارش
- header، unit، sorting و alignment روشن.
- sticky header در scroll container.
- mobile overflow یا row-card alternative با حفظ تمام داده.
- pagination و filter state واقعی.
- report range، school/class context و filterهای مؤثر را نمایش می‌دهد.

## 7. Print
- خروجی چاپی مستقل از shell.
- header گزارش، تاریخ، مدرسه و context.
- تکرار table header و کنترل page breaks.
- تست PDF فارسی چندصفحه‌ای.

## 8. Motion
- 120–180ms برای micro-interaction.
- opacity/transform؛ بدون blur/parallax/3D در پنل.
- reduced-motion اجباری.

## 9. Accessibility و security
- keyboard-only، focus-visible، semantic HTML و screen reader.
- contrast مطابق WCAG 2.2 AA.
- permission همیشه سمت سرور enforce می‌شود.
- دادهٔ حساس در DOM/toast/log غیرضروری نمایش داده نشود.

## 10. تست و انتشار
- lint، typecheck، build.
- RTL/LTR، Light/Dark، mobile/desktop.
- loading/empty/error/permission و دادهٔ حجیم.
- keyboard، reduced-motion، zoom 200%.
- screenshot QA واقعی برای صفحات مهاجرت‌شده.
- تست regression API، permissions، form submission، table operations و print.
- merge/deploy فقط بعد از CI سبز و تأیید بصری.
