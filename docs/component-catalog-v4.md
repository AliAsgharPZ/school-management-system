# کاتالوگ کامپوننت‌های بهار — نسخهٔ 4.0

**مرجع ظاهری و رفتاری:** [سیستم طراحی بهار V4](./design-system-v4.md)  
**اصل:** تمام اجزا با توکن‌های بهار و فونت Arad طراحی می‌شوند. این سند کاتالوگ قابلیت‌ها و مشخصات مورد انتظار است؛ نام‌بردن از یک جزء به معنی نصب کتابخانه یا آماده‌بودن پیاده‌سازی آن نیست.

## 1. قرارداد عمومی تمام کامپوننت‌ها

هر component باید در صورت ارتباط این موارد را مشخص کند:

- **Anatomy:** بخش‌های داخلی و ساختار معنایی.
- **Variants:** نقش یا ظاهرهای مجاز.
- **Sizes:** اندازه‌های استاندارد.
- **States:** default، hover، focus-visible، pressed، selected، disabled، loading، invalid، expanded، empty، success و error.
- **Behavior:** mouse، touch، keyboard، focus و submit.
- **Accessibility:** role، name، description، value، keyboard pattern و live announcement.
- **Responsive:** رفتار در موبایل، تبلت و دسکتاپ.
- **Themes:** Light و Dark.
- **Direction:** RTL و LTR.
- **Content:** متن کوتاه/بلند، دادهٔ خالی، ارقام و متن مختلط.
- **Integration:** API، controlled/uncontrolled، فرم، URL و مجوز.
- **QA:** تست‌های واحد، تعامل و مرور بصری.

### اندازه‌های مشترک

- XS: ارتفاع 30–32px؛ فقط ابزارهای فشرده.
- SM: ارتفاع 36px.
- MD: ارتفاع 40px.
- LG: ارتفاع 44px.
- XL: ارتفاع 48px.
- هدف لمس در موبایل: حداقل 44×44px حتی اگر خود glyph یا کنترل کوچک‌تر باشد.

### قواعد مشترک

- اکشن با Button؛ navigation با Link.
- icon-only باید accessible name داشته باشد.
- کنترل داخل فرم type صریح دارد.
- label و error با id به input متصل می‌شوند.
- loading باید از submit دوباره جلوگیری کند.
- state با رنگ تنها نمایش داده نمی‌شود.
- هیچ component نباید رنگ برند، radius یا shadow را hardcode کند.
- همهٔ متن‌ها و اعداد با Arad هستند.

---

## 2. Foundation & Layout Components

| Component | کاربرد و anatomy | Variants / رفتار |
|---|---|---|
| Box | ظرف پایهٔ محتوایی | surface، muted، bordered، elevated |
| Container | محدودکردن عرض صفحه | fluid، reading، wide، full |
| Stack | چیدمان عمودی | gap token، align، wrap |
| Inline / Cluster | گروه افقی | gap، wrap، alignment |
| Grid | شبکهٔ چندستونی | 12/8/4 column، responsive |
| Divider | جداکنندهٔ بصری | horizontal، vertical، subtle، strong |
| Separator | جداکنندهٔ معنایی | decorative یا semantic |
| Spacer | فاصله‌گذار | فقط در layoutهای خاص؛ نه برای جایگزینی spacing token |
| AspectRatio | نسبت ثابت رسانه | 1:1، 4:3، 16:9، custom |
| ScrollArea | ناحیهٔ اسکرول | x، y، both؛ scrollbar قابل کشف |
| ResizablePanels | پنل قابل تغییر اندازه | horizontal، vertical، collapsed |
| Portal | لایهٔ خارج از stacking context | dialog/menu/tooltip |
| VisuallyHidden | متن مخصوص screen reader | فقط محتوای غیرقابل حذف |
| SafeArea | رعایت بریدگی و inset دستگاه | top، bottom، inline |
| Surface | سطح معنایی | canvas، base، raised، sunken، inverse |

## 3. Actions & Links

