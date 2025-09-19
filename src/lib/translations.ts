// Translation system for AgricultureConnect
export type Language = 'he' | 'ar' | 'en' | 'si' | 'ta';

export interface Translations {
    // Common
    login: string;
    signup: string;
    email: string;
    password: string;
    name: string;
    country: string;
    farmType: string;
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    search: string;
    filter: string;
    settings: string;
    profile: string;
    logout: string;

    // Navigation
    dashboard: string;
    farmManagement: string;
    globalConnect: string;
    education: string;
    notifications: string;

    // Dashboard
    welcome: string;
    dailyTasks: string;
    farmOverview: string;
    productionStats: string;
    alerts: string;
    learningCenter: string;

    // Farm Management
    addNewFarm: string;
    farmName: string;
    animalType: string;
    animalCount: string;
    healthStatus: string;
    vaccinationSchedule: string;
    feedingSchedule: string;
    cleaningSchedule: string;
    productionReport: string;

    // Global Connect
    connectWithFarmers: string;
    activeChat: string;
    forums: string;
    sendMessage: string;
    videoCall: string;
    joinGroup: string;

    // Education
    articles: string;
    tutorials: string;
    videos: string;
    askExpert: string;

    // Notifications
    urgentAlert: string;
    temperatureHigh: string;
    vaccinationDue: string;
    feedingTime: string;
    cleaningTime: string;

    // Animal Types
    chickens: string;
    cows: string;
    goats: string;
    sheep: string;
    ducks: string;

    // Health Status
    healthy: string;
    needsTreatment: string;
    maintenance: string;
    sick: string;

    // Countries
    israel: string;
    sriLanka: string;
    other: string;
}

