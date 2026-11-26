# کاتالوگ کامل کامپوننت‌های بهار — V5
نسخه: 5.0 · مرجع API، anatomy، state و domain composition

این کاتالوگ مکمل `docs/design-system-v5.md` است. سند طراحی مقادیر و زبان بصری را تعیین می‌کند؛ این سند قرارداد componentها و compositionها را تعیین می‌کند. وجود نام یک component در این سند به‌تنهایی به معنی پیاده‌سازی آن نیست؛ وضعیت واقعی در `docs/ui-rebuild-v5.md` ثبت می‌شود.

## 1. قرارداد پایه

هر component باید:
- TypeScript props دقیق داشته باشد و API عمومی آن بی‌دلیل نشکند.
- از tokenهای V5 استفاده کند و hex خام در JSX نداشته باشد.
- semantic HTML و primitive موجود Radix را حفظ کند.
- در RTL/LTR و Light/Dark رفتار صحیح داشته باشد.
- focus-visible، disabled، invalid، loading و selected را تعریف کند.
- با keyboard، touch و screen reader قابل استفاده باشد.
- className را برای composition بپذیرد؛ ولی className نباید قرارداد پایه را از بین ببرد.
- side effect یا network request پنهان نداشته باشد.
- برای stateهای asynchronous، pending/error/success واقعی داشته باشد.

### اندازه‌های مشترک
- Control: 36، 42، 44 و 48px.
- Icon: 16، 18، 20 و 24px.
- Radius: 4، 6، 8، 10، 12 و 16px.
- Spacing: مضارب 4px.
- Touch target: حداقل 44×44px برای actionهای مهم.

## 2. Foundations & Layout

| Component | Anatomy / API | رفتار و state |
|---|---|---|
| Container | width, maxWidth, padding, centered | عرض محتوا و gutter پاسخ‌گو |
| Stack | direction, gap, align | flex منطقی، بدون margin فیزیکی |
| Grid | columns, gap, responsive spans | grid 12/8/4 |
| Separator | orientation | border معنایی |
| AspectRatio | ratio | primitive ساختاری؛ ظاهر از content |
| ScrollArea | viewport, scrollbar | keyboard و touch |
| Resizable | panels, handle | حداقل/حداکثر اندازه، keyboard |
| Skeleton | shape, width, height | loading ساختاری، بدون shimmer افراطی |
| Card | CardHeader, Title, Description, Action, Content, Footer | surface، border، elevation |
| Collapsible | Trigger, Content | aria-expanded، حفظ focus |

## 3. Actions & Navigation

| Component | Variants / Props | قرارداد |
|---|---|---|
| Button | primary, secondary, outline, ghost, destructive, link; xs/sm/md/lg | یک primary در هر گروه، type صریح، loading و disabled |
| IconButton | icon, label, size, variant | accessible name اجباری |
| Breadcrumb | items, current | صفحهٔ جاری غیرقابل کلیک |
| Tabs | value, defaultValue, onValueChange | keyboard arrow، selected semantics |
| Pagination | page, pageSize, total, onChange | state واقعی و disabled edge |
| Sidebar | groups, active, collapsed | role/permission از NAV |
| NavigationMenu | items, orientation | keyboard و focus |
| Menubar | menus, items | keyboard menu pattern |
| Toggle | pressed, onPressedChange | aria-pressed |
| ToggleGroup | type, value, items | single/multiple و keyboard |
| DropdownMenu | trigger, items, groups | keyboard، destructive grouping |
| ContextMenu | target, items | right-click و keyboard alternative |
| Command | query, groups, results | searchable command palette |
| Link | href, external, disabled | next/link، focus و visited |
| AppLauncher | groups, badges, search | از NAV مشترک و permission-aware |

## 4. Forms & Inputs

| Component | API / Anatomy | قرارداد |
|---|---|---|
| Field | label, description, required, error | ارتباط id/aria-describedby |
| Label | htmlFor, required | label واقعی |
| Input | type, value, onChange, invalid | کنترل استاندارد، autofill |
| Textarea | rows, resize, maxLength | character count در صورت نیاز |
| Select | options, searchable, value | keyboard و empty option |
| Checkbox | checked, indeterminate | label hit area |
| RadioGroup | value, options | انتخاب تک‌گزینه |
| Switch | checked, label | فقط setting دوحالته |
| Slider | min/max/step/value | مقدار متنی مکمل |
| Calendar | locale, selected, disabled dates | Jalali/Gregorian wrapper |
| DatePicker | value, min/max, locale | text input + calendar |
| InputOTP | length, value, onComplete | paste و keyboard |
| Form | schema, onSubmit | validation و submit state |
| FileUpload | accept, maxSize, value | preview، progress، retry |
| SearchInput | query, debounce, clear | label و keyboard |
| FilterBar | filters, applied, reset | active filter chips |
| FormSection | title, description, children | گروه معنایی |
| ValidationSummary | errors, focusFirst | لینک به field خطادار |