| Component | Variants | مشخصات رفتاری |
|---|---|---|
| Button | primary، secondary، outline، ghost، destructive، link | size، loading، disabled، icon placement |
| IconButton | primary، subtle، outline، destructive | accessible label، tooltip اختیاری |
| ButtonGroup | attached، separated | ترتیب منطقی در RTL/LTR |
| SplitButton | primary action + menu | action اصلی مستقل از منوی فرعی |
| Link | default، muted، external | visited/focus، مقصد قابل فهم |
| Toggle | on/off | pressed state و aria-pressed |
| ToggleGroup | single، multiple | keyboard navigation |
| SegmentedControl | single selection | فقط گزینه‌های هم‌سطح و محدود |
| FloatingActionButton | standard، extended | فقط برای یک اقدام پرتکرار در mobile |
| ActionBar | inline، sticky، bottom | عملیات وابسته به selection |
| StatefulButton | idle، loading، success، error | نتیجهٔ واقعی؛ success نمایشی و جعلی ممنوع |
| CopyButton | default، copied، failed | اعلام نتیجه با toast/aria-live |
| BackButton | icon + label | history یا parent route مشخص |
| RetryButton | standard، compact | فقط برای خطای قابل retry |

### Button specification

- Primary: فقط یک اقدام اصلی در هر ناحیهٔ کاری.
- Secondary: اقدام مهم اما غیر اصلی.
- Outline: اقدام جایگزین با مرز واضح.
- Ghost: ابزار کم‌تأکید در toolbar.
- Destructive: حذف/لغو/اقدام مخرب؛ نیازمند confirmation در عملیات غیرقابل بازگشت.
- Link: navigation یا کنش متنی؛ نباید شبیه متن عادی باشد.
- Icon button: حداقل 40px دسکتاپ و 44px mobile target.
- Loading: spinner + حفظ label + جلوگیری از double submit.

---

## 4. Form & Input Components

| Component | موارد مورد انتظار |
|---|---|
| Form | submit، validation، dirty state، reset، pending |
| Field | label، control، hint، error، required، optional |
| Label | visible، required marker، association |
| Fieldset / Legend | گروه کنترل‌های مرتبط |
| Input | text، email، tel، url، search، password |
| Textarea | resize، character count، min/max rows |
| NumberInput | min/max، step، decimal، localized display |
| NumberStepper | increment/decrement با keyboard |
| SearchInput | clear، loading، suggestion trigger |
| PasswordInput | reveal/hide، strength hint در صورت نیاز |
| InputGroup | prefix، suffix، addon، action |
| InputOTP / PinInput | paste، auto-advance، error، resend |
| Checkbox | checked، unchecked، indeterminate |
| CheckboxGroup | single/multiple values |
| Radio | single selection |
| RadioGroup | arrow navigation و orientation |
| Switch | on/off برای تنظیمات دوحالته |
| Select | single/multiple، searchable در صورت نیاز |
| NativeSelect | انتخاب ساده با native semantics |
| Combobox | input + filtered list + active option |
| Autocomplete | suggestion بدون تحمیل انتخاب |
| MultiSelect | tags، clear، selected count |
| TagInput | افزودن و حذف token |
| Mentions | mention افراد/گروه‌ها |
| Slider | single، range، step، min/max |
| RangeSlider | two thumbs، collision rules |
| DatePicker | single date، calendar، locale |
| DateRangePicker | start/end، preset range |
| Calendar | month، week، day selection |
| TimePicker | 12/24-hour، keyboard |
| DateTimePicker | date + time + timezone/locale |
| ColorPicker | swatch، custom value؛ فقط برای تنظیمات واقعی |
| FileUpload | click، drag/drop، progress، cancel |
| Dropzone | drag state، accepted/rejected files |
| FileInput | native fallback |
| Rating | read-only یا editable؛ semantics روشن |
| TransferList | انتقال بین دو مجموعه |
| Cascader | انتخاب سلسله‌مراتبی |
| TreeSelect | انتخاب از درخت |
| RichTextEditor | toolbar، headings، lists، links، paste sanitation |
| MarkdownEditor | source/preview، syntax، safe rendering |
| SignaturePad | draw، clear، confirm؛ فقط اگر نیاز حقوقی/فرایندی وجود دارد |

