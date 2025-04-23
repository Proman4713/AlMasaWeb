import {
	createContext,
	useMemo,
	useState
} from "react";

export const localeContext = createContext();

export function LocaleProvider({
	children
}) {
	const [locale, setLocale] = useState("en");
	//const memoizedLocale = useMemo(() => locale, [locale]);

	const getApplicationLocale = () => {
		try {
			// Try to get the theme from SecureStore
			if (typeof window === "undefined") return setLocale('en');
			const localeSetting = localStorage.getItem('locale');

			if (localeSetting !== null) {
				setLocale(localeSetting);
			}
		} catch (e) {
			return;
		}
	};

	const setApplicationLocale = (locale) => {
		try {
			if (typeof window === "undefined") return setLocale(locale);
			localStorage.setItem('locale', locale);
			setLocale(locale);
		} catch (e) {
			return;
		}
	}

	const appText = useMemo(() => {
		//* console.log(locale)
		let text = {
			"Home": "HOME",
			"About": "ABOUT",
			"Credits": "CREDITS",
			"SettingsCredits": "Credits",
			"Add Your School": "ADD YOUR SCHOOL",

			"Login": "Login",
			"Settings": "Settings",
			"Sign Up": "Sign Up",
			"Log Out": "Log Out",

			"Username": "Username",
			"Email": "Email",
			"Password": "Password",

			"Teacher Accounts": "Teacher Accounts",
			"Class Data": "Class Data",
			"Logs": "Logs",
			"Data Export": "Data Export",
			"Preferences": "Preferences",

			"Attendance Submission": "Attendance Submission",
			"Class Creation": "Class Creation",
			"Class Editing": "Class Editing",

			"for": "for",
			"of": "of",

			"On Period": "On Period",
			"students present": "students present",
			"Total Students": "Total Students",

			"something went wrong:": "something went wrong:",

			"Year": "Year",
			"Class": "Class",

			"Information": "Information",
			"Personalization": "Personalization",
			"Account": "Account",

			"Select A Year": "Select A Year",
			"Select A Class": "Select A Class",
			"Select A Period": "Select A Period",
			"Select": "Select",

			"Continue": "Continue",
		}

		switch (locale) {
			case "ar":
				text = {
					"Home": "الرئيسية",
					"About": "عن",
					"Credits": "التفاصيل",
					"Add Your School": "إضافة مدرسة",

					"Login": "تسجيل الدخول",
					"Settings": "الاعدادات",
					"Sign Up": "إنشاء حساب",
					"Log Out": "تسجيل الخروج",

					"Username": "اسم المستخدم",
					"Email": "البريد الالكتروني",
					"Password": "كلمة المرور",

					"Teacher Accounts": "حسابات المعلمين",
					"Class Data": "بيانات الصفوف",
					"Logs": "السجلات",
					"Data Export": "استخراج البيانات",
					"Preferences": "التفضيلات",

					"Attendance Submission": "تسجيل الحضور",
					"Class Creation": "انشاء الصف",
					"Class Editing": "تعديل الصف",

					"for": "لـ",
					"of": "طالب حاضر من أصل",
					
					"On Period": "في الحصة",
					"students present": "طالب",
					"Total Students": "طالب",

					"something went wrong:": "حدث خطأ:",

					"Year": "السنة",
					"Class": "الصف",

					"Information": "المعلومات",
					"Personalization": "التخصيص",
					"Account": "الحساب",

					"Select A Year": "إختر السنة",
					"Select A Class": "إختر الصف",
					"Select A Period": "إختر الحصة",
					"Select": "إختر",

					"Continue": "متابعة",
				}
				break;

			case "de":
				text = {
					"Home": "Startseite",
					"About": "Über",
					"Credits": "Credits",
					"Add Your School": "Über die Schule registrieren",

					"Login": "Anmeldung",
					"Settings": "Einstellungen",
					"Sign Up": "Registrierung",
					"Log Out": "Ausloggen",

					"Username": "Benutzername",
					"Email": "E-Mail",
					"Password": "Passwort",

					"Teacher Accounts": "Lehrerkonten",
					"Class Data": "Klassen-Daten",
					"Logs": "Logs",
					"Data Export": "Daten exportieren",
					"Preferences": "Einstellungen",

					"Attendance Submission": "Abschluss",
					"Class Creation": "Klasse erstellen",
					"Class Editing": "Klasse bearbeiten",
					
					"for": "f\u00fcr",
					"of": "von",

					"On Period": "Auf Perioden",
					"students present": "Sch\u00fcler anwesend",
					"Total Students": "Sch\u00fcler",

					"something went wrong:": "Etwas ist schief gelaufen:",
					
					"Year": "Jahr",
					"Class": "Klasse",

					"Select A Year": "Jahr auswählen",
					"Select A Class": "Klasse auswählen",
					"Select A Period": "Lehrstunde auswählen",
					"Select": "Auswählen",

					"Information": "Informationen",
					"Personalization": "Personalisierung",
					"Account": "Konto",

					"Continue": "Fortsetzen",
				}
				break;
			
			default:
				break;
		}

		return text;
	}, [locale]);

	return (
		<localeContext.Provider
			value={{
				locale,
				getApplicationLocale,
				setApplicationLocale,
				appText
			}}
		>
			{children}
		</localeContext.Provider>
	);
}