## 5. Data Display

| Component | API / Anatomy | قرارداد |
|---|---|---|
| Table | caption, columns, rows | data semantics |
| TableHeader/Head | scope, sort | sorting قابل کشف |
| TableBody/Row/Cell | selection, numeric | alignment و row state |
| DataTable | columns, pagination, selection, filters | server state و empty/error |
| Badge | tone, label, icon | neutral/success/warning/danger/info |
| Avatar | src, fallback, size | alt و fallback |
| Price | amount, currency, precision | formatter مرکزی |
| Progress | value, max, label | aria-valuenow و text |
| Chart | type, series, range, unit | legend/tooltip/summary |
| Timeline | events, actor, timestamp | ترتیب و زمان |
| KeyValue | label, value | metadata detail |
| StatCard | label, value, unit, delta, tone | KPI معنی‌دار |
| MetricGroup | metrics | responsive layout |
| DataPreview | source, sample, errors | import preview |

## 6. Feedback & Overlays

| Component | API / Anatomy | قرارداد |
|---|---|---|
| Alert | tone, title, description | پیام پایدار |
| AlertDialog | title, consequence, confirm | destructive confirmation |
| Dialog | title, description, actions | focus trap و restore |
| Sheet | side, size, content | panel جانبی |
| Drawer | side, mobile, content | mobile full-height |
| Popover | trigger, content | contextual |
| HoverCard | trigger, preview | فقط اطلاعات مکمل |
| Tooltip | content, delay | توضیح کوتاه |
| Toast | title, description, tone | نتیجهٔ کوتاه |
| Sonner | position, richColors | رنگ semantic |
| Toaster | provider | میزبان notification |
| Progress | value, label | async progress |
| Skeleton | variant | placeholder layout |
| EmptyState | icon, title, desc, action | no data |
| ErrorState | message, retry, support | recovery |
| LoadingState | label, skeleton | loading context |

## 7. سایر primitiveهای موجود در مخزن

- Accordion: گروه disclosure؛ عنوان قابل فوکوس و aria-expanded.
- Alert: پیام inline با tone.
- AlertDialog: تأیید عملیات خطرناک.
- Avatar: هویت کاربر و fallback.
- Badge: وضعیت و دسته‌بندی.
- Breadcrumb: مسیر سلسله‌مراتبی.
- Calendar: انتخاب تاریخ و localization.
- Carousel: فقط برای محتوای واقعاً افقی/اسلایدی؛ کنترل و label لازم.
- Chart: visualization.
- Collapsible: disclosure تکی.
- Dialog: overlay modal.
- Drawer: mobile navigation یا contextual panel.
- Form: React Hook Form/resolver integration.
- HoverCard: preview غیراجباری.
- Label: label native.
- Pagination: navigation داده.
- Popover: context panel.
- Price: واحد پول و locale.
- RadioGroup: انتخاب تکی.
- Resizable: split panel.
- ScrollArea: overflow.
- Select: انتخاب.
- Separator: مرز ساختاری.
- Sheet: side panel.
- Sidebar: ناوبری.
- Slider: انتخاب پیوسته.
- Sonner/Toast/Toaster: notification.
- Switch: setting boolean.
- Table: data table primitive.
- Tabs: view switch.
- Textarea: متن چندخطی.
- Toggle/ToggleGroup: ابزار حالت‌دار.
- Tooltip: hint.
- AspectRatio: ratio wrapper.

## 8. Domain components — مدرسه

### 8.1 دانش‌آموز و اولیا
- StudentIdentity: نام، تصویر، شناسه، پایه، کلاس و وضعیت.
- StudentProfileHeader: هویت + actionهای مجاز.
- StudentSummary: KPIهای حضور، نمره، مالی و فعالیت.
- StudentRoster: فهرست با انتخاب گروهی.
- ParentContactCard: راه ارتباطی و مجوز نمایش.
- GuardianRelation: نوع ارتباط و وضعیت تأیید.
- EnrollmentWizard: مراحل ثبت‌نام و مدارک.
- StudentTransfer: مدرسه/پایهٔ مبدا و مقصد، تاریخ و تأیید.
- StudentDocumentList: مدرک، تاریخ، اعتبار، download.
- StudentTimeline: رخدادهای تحصیلی و اداری.
- AlumniProfile: دورهٔ تحصیل و وضعیت فارغ‌التحصیلی.
- StudentGoalCard: هدف، progress، deadline.

### 8.2 کارکنان و معلمان
- StaffIdentity، StaffProfileHeader، TeacherAssignment، StaffAvailability.
- StaffAttendanceSummary، WorkloadSummary، StaffDocumentStatus.
- PayrollSummary، LeaveBalance، SubstituteAssignment.
- RoleBadge و PermissionMatrix.