### Field states

- default، focused، filled، invalid، disabled، read-only، loading.
- hint با متن کم‌اهمیت؛ error با متن واضح و action اصلاحی.
- required با semantics واقعی، نه فقط ستاره.
- placeholder صرفاً مثال است و label را حذف نمی‌کند.
- ورودی موبایل برای متن و عدد مناسب باشد؛ zoom ناخواسته و keyboard نامرتبط ایجاد نشود.

### Date & localization

- DatePicker و Calendar باید از locale و calendar profile فعال استفاده کنند.
- تاریخ شمسی/میلادی از formatter مرکزی؛ منطق تقویم داخل component کپی نشود.
- ارقام نمایشی با ارقام ذخیره‌شده در API اشتباه نشوند.
- range picker برای بازه‌های گزارش و مالی presetهای قابل فهم دارد.

---

## 5. Navigation Components

| Component | کاربرد | حالت‌ها |
|---|---|---|
| AppSidebar | ناوبری اصلی | expanded، collapsed، mobile drawer |
| SidebarGroup | گروه منو | expanded/collapsed |
| SidebarItem | مسیر یا action | default، active، hover، disabled |
| Topbar | context و ابزار عمومی | desktop، compact |
| Navbar | navigation افقی | responsive، overflow |
| BottomNavigation | mobile primary routes | active، badge |
| Breadcrumb | مسیر سلسله‌مراتبی | collapsed، current |
| Tabs | panelهای هم‌سطح | underline، enclosed، pills |
| TabPanel | محتوای tab | lazy، loading، empty |
| Pagination | جابه‌جایی صفحه | first/prev/next/last، page size |
| Stepper | فرایند چندمرحله‌ای | current، complete، error، disabled |
| Steps | نمایش مسیر فرایند | horizontal، vertical |
| Menu | فهرست action | item، separator، submenu |
| DropdownMenu | action menu | checkbox/radio/submenu |
| ContextMenu | منوی راست‌کلیک/long press | pointer + keyboard |
| Menubar | منوی desktop | horizontal، keyboard |
| NavigationMenu | mega navigation | trigger، panel |
| CommandPalette | جست‌وجوی action/module | recent، result، no result |
| AnchorNavigation | رفتن به بخش صفحه | active section |
| LinkPreview | پیش‌نمایش مقصد | loading، unavailable |
| SchoolSwitcher | انتخاب مدرسه | current، searchable، permission-aware |
| BranchSwitcher | انتخاب شعبه | current، unavailable |
| AcademicYearSelector | سال تحصیلی | active، archived، future |
| TermSelector | نیم‌سال/دوره | active، closed |

---

## 6. Data Display Components

| Component | مشخصات |
|---|---|
| Card | header/content/footer؛ clickable فقط با semantics لینک |
| StatCard / KPI | label، value، unit، delta، period، trend |
| Badge | status، count، category؛ متن الزامی |
| Chip | filter یا انتخاب قابل حذف |
| Tag | دسته‌بندی یا metadata |
| Avatar | image، initials، fallback |
| AvatarGroup | stack و overflow count |
| List | ordered/unordered، dense، interactive |
| ListItem | leading، content، trailing، selected |
| DescriptionList | label/value، horizontal/vertical |
| Table | semantic HTML table |
| DataTable | sort، filter، pagination، selection، visibility |
| DataGrid | keyboard navigation، cell selection، editing |
| Tree | nested items، expand/collapse |
| TreeItem | selected، expanded، disabled |
| Timeline | chronological activity |
| CalendarView | month/week/day agenda |
| KanbanBoard | columns، cards، drag/drop |
| FileTree | folders، files، selection |
| CodeBlock | copy، wrap، language label |
| QRCode | value، error correction، download |
| Tooltip | short explanation، keyboard focus |
| HoverCard | rich preview؛ fallback برای touch |
| Popover | contextual content، focus management |
| Accordion | single/multiple expansion |
| Collapsible | one panel expand/collapse |
| Carousel | keyboard/touch، indicators |
| Image | responsive، fallback، alt |
| ImageGallery | thumbnails، lightbox، navigation |
| Map | markers، clustering، accessible list alternative |
| EmptyState | reason + next action |
| KeyValue | label/value |
| MetricComparison | current/previous/target |
| ProgressRing | value، label، min/max |
| FilePreview | image/PDF/document metadata |
| MediaPreview | audio/video thumbnail and controls |