export const translations: Record<Language, Translations> = {
    he: {
        // Common
        login: "התחברות",
        signup: "הרשמה",
        email: "אימייל",
        password: "סיסמה",
        name: "שם מלא",
        country: "מדינה",
        farmType: "סוג חווה",
        save: "שמור",
        cancel: "ביטול",
        delete: "מחק",
        edit: "ערוך",
        add: "הוסף",
        search: "חיפוש",
        filter: "סינון",
        settings: "הגדרות",
        profile: "פרופיל",
        logout: "התנתק",

        // Navigation
        dashboard: "דשבורד",
        farmManagement: "ניהול חווה",
        globalConnect: "חיבור גלובלי",
        education: "הדרכה",
        notifications: "התראות",

        // Dashboard
        welcome: "ברוך הבא",
        dailyTasks: "משימות יומיות",
        farmOverview: "סקירת חווה",
        productionStats: "נתוני תפוקה",
        alerts: "התראות",
        learningCenter: "מרכז הדרכה",

        // Farm Management
        addNewFarm: "הוסף חווה חדשה",
        farmName: "שם החווה",
        animalType: "סוג בעלי חיים",
        animalCount: "מספר בעלי חיים",
        healthStatus: "מצב בריאות",
        vaccinationSchedule: "לוח חיסונים",
        feedingSchedule: "לוח האכלה",
        cleaningSchedule: "לוח ניקוי",
        productionReport: "דוח תפוקה",

        // Global Connect
        connectWithFarmers: "התחבר לחקלאים",
        activeChat: "צ'אט פעיל",
        forums: "פורומים",
        sendMessage: "שלח הודעה",
        videoCall: "שיחת וידאו",
        joinGroup: "הצטרף לקבוצה",

        // Education
        articles: "מאמרים",
        tutorials: "מדריכים",
        videos: "סרטונים",
        askExpert: "שאל מומחה",

        // Notifications
        urgentAlert: "התראה דחופה",
        temperatureHigh: "טמפרטורה גבוהה",
        vaccinationDue: "זמן חיסון",
        feedingTime: "זמן האכלה",
        cleaningTime: "זמן ניקוי",

        // Animal Types
        chickens: "תרנגולות",
        cows: "פרות",
        goats: "עזים",
        sheep: "כבשים",
        ducks: "ברווזים",

        // Health Status
        healthy: "בריא",
        needsTreatment: "דורש טיפול",
        maintenance: "תחזוקה",
        sick: "חולה",

        // Countries
        israel: "ישראל",
        sriLanka: "סרי לנקה",
        other: "אחר"
    },

    ar: {
        // Common
        login: "تسجيل الدخول",
        signup: "التسجيل",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        name: "الاسم الكامل",
        country: "البلد",
        farmType: "نوع المزرعة",
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        add: "إضافة",
        search: "بحث",
        filter: "تصفية",
        settings: "الإعدادات",
        profile: "الملف الشخصي",
        logout: "تسجيل الخروج",

        // Navigation
        dashboard: "لوحة التحكم",
        farmManagement: "إدارة المزرعة",
        globalConnect: "الاتصال العالمي",
        education: "التعليم",
        notifications: "الإشعارات",

        // Dashboard
        welcome: "مرحباً",
        dailyTasks: "المهام اليومية",
        farmOverview: "نظرة عامة على المزرعة",
        productionStats: "إحصائيات الإنتاج",
        alerts: "التنبيهات",
        learningCenter: "مركز التعلم",

        // Farm Management
        addNewFarm: "إضافة مزرعة جديدة",
        farmName: "اسم المزرعة",
        animalType: "نوع الحيوانات",
        animalCount: "عدد الحيوانات",
        healthStatus: "الحالة الصحية",
        vaccinationSchedule: "جدول التطعيم",
        feedingSchedule: "جدول التغذية",
        cleaningSchedule: "جدول التنظيف",
        productionReport: "تقرير الإنتاج",

        // Global Connect
        connectWithFarmers: "تواصل مع المزارعين",
        activeChat: "محادثة نشطة",
        forums: "المنتديات",
        sendMessage: "إرسال رسالة",
        videoCall: "مكالمة فيديو",
        joinGroup: "انضمام للمجموعة",

        // Education
        articles: "المقالات",
        tutorials: "الدروس",
        videos: "الفيديوهات",
        askExpert: "اسأل خبير",

        // Notifications
        urgentAlert: "تنبيه عاجل",
        temperatureHigh: "درجة حرارة عالية",
        vaccinationDue: "موعد التطعيم",
        feedingTime: "وقت التغذية",
        cleaningTime: "وقت التنظيف",

        // Animal Types
        chickens: "دجاج",
        cows: "أبقار",
        goats: "ماعز",
        sheep: "أغنام",
        ducks: "بط",

        // Health Status
        healthy: "صحي",
        needsTreatment: "يحتاج علاج",
        maintenance: "صيانة",
        sick: "مريض",

        // Countries
        israel: "إسرائيل",
        sriLanka: "سريلانكا",
        other: "أخرى"
    },

    en: {
        // Common
        login: "Login",
        signup: "Sign Up",
        email: "Email",
        password: "Password",
        name: "Full Name",
        country: "Country",
        farmType: "Farm Type",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        add: "Add",
        search: "Search",
        filter: "Filter",
        settings: "Settings",
        profile: "Profile",
        logout: "Logout",

        // Navigation
        dashboard: "Dashboard",
        farmManagement: "Farm Management",
        globalConnect: "Global Connect",
        education: "Education",
        notifications: "Notifications",

        // Dashboard
        welcome: "Welcome",
        dailyTasks: "Daily Tasks",
        farmOverview: "Farm Overview",
        productionStats: "Production Stats",
        alerts: "Alerts",
        learningCenter: "Learning Center",

        // Farm Management
        addNewFarm: "Add New Farm",
        farmName: "Farm Name",
        animalType: "Animal Type",
        animalCount: "Animal Count",
        healthStatus: "Health Status",
        vaccinationSchedule: "Vaccination Schedule",
        feedingSchedule: "Feeding Schedule",
        cleaningSchedule: "Cleaning Schedule",
        productionReport: "Production Report",

        // Global Connect
        connectWithFarmers: "Connect with Farmers",
        activeChat: "Active Chat",
        forums: "Forums",
        sendMessage: "Send Message",
        videoCall: "Video Call",
        joinGroup: "Join Group",

        // Education
        articles: "Articles",
        tutorials: "Tutorials",
        videos: "Videos",
        askExpert: "Ask Expert",

        // Notifications
        urgentAlert: "Urgent Alert",
        temperatureHigh: "High Temperature",
        vaccinationDue: "Vaccination Due",
        feedingTime: "Feeding Time",
        cleaningTime: "Cleaning Time",

        // Animal Types
        chickens: "Chickens",
        cows: "Cows",
        goats: "Goats",
        sheep: "Sheep",
        ducks: "Ducks",

        // Health Status
        healthy: "Healthy",
        needsTreatment: "Needs Treatment",
        maintenance: "Maintenance",
        sick: "Sick",

        // Countries
        israel: "Israel",
        sriLanka: "Sri Lanka",
        other: "Other"
    },

    si: {
        // Common
        login: "පුරනය වන්න",
        signup: "ලියාපදිංචි වන්න",
        email: "විද්‍යුත් තැපෑල",
        password: "මුර පදය",
        name: "සම්පූර්ණ නම",
        country: "රට",
        farmType: "ගොවිපල වර්ගය",
        save: "සුරකින්න",
        cancel: "අවලංගු කරන්න",
        delete: "මකන්න",
        edit: "සංස්කරණය",
        add: "එකතු කරන්න",
        search: "සොයන්න",
        filter: "පෙරණය",
        settings: "සැකසුම්",
        profile: "පැතිකඩ",
        logout: "පිටවීම",

        // Navigation
        dashboard: "ඩෑෂ්බෝඩ්",
        farmManagement: "ගොවිපල කළමනාකරණය",
        globalConnect: "ගෝලීය සම්බන්ධතා",
        education: "අධ්‍යාපනය",
        notifications: "දැනුම්දීම්",

        // Dashboard
        welcome: "ආයුබෝවන්",
        dailyTasks: "දෛනික කාර්යයන්",
        farmOverview: "ගොවිපල දළ විශ්ලේෂණය",
        productionStats: "නිෂ්පාදන සංඛ්‍යාලේඛන",
        alerts: "අනතුරු ඇඟවීම්",
        learningCenter: "ඉගෙනුම් මධ්‍යස්ථානය",

        // Farm Management
        addNewFarm: "නව ගොවිපල එකතු කරන්න",
        farmName: "ගොවිපල නම",
        animalType: "ප්‍රාණි වර්ගය",
        animalCount: "ප්‍රාණි ගණන",
        healthStatus: "සෞඛ්‍ය තත්වය",
        vaccinationSchedule: "වැක්සිනේෂන් කාලසටහන",
        feedingSchedule: "පෝෂණ කාලසටහන",
        cleaningSchedule: "පිරිසිදු කිරීමේ කාලසටහන",
        productionReport: "නිෂ්පාදන වාර්තාව",

        // Global Connect
        connectWithFarmers: "ගොවීන් සමඟ සම්බන්ධ වන්න",
        activeChat: "ක්‍රියාකාරී කතාබහ",
        forums: "සංසද",
        sendMessage: "පණිවිඩය යවන්න",
        videoCall: "වීඩියෝ ඇමතුම",
        joinGroup: "කණ්ඩායමට එකතු වන්න",

        // Education
        articles: "ලිපි",
        tutorials: "උපදේශන",
        videos: "වීඩියෝ",
        askExpert: "විශේෂඥයෙකුගෙන් අසන්න",

        // Notifications
        urgentAlert: "හදිසි අනතුරු ඇඟවීම",
        temperatureHigh: "ඉහළ උෂ්ණත්වය",
        vaccinationDue: "වැක්සිනේෂන් කාලය",
        feedingTime: "පෝෂණ කාලය",
        cleaningTime: "පිරිසිදු කිරීමේ කාලය",

        // Animal Types
        chickens: "කුකුළන්",
        cows: "ගවයන්",
        goats: "එළුවන්",
        sheep: "බැටළුවන්",
        ducks: "බතල්",

        // Health Status
        healthy: "සෞඛ්‍ය සම්පන්න",
        needsTreatment: "ප්‍රතිකාර අවශ්‍ය",
        maintenance: "නඩත්තුව",
        sick: "අසනීප",

        // Countries
        israel: "ඊශ්‍රායලය",
        sriLanka: "ශ්‍රී ලංකාව",
        other: "වෙනත්"
    },

    ta: {
        // Common
        login: "உள்நுழைய",
        signup: "பதிவு செய்",
        email: "மின்னஞ்சல்",
        password: "கடவுச்சொல்",
        name: "முழு பெயர்",
        country: "நாடு",
        farmType: "பண்ணை வகை",
        save: "சேமி",
        cancel: "ரத்து செய்",
        delete: "நீக்கு",
        edit: "திருத்து",
        add: "சேர்",
        search: "தேடு",
        filter: "வடிகட்டு",
        settings: "அமைப்புகள்",
        profile: "சுயவிவரம்",
        logout: "வெளியேறு",

        // Navigation
        dashboard: "டாஷ்போர்டு",
        farmManagement: "பண்ணை மேலாண்மை",
        globalConnect: "உலகளாவிய இணைப்பு",
        education: "கல்வி",
        notifications: "அறிவிப்புகள்",

        // Dashboard
        welcome: "வரவேற்கிறோம்",
        dailyTasks: "தினசரி பணிகள்",
        farmOverview: "பண்ணை கண்ணோட்டம்",
        productionStats: "உற்பத்தி புள்ளிவிவரங்கள்",
        alerts: "எச்சரிக்கைகள்",
        learningCenter: "கற்றல் மையம்",

        // Farm Management
        addNewFarm: "புதிய பண்ணை சேர்",
        farmName: "பண்ணை பெயர்",
        animalType: "விலங்கு வகை",
        animalCount: "விலங்குகளின் எண்ணிக்கை",
        healthStatus: "உடல்நல நிலை",
        vaccinationSchedule: "தடுப்பூசி அட்டவணை",
        feedingSchedule: "உணவளிப்பு அட்டவணை",
        cleaningSchedule: "சுத்தம் செய்யும் அட்டவணை",
        productionReport: "உற்பத்தி அறிக்கை",

        // Global Connect
        connectWithFarmers: "விவசாயிகளுடன் இணைக்கவும்",
        activeChat: "செயலில் உள்ள அரட்டை",
        forums: "மன்றங்கள்",
        sendMessage: "செய்தி அனுப்பு",
        videoCall: "வீடியோ அழைப்பு",
        joinGroup: "குழுவில் சேரவும்",

        // Education
        articles: "கட்டுரைகள்",
        tutorials: "பயிற்சிகள்",
        videos: "வீடியோக்கள்",
        askExpert: "நிபுணரிடம் கேளுங்கள்",

        // Notifications
        urgentAlert: "அவசர எச்சரிக்கை",
        temperatureHigh: "உயர் வெப்பநிலை",
        vaccinationDue: "தடுப்பூசி நேரம்",
        feedingTime: "உணவளிப்பு நேரம்",
        cleaningTime: "சுத்தம் செய்யும் நேரம்",

        // Animal Types
        chickens: "கோழிகள்",
        cows: "மாடுகள்",
        goats: "ஆடுகள்",
        sheep: "செம்மறி ஆடுகள்",
        ducks: "வாத்துகள்",

        // Health Status
        healthy: "ஆரோக்கியமான",
        needsTreatment: "சிகிச்சை தேவை",
        maintenance: "பராமரிப்பு",
        sick: "நோய்வாய்ப்பட்ட",

        // Countries
        israel: "இஸ்ரேல்",
        sriLanka: "இலங்கை",
        other: "மற்றவை"
    }
};

export const getTranslation = (language: Language, key: keyof Translations): string => {
    return translations[language]?.[key] || translations.en[key] || key;
};

export const getLanguageName = (code: Language): string => {
    const names: Record<Language, string> = {
        he: "עברית",
        ar: "العربية",
        en: "English",
        si: "සිංහල",
        ta: "தமிழ்"
    };
    return names[code] || code;
};
