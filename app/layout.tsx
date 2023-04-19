import getCurrentUser from "./actions/getCurrentUser";
import Bottombar from "./components/Bottombar";
import Suggestions from "./components/Suggestions";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisterModal";
import SettingsModal from "./components/modals/SettingsModal";
import ZweetModal from "./components/modals/ZweetModal";
import Sidebar from "./components/sidebar/Sidebar";
import Toast from "./components/Toast";
import "./globals.css";
import getSuggestions from "./actions/getSuggestions";

export const metadata = {
  title: "Zwitter",
  description: "Best twitter clone social media app named zwitter.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  const suggestions = await getSuggestions();

  return (
    <html lang="en">
      <body>
        <div className="container mx-auto h-screen">
          <div
            className={`flex ${
              currentUser ? "justify-center" : "justify-start"
            }`}
          >
            <LoginModal />
            <RegisterModal />
            <ZweetModal currentUser={currentUser} />
            <Sidebar currentUser={currentUser} />
            <SettingsModal currentUser={currentUser} />

            <div className={`w-full max-w-[600px] ${!currentUser && "mb-20"}`}>
              {children}
            </div>

            {currentUser && (
              <Suggestions currentUser={currentUser} users={suggestions} />
            )}
          </div>

          {!currentUser && <Bottombar />}

          <Toast />
        </div>
      </body>
    </html>
  );
}