### DataTable contract

- caption یا accessible name.
- th و scope صحیح.
- sort با aria-sort.
- selection با checkbox و bulk toolbar.
- ستون action با menu قابل دسترسی.
- sticky header فقط داخل scroll container.
- loading skeleton با ساختار مشابه جدول.
- empty state در سطح table.
- error state و retry امن.
- pagination واقعی و page size.
- ستون‌ها و مقادیر طولانی، RTL/LTR و mobile بررسی شوند.
- print style جدا از screen style.

---

## 7. Feedback & Overlay Components

| Component | کاربرد | حالات |
|---|---|---|
| Alert | پیام پایدار در صفحه | info، success، warning، danger |
| Callout | توضیح contextual | neutral، tip، caution |
| Toast | feedback کوتاه | success، error، info، warning |
| Notification | پیام inbox | unread، read، actionable |
| Snackbar | feedback پایین صفحه | action، dismiss |
| Dialog | محتوای modal | sm، md، lg، fullscreen |
| AlertDialog | تأیید عملیات مهم | confirm، cancel، destructive |
| Modal | wrapper معنایی dialog | controlled، focus-managed |
| Drawer | پنل کناری | left/right/bottom، responsive |
| Sheet | پنل موقت | side، bottom، full-height |
| Popconfirm | تأیید سریع | inline، destructive |
| Progress | درصد عملیات | determinate، indeterminate |
| CircularProgress | پیشرفت فشرده | determinate، indeterminate |
| Spinner | loading کوتاه | sm، md، lg |
| Skeleton | placeholder ساختاری | text، card، table، chart |
| EmptyState | نبود داده | initial، filtered، no permission |
| ErrorState | خطای صفحه/بخش | retry، support, back |
| Result | نتیجهٔ workflow | success، failure، warning |
| OfflineBanner | قطع اتصال | offline، reconnecting |
| ConnectionStatus | سلامت اتصال | connected، degraded، disconnected |
| PermissionState | عدم دسترسی | explanation + request/return |
| MaintenanceBanner | maintenance | scheduled، active |
| UnsavedChangesDialog | خروج با تغییر ذخیره‌نشده | stay، discard |
| SessionExpiryDialog | انقضای نشست | continue، re-auth |
| CommandFeedback | نتیجهٔ action | pending، complete، failed |

### Dialog rules

- focus به نقطهٔ منطقی منتقل شود.
- پس از بستن focus به trigger برگردد.
- Escape رفتار قابل انتظار داشته باشد.
- عملیات destructive با AlertDialog و متن پیامد.
- dialog بلند scroll داخلی دارد.
- mobile به drawer/sheet تبدیل می‌شود.
- برای عملیات asynchronous، pending و error در همان context نمایش داده شود.

---

## 8. Charts & Analytical Components