### 8.3 آموزش
- ClassSummary، ClassRoster، SubjectCard، LessonCard.
- TimetableGrid، AssignmentCard، SubmissionReview.
- ExamSchedule، ExamSeatMap، GradeEntryGrid، GradeCell.
- GradeDistribution، ReportCardPreview، LearningProgress.
- CurriculumProgress، QuestionBankItem، QuizBuilder.

### 8.4 حضور و غیاب
- AttendanceRegister، AttendanceStatus، AttendanceBulkEditor.
- AttendanceCalendar، AttendanceTrend، LateArrivalEntry.
- AbsenceReason، ExcuseReview، RepeatAbsenceAlert.
- QRCheckIn، SessionCodeEntry.

### 8.5 امور مالی
- FeeInvoice، FeeBreakdown، PaymentStatus، PaymentHistory.
- InstallmentPlan، ScholarshipIndicator، FinancialSummary.
- ReceiptPreview، PayrollRun، WalletBalance.
- Financial filters باید دوره، مدرسه، بدهکار/بستانکار و وضعیت را واضح نمایش دهند.

### 8.6 عملیات و مدیریت
- SchoolSwitcher، BranchSwitcher، AcademicYearSelector، TermSelector.
- AnnouncementComposer، AnnouncementCard، ApprovalRequest.
- DocumentApproval، AuditLogEntry، ImportReviewTable، ExportJobStatus.
- AssetCard، InventoryMovement، TransportRouteCard، MealOrder.
- EventCard، TicketCard، TaskCard، MessageThread.

## 9. ترکیب‌های مرجع (Patterns)

1. List Management: PageHeader → FilterBar → BulkActionToolbar → DataTable → Pagination.
2. Create/Edit: PageHeader → FormSection → Fields → ValidationSummary → ActionFooter.
3. Entity Detail: IdentityHeader → Status → Actions → Summary → Tabs → Timeline.
4. Dashboard: Context → KPI → Primary Insight → Actions → Activity.
5. Approval: RequestSummary → Evidence → ReviewerActions → Confirm → AuditTrail.
6. Import: Upload → Mapping → Validation → Preview → Confirm → Result.
7. Report: ReportHeader → Range → Filters → Metrics → Chart → Table → Export.
8. Bulk: SelectionCount → ActionToolbar → Confirm → Progress → Result.
9. Search: SearchInput → Suggestions → GroupedResults → Empty/NoPermission.
10. Mobile Entry: CompactHeader → Context → Fields → InlineErrors → StickyAction.

## 10. State contracts

| State | UI | Required behavior |
|---|---|---|
| initial | empty/default | focus and labels |
| loading | skeleton/spinner | context label |
| empty | empty illustration/icon | next action |
| no results | query-aware empty | clear filters |
| error | message + retry | preserve input |
| success | confirmation | actual API success |
| disabled | muted + reason | no false affordance |
| invalid | field border + message | aria-describedby |
| selected | clear selected style | keyboard selection |
| permission denied | explanation + safe route | server enforcement |
| offline | persistent status | retry/queue semantics |

## 11. موجودی primitiveهای مخزن

در شاخهٔ بازسازی، فایل‌های فعلی زیر باید از نظر visual contract و API بازبینی شوند (۴۹ فایل):

`accordion`, `alert-dialog`, `alert`, `aspect-ratio`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input-otp`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `price`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toaster`, `toggle-group`, `toggle`, `tooltip`.

کامپوننت‌های `aspect-ratio` و `toaster` ممکن است ظاهر مستقل نداشته باشند، اما قرارداد ساختاری/میزبانی آن‌ها همچنان باید تست شود.

## 12. استاندارد مستندسازی API

برای هر component production:
- Purpose و عدم‌کاربردها.
- Props، types، defaultها و event callbacks.
- Anatomy و data-slotها.
- Variants و sizes.
- State matrix.
- Keyboard interaction.
- RTL/LTR و responsive behavior.
- مثال minimal و مثال domain.
- Accessibility notes.
- Test cases و مالک source.
- Breaking-change policy.

## 13. انتخاب کتابخانه و مالکیت کد

- Radix: behavior و primitives.
- Tailwind/local CSS: ظاهر بهار.
- Lucide React: iconography.
- Recharts: chart.
- Framer Motion: motion محدود.
- TanStack Table: state/data table در صورت استفادهٔ صفحه.
- React Hook Form + Zod/resolver: form state/validation.

هیچ component آماده‌ای با ظاهر پیش‌فرض وارد محصول نمی‌شود. پیش از copy/paste باید license، source، version، dependencies، accessibility، network requests و امنیت بررسی شود. هر اقتباس باید attribution و license را ثبت کند.