| Component | کاربرد و محدودیت |
|---|---|
| LineChart | روند زمانی و تغییرات |
| AreaChart | روند تجمعی/حجم؛ fill ملایم |
| BarChart | مقایسهٔ دسته‌ها |
| StackedBarChart | ترکیب زیرگروه‌ها |
| HorizontalBarChart | labelهای طولانی |
| PieChart | فقط چند سهم محدود |
| DonutChart | سهم + total مرکزی |
| ScatterPlot | رابطهٔ دو متغیر |
| BubbleChart | رابطهٔ سه متغیر با احتیاط |
| ComboChart | ترکیب bar/line با واحدهای روشن |
| Heatmap | الگوی تراکم/زمان |
| CalendarHeatmap | حضور و فعالیت روزانه |
| FunnelChart | قیف ثبت‌نام/فرایند |
| RadarChart | مقایسهٔ چند شاخص محدود |
| RadialBar | پیشرفت حلقوی |
| Gauge | مقدار نسبت به threshold |
| Sparkline | روند کوچک داخل KPI |
| ChartLegend | روشن/خاموش سری |
| ChartTooltip | مقدار، واحد، زمان |
| ChartAnnotation | هدف، رخداد و threshold |
| ChartSummary | خلاصهٔ متنی قابل دسترس |
| ChartDataTable | جدول جایگزین نمودار |

برای هر chart، no-data، loading، error، partial-data، responsive و reduced-motion تعریف شود.

---

## 9. Advanced & Productivity Components

- **RichTextEditor:** ویرایش متن اطلاعیه، شرح و محتوای آموزشی.
- **MarkdownEditor:** محتوای فنی/مستند با preview امن.
- **CodeEditor:** فقط برای تنظیمات/اسکریپت‌های مجاز، نه نیاز عمومی.
- **DataImporter:** upload → mapping → validation → preview → confirm → result.
- **ExportJob:** queued → processing → ready → failed → expired.
- **PrintSurface:** سند قابل چاپ با header/footer و page breaks.
- **DocumentViewer:** preview، zoom، download و page navigation.
- **PDFViewer:** page count، search و download.
- **SpreadsheetPreview:** sheet switcher، column mapping و validation.
- **SignaturePad:** ثبت امضا با clear/confirm و metadata.
- **Barcode:** تولید و نمایش کد.
- **QRScanner:** camera permission، scan state و fallback manual.
- **CameraCapture:** permission، capture، retake، upload.
- **NotificationCenter:** دسته‌بندی، unread، bulk mark read.
- **ActivityFeed:** رخدادهای مرتبط با موجودیت.
- **AuditLog:** actor، action، target، timestamp، diff.
- **CommentThread:** comment، reply، resolve و moderation.
- **MentionPicker:** جست‌وجوی افراد و گروه‌ها.
- **MessageComposer:** متن، attachment، recipient، send state.
- **ChatPanel:** thread، unread، typing و connection state.
- **HelpPanel:** جست‌وجو، راهنمای context و contact support.
- **SpotlightSearch:** جست‌وجوی سراسری ماژول، فرد، کلاس و عملیات.
- **BulkActionToolbar:** عملیات روی انتخاب چندگانه.
- **UndoToast:** بازگردانی عملیات reversible.
- **ConflictResolver:** مقایسه و انتخاب در تعارض داده.
- **VersionHistory:** نسخه‌ها و restore.
- **PermissionMatrix:** role × resource × action.
- **ApprovalFlow:** درخواست، reviewer، approve/reject، audit trail.

---

## 10. Domain Components — مخصوص بهار

این لایه با مفاهیم و داده‌های مدرسه ساخته می‌شود؛ componentهای عمومی نباید منطق مدرسه را در خود پنهان کنند.

### دانش‌آموز و اولیا

| Component | محتوای اصلی |
|---|---|
| StudentIdentityCard | نام، کد دانش‌آموزی، پایه، کلاس، avatar، وضعیت |
| StudentProfileHeader | هویت + عملیات مجاز |
| StudentEnrollmentStatus | فعال، انتقالی، فارغ‌التحصیل، تعلیق |
| GuardianContactCard | رابطه، شماره، راه ارتباط |
| GuardianSummary | اولیا و افراد مجاز |
| StudentAttendanceSummary | درصد و بازهٔ حضور |
| StudentGradeSummary | میانگین و روند نمره |
| StudentDocumentList | مدارک و وضعیت تأیید |
| StudentTimeline | رخدادهای آموزشی/اداری |
| StudentTransferWorkflow | مبدا، مقصد، تاریخ، تأیید |
| EnrollmentWizard | اطلاعات، مدارک، بررسی، ثبت نهایی |

### کارکنان و معلمان

| Component | محتوای اصلی |
|---|---|
| StaffProfileCard | هویت، سمت، وضعیت |
| TeacherAssignmentCard | درس، کلاس، ساعت |
| StaffAvailability | برنامه و دسترس‌پذیری |
| StaffAttendanceSummary | حضور و غیاب |
| WorkloadSummary | ساعات/تخصیص |
| StaffDocumentStatus | مدارک و اعتبار |

### کلاس، درس و آموزش

| Component | محتوای اصلی |
|---|---|
| ClassSummaryCard | پایه، ظرفیت، تعداد، معلم |
| ClassRoster | فهرست دانش‌آموزان |
| TimetableGrid | روز × ساعت × درس |
| LessonCard | درس، کلاس، معلم، زمان |
| AssignmentCard | تکلیف، deadline، status |
| HomeworkSubmission | ارسال، attachment، feedback |
| ExamSchedule | آزمون، زمان، مکان، درس |
| GradeEntryGrid | ورود نمره و validation |
| GradeCell | نمره، وضعیت، خطای دامنه |
| GradeDistribution | توزیع نمرات |
| ReportCardPreview | کارنامهٔ قابل بررسی و چاپ |
| LearningProgress | روند پیشرفت |
| CurriculumProgress | پوشش محتوای آموزشی |

### حضور و غیاب

| Component | محتوای اصلی |
|---|---|
| AttendanceRegister | فهرست کلاس و ثبت روزانه |
| AttendanceStatus | حاضر، غایب، تأخیر، موجه |
| AttendanceBulkEditor | ثبت گروهی با تأیید |
| AttendanceTrend | روند زمانی |
| AttendanceCalendar | تقویم حضور |
| LateArrivalEntry | زمان و علت تأخیر |
| AbsenceReason | علت، مدرک، تأیید |

### مالی

| Component | محتوای اصلی |
|---|---|
| FeeInvoice | مبلغ، سررسید، اقلام |
| FeeBreakdown | شهریه، تخفیف، بدهی، پرداخت |
| PaymentStatus | پرداخت‌شده، معوق، جزئی، لغوشده |
| PaymentHistory | تراکنش‌ها و رسیدها |
| InstallmentPlan | قسط، سررسید، مانده |
| ScholarshipIndicator | نوع و میزان تخفیف/بورسیه |
| FinancialSummary | درآمد، بدهی، وصول |
| ReceiptPreview | سند رسید قابل چاپ |

### مدیریت مدرسه

| Component | محتوای اصلی |
|---|---|
| SchoolSwitcher | تغییر مدرسه با حفظ permission |
| BranchSwitcher | تغییر شعبه |
| AcademicYearSelector | سال تحصیلی فعال |
| TermSelector | دوره/نیم‌سال |
| RoleBadge | نقش کاربر |
| PermissionMatrix | مجوزها |
| AnnouncementComposer | اطلاعیه و مخاطب |
| AnnouncementCard | وضعیت انتشار و مخاطب |
| ParentCommunicationTimeline | تاریخچهٔ ارتباط |
| DocumentApproval | گردش تأیید سند |
| CertificatePreview | پیش‌نمایش گواهی |
| ImportReviewTable | خطا و تطبیق داده |
| ExportJobStatus | وضعیت خروجی |
| AuditLogEntry | رخداد و عامل |

---

## 11. الگوهای ترکیبی (Patterns)

### A. List Management
PageHeader → Search/Filters → FilterChips → BulkActionToolbar → DataTable → Pagination.

### B. Create/Edit Form
PageHeader → FormSection → FieldGroup → ValidationSummary → StickyActionFooter.

### C. Entity Detail
IdentityHeader → StatusBadge → PrimaryActions → Overview → Tabs → ActivityTimeline.

### D. Dashboard
ContextSelector → KPIGroup → MainTrend → SecondaryInsights → RecentActivity.

### E. Approval
RequestSummary → Evidence/Attachments → ReviewerActions → DecisionDialog → AuditTrail.

### F. Import
FileDropzone → ColumnMapping → ValidationSummary → PreviewTable → Confirm → ImportResult.

### G. Report
ReportHeader → DateRange → Filters → SummaryMetrics → Charts → DataTable → Export/Print.

### H. Bulk Operations
SelectionCount → ActionToolbar → Confirmation → Progress → Result/Undo.

### I. Search
SearchInput → Suggestions → ResultsByType → Empty/NoPermission → RecentSearches.

### J. Mobile Data Entry
CompactHeader → ContextSummary → SingleColumnFields → InlineValidation → StickyBottomAction.

---

## 12. نگاشت به وضعیت فعلی مخزن

### موجود در src/components/ui

در زمان تهیهٔ این سند، **۴۹ فایل کامپوننت UI** در پوشهٔ UI و **۱۵ فایل ابزار مشترک** در پوشهٔ shared دیده می‌شوند:

- accordion
- alert-dialog
- alert
- aspect-ratio
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- chart
- checkbox
- collapsible
- command
- context-menu
- dialog
- drawer
- dropdown-menu
- form
- hover-card
- input-otp
- input
- label
- menubar
- navigation-menu
- pagination
- popover
- price
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- sidebar
- skeleton
- slider
- sonner
- switch
- table
- tabs
- textarea
- toast
- toaster
- toggle-group
- toggle
- tooltip


### وضعیت واقعی مهاجرت V4

در شاخهٔ `design-system-v4-arad-only`، **۴۷ جزء از ۴۹ جزء UI** از نظر ظاهر و قراردادهای بصری به V4 منتقل شده‌اند. دو مورد زیر اجزای صرفاً ساختاری/ترکیبی‌اند و skin مستقل ندارند:

- `aspect-ratio`: primitive ساختاری برای نسبت ابعاد؛ ظاهر از محتوای داخل می‌آید.
- `toaster`: میزبان و composition اعلان‌ها؛ ظاهر از `toast` و `sonner` می‌آید.

اجزای منتقل‌شده:

`accordion`, `alert-dialog`, `alert`, `avatar`, `badge`, `breadcrumb`, `button`, `calendar`, `card`, `carousel`, `chart`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `drawer`, `dropdown-menu`, `form`, `hover-card`, `input-otp`, `input`, `label`, `menubar`, `navigation-menu`, `pagination`, `popover`, `price`, `progress`, `radio-group`, `resizable`, `scroll-area`, `select`, `separator`, `sheet`, `sidebar`, `skeleton`, `slider`, `sonner`, `switch`, `table`, `tabs`, `textarea`, `toast`, `toggle-group`, `toggle`, `tooltip`.

مهاجرت شامل یکپارچه‌سازی اندازه و شعاع کنترل‌ها، حالت focus، سطوح و مرزها، منوها و overlayها، جداول، تب‌ها، بازخوردها و رفتار hover/pressed است. API و primitiveهای Radix/کتابخانه‌های موجود حفظ شده‌اند تا منطق و دسترس‌پذیری آسیب نبیند.

**محدودهٔ باقی‌مانده:** این آمار دربارهٔ لایهٔ UI primitive است؛ به معنی بازبینی بصری تک‌تک صفحات محصول یا پیاده‌سازی تمام componentهای domain فهرست‌شده نیست. آن کار باید صفحه‌به‌صفحه و با screenshot QA انجام شود.

### موجود در src/components/shared

- bits
- captcha-field
- charts
- collapsible
- iran-map-picker
- jalali-date-input
- language-switcher
- markdown
- motion
- passkey-card
- pickers
- scroll-motion
- site-lang-select
- theme-toggle
- user-avatar

### تصمیم مهاجرت

1. فایل‌های موجود ابتدا با قرارداد V4 ممیزی می‌شوند.
2. APIهای مصرف‌شده تا حد ممکن حفظ می‌شوند تا مهاجرت همهٔ صفحات یک‌باره نشود.
3. هر primitive به wrapper بصری Bahar تبدیل می‌شود؛ منطق Radix حذف یا با div سفارشی جایگزین نمی‌شود.
4. کامپوننت‌های domain به‌صورت لایهٔ جدا ساخته می‌شوند.
5. componentهای تکراری ادغام می‌شوند؛ تفاوت واقعی به variant یا composition تبدیل می‌شود.
6. هیچ صفحه‌ای صرفاً با selector عمومی و بدون بازبینی بصری «مهاجرت‌شده» محسوب نمی‌شود.

---

## 13. کتابخانه‌ها و منابع بررسی‌شده

منابع مرجع برای رفتار، ساختار و ایدهٔ component:

- Radix Primitives — https://www.radix-ui.com/primitives/docs/components
- Base UI — https://base-ui.com/
- React Aria — https://react-spectrum.adobe.com/react-aria/
- Headless UI — https://headlessui.com/
- Ark UI — https://ark-ui.com/
- shadcn/ui — https://ui.shadcn.com/
- shadcn Registry Directory — https://ui.shadcn.com/docs/directory
- Material UI — https://mui.com/material-ui/all-components/
- Ant Design — https://ant.design/components/overview/
- Mantine — https://mantine.dev/
- Chakra UI — https://chakra-ui.com/docs/components/concepts/overview
- HeroUI — https://heroui.com/en/docs/react/components
- Flowbite React — https://flowbite-react.com/
- daisyUI — https://daisyui.com/components/
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
- Untitled UI — https://www.untitledui.com/
- Tailwind Plus — https://tailwindcss.com/plus
- Uiverse — https://uiverse.io/

### انتخاب فنی برای بهار

- **Behavior foundation:** Radix موجود.
- **Styling ownership:** sourceهای محلی بهار؛ بدون پذیرش ظاهر پیش‌فرض کتابخانه‌ها.
- **Table:** TanStack Table موجود.
- **Charts:** Recharts موجود.
- **Motion:** Framer Motion موجود، فقط برای موارد هدفمند.
- **Date:** wrapperهای فعلی با formatter مرکزی تقویم.
- **Icons:** Lucide React موجود.
- **Registry discovery:** shadcn registry و کتابخانه‌های فوق برای کشف قابلیت؛ نه برای واردکردن بی‌رویهٔ dependency.

### قواعد حقوقی و امنیتی

- کاتالوگ حاضر یک specification اصیل برای بهار است، نه کپی سورس کد کتابخانه‌ها.
- قبل از استفاده از هر قطعهٔ بیرونی، license همان repository/component بررسی و attribution لازم نگهداری می‌شود.
- componentهای Pro، commercial، Commons Clause یا دارای محدودیت redistribution بدون مجوز وارد محصول نمی‌شوند.
- sourceهای copy-paste از نظر dependency، network calls، analytics، unsafe HTML، event handlers و accessibility بازبینی می‌شوند.
- هر component اقتباس‌شده باید منبع، نسخه، license و تغییرات خود را ثبت کند.

---

## 14. معیار پذیرش کاتالوگ

- تمام componentهای موجود مخزن در این کاتالوگ نگاشت شده‌اند.
- componentهای لازم برای محصول مدرسه در لایهٔ domain فهرست شده‌اند.
- هر component جدید باید use case واقعی داشته باشد.
- duplicateها باید به variant یا composition تبدیل شوند.
- هیچ componentی صرفاً به دلیل جذابیت بصری به پنل عملیاتی اضافه نمی‌شود.
- مستندات با implementation همگام می‌مانند؛ وجود در این کاتالوگ به‌تنهایی به معنی پیاده‌سازی نیست.